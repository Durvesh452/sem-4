// src/lib.rs – Soroban contracts implementing token, purchase registry, and referral logic

#![no_std]

use soroban_sdk::{contractimpl, contracttype, env, symbol, Address, BytesN, Env, Symbol, Vec, Map, IntoVal};

// -------------------- Token (HPHToken) --------------------

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord, Default)]
pub struct TokenData {
    pub total_supply: i128,
    pub balance: Map<Address, i128>,
    pub allowance: Map<(Address, Address), i128>,
    pub owner: Address,
}

pub const TOKEN_DATA: Symbol = symbol!("TOKEN_DATA");

pub struct HPHToken;

#[contractimpl]
impl HPHToken {
    pub fn initialize(env: Env, owner: Address) {
        let data = TokenData {
            total_supply: 0,
            balance: Map::new(&env),
            allowance: Map::new(&env),
            owner,
        };
        env.storage().set(&TOKEN_DATA, &data);
    }

    pub fn mint(env: Env, to: Address, amount: i128) {
        let mut data: TokenData = env.storage().get_unchecked(&TOKEN_DATA).unwrap();
        // only owner can mint
        let caller = env.invoker();
        assert!(caller == data.owner, "Only owner can mint");
        data.total_supply += amount;
        let bal = data.balance.get(to.clone()).unwrap_or(0);
        data.balance.set(to.clone(), &(bal + amount));
        env.storage().set(&TOKEN_DATA, &data);
        // Emit event similar to ERC20 Mint and Transfer
        env.events().publish((symbol!("Mint"), to.clone()), amount);
        env.events().publish((symbol!("Transfer"), Address::contract(&env), to), amount);
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        let mut data: TokenData = env.storage().get_unchecked(&TOKEN_DATA).unwrap();
        let bal = data.balance.get(from.clone()).unwrap_or(0);
        assert!(bal >= amount, "Insufficient balance");
        data.balance.set(from.clone(), &(bal - amount));
        let bal_to = data.balance.get(to.clone()).unwrap_or(0);
        data.balance.set(to.clone(), &(bal_to + amount));
        env.storage().set(&TOKEN_DATA, &data);
        env.events().publish((symbol!("Transfer"), from, to), amount);
    }

    pub fn balance_of(env: Env, addr: Address) -> i128 {
        let data: TokenData = env.storage().get_unchecked(&TOKEN_DATA).unwrap();
        data.balance.get(addr).unwrap_or(0)
    }
}

// -------------------- Purchase Registry --------------------

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq, PartialOrd, Ord, Default)]
pub struct Purchase {
    pub user_id: BytesN<32>,
    pub plan_id: BytesN<32>,
    pub category: BytesN<32>,
    pub amount: i128,
    pub timestamp: u64,
}

#[contracttype]
pub struct RegistryData {
    pub purchases: Map<BytesN<32>, Purchase>, // tx_hash -> Purchase
    pub purchase_hashes: Vec<BytesN<32>>,
    pub user_counts: Map<Address, u64>,
    pub last_purchase_ts: Map<(Address, BytesN<32>), u64>,
    pub token_contract: Address,
    pub owner: Address,
    pub reward_amount: i128,
}

pub const REGISTRY_DATA: Symbol = symbol!("REGISTRY_DATA");

pub struct PurchaseRegistry;

#[contractimpl]
impl PurchaseRegistry {
    pub fn initialize(env: Env, token_contract: Address) {
        let data = RegistryData {
            purchases: Map::new(&env),
            purchase_hashes: Vec::new(&env),
            user_counts: Map::new(&env),
            last_purchase_ts: Map::new(&env),
            token_contract,
            owner: env.invoker(),
            reward_amount: 10_0000000, // 10 tokens with 7 decimals (example)
        };
        env.storage().set(&REGISTRY_DATA, &data);
    }

    pub fn record_purchase(
        env: Env,
        user_id: BytesN<32>,
        plan_id: BytesN<32>,
        category: BytesN<32>,
        amount: i128,
        buyer: Address,
    ) -> BytesN<32> {
        let mut data: RegistryData = env.storage().get_unchecked(&REGISTRY_DATA).unwrap();
        // double-spending prevention (30 days)
        let key = (buyer.clone(), plan_id.clone());
        let now = env.ledger().timestamp();
        if let Some(last) = data.last_purchase_ts.get(key.clone()) {
            assert!(now >= last + 30 * 24 * 60 * 60, "Subscription is still active! Double spending blocked.");
        }
        // create tx hash
        let hash_src = (user_id.clone(), plan_id.clone(), now, buyer.clone()).into_val(&env);
        let tx_hash = env.crypto().sha256(&hash_src);
        let tx_hash_n = BytesN::from_array(&env, &tx_hash);
        // store purchase
        let purchase = Purchase {
            user_id: user_id.clone(),
            plan_id: plan_id.clone(),
            category: category.clone(),
            amount,
            timestamp: now,
        };
        data.purchases.set(tx_hash_n.clone(), &purchase);
        data.purchase_hashes.push_back(tx_hash_n.clone());
        // update user count
        let cnt = data.user_counts.get(buyer.clone()).unwrap_or(0);
        data.user_counts.set(buyer.clone(), &(cnt + 1));
        // update last purchase timestamp
        data.last_purchase_ts.set(key, &now);
        // mint reward tokens via token contract
        let token_client = HPHTokenClient::new(&env, &data.token_contract);
        token_client.mint(&buyer, &data.reward_amount);
        // emit event
        env.events().publish(
            (symbol!("PurchaseRecorded"), tx_hash_n.clone()),
            (buyer.clone(), amount, data.reward_amount),
        );
        // save state
        env.storage().set(&REGISTRY_DATA, &data);
        tx_hash_n
    }
}

// Helper client for token contract calls from within this contract
#[derive(Clone)]
pub struct HPHTokenClient {
    env: Env,
    address: Address,
}

impl HPHTokenClient {
    pub fn new(env: &Env, address: &Address) -> Self {
        Self { env: env.clone(), address: address.clone() }
    }
    pub fn mint(&self, to: &Address, amount: &i128) {
        self.env.invoke_contract(
            &self.address,
            &symbol!("mint"),
            (to.clone(), *amount),
        );
    }
}

// -------------------- Referral Contract --------------------

#[contracttype]
pub struct ReferralData {
    pub referred_by: Map<Address, Address>,
    pub referral_counts: Map<Address, u64>,
    pub token_contract: Address,
    pub owner: Address,
    pub referral_bonus: i128,
}

pub const REFERRAL_DATA: Symbol = symbol!("REFERRAL_DATA");

pub struct ReferralContract;

#[contractimpl]
impl ReferralContract {
    pub fn initialize(env: Env, token_contract: Address) {
        let data = ReferralData {
            referred_by: Map::new(&env),
            referral_counts: Map::new(&env),
            token_contract,
            owner: env.invoker(),
            referral_bonus: 25_0000000, // 25 tokens
        };
        env.storage().set(&REFERRAL_DATA, &data);
    }

    pub fn register_referral(env: Env, user: Address, referrer: Address) {
        let mut data: ReferralData = env.storage().get_unchecked(&REFERRAL_DATA).unwrap();
        assert!(user != referrer, "Cannot refer yourself");
        assert!(data.referred_by.get(user.clone()).is_none(), "User already referred");
        data.referred_by.set(user.clone(), &referrer);
        let cnt = data.referral_counts.get(referrer.clone()).unwrap_or(0);
        data.referral_counts.set(referrer.clone(), &(cnt + 1));
        // mint bonus
        let token_client = HPHTokenClient::new(&env, &data.token_contract);
        token_client.mint(&referrer, &data.referral_bonus);
        // emit events
        env.events().publish((symbol!("ReferralRegistered"), user.clone(), referrer.clone()), ());
        env.events().publish((symbol!("ReferralBonusPaid"), referrer.clone(), user.clone()), data.referral_bonus);
        env.storage().set(&REFERRAL_DATA, &data);
    }
}

// Export all contract symbols
#[allow(dead_code)]
pub fn contractid() -> BytesN<32> {
    BytesN::from_array(&Env::default(), &[0; 32])
}

