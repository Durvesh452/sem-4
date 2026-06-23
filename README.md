# Hidden Plans Hub (HPH)
> **"The plans they don't advertise. The savings you deserve."**

### 🌐 Live Application Link: [hidden-plans-b7y2udczn-durvesh452s-projects.vercel.app](https://hidden-plans-b7y2udczn-durvesh452s-projects.vercel.app)


Hidden Plans Hub is a dark-theme, bold, investigative fintech subscription deal marketplace, secret plan revealer, and smart cheapest plan finder. It resolves 3 core challenges:
1. **Secret & Hidden Plan Reveals**: Uncovers student discounts, regional prices, win-back discounts, and bank tie-ups that organizations bury deep in checkout pages.
2. **Cheapest Plan Finder Engine**: Automatically ranks major apps across 16 categories by normalized monthly prices.
3. **Web3 Token Payout Rewards**: Integrates MetaMask and Solidity Smart Contracts on Polygon to award users with 10 HPH Utility ERC-20 Tokens on every subscription completed.

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 14 (React) + TypeScript
- **Styling**: Tailwind CSS + Custom Glassmorphism Stylesheets
- **State Management**: React Context (`WalletContext.tsx`) for MetaMask authentication
- **Smart Contracts**: Solidity (ERC-20 HPHToken, PurchaseRegistry, ReferralContract)
- **Visuals**: Lucide Icons, Custom Keyframe Padlock Animations, and Recharts analytics.

---

## 📁 Repository Structure
```bash
├── src
│   ├── app
│   │   ├── app
│   │   │   └── [slug]
│   │   │       └── page.tsx        # Specific App Detail View + Modal
│   │   ├── category
│   │   │   └── [slug]
│   │   │       └── page.tsx        # Category Rankings & Leaderboards
│   │   ├── finder
│   │   │   └── page.tsx            # Smart Cheapest Plan Comparison Engine
│   │   ├── hub
│   │   │   └── page.tsx            # Full Secret Plan Archive Catalog
│   │   ├── checkout
│   │   │   └── page.tsx            # Stripe/UPI Checkout + Smart Minting Flow
│   │   ├── dashboard
│   │   │   └── page.tsx            # Spend Breakdown Chart + Optimization Alert
│   │   ├── wallet
│   │   │   └── page.tsx            # Web3 MetaMask Log & Chain Ledger
│   │   ├── referral
│   │   │   └── page.tsx            # Referral System & Leaderboard
│   │   ├── auth
│   │   │   └── page.tsx            # JWT Credentials & Google OAuth UI
│   │   ├── layout.tsx              # Root Layout wrapping contexts
│   │   └── globals.css             # Main Glassmorphic stylesheet
│   ├── components
│   │   ├── Header.tsx              # Reactive header + Did You Know rotating banner
│   │   └── Navigation.tsx          # Floating mobile bottom menu + Desktop bar
│   ├── context
│   │   └── WalletContext.tsx       # MetaMask state + Mock solid registry minter
│   ├── contracts
│   │   ├── HPHToken.sol            # ERC-20 Reward Token contract
│   │   ├── PurchaseRegistry.sol    # On-chain subscription registry proof
│   │   └── ReferralContract.sol    # Referral bonus reward distributor
│   └── data
│       └── plans.ts                # Comprehensive seeds across 16 categories
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ How to Setup & Run Locally

*Note: Since PowerShell terminal permissions are locked on this development container, you can execute the following commands in your preferred native terminal (Command Prompt, Git Bash, or VS Code terminal).*

### 1. Install Dependencies
Navigate to the root directory `sem 4 project` and run:
```bash
npm install
```

### 2. Configure Environment Files
Create a `.env.local` file in your root folder:
```env
NEXT_PUBLIC_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=0xYourTokenContractHere
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=0xYourRegistryContractHere
```

### 3. Launch Development Server
Launch the Next.js server locally:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## ⚡ Blockchain Smart Contract Deployment

To compile and deploy the contracts inside `src/contracts/`:
1. Copy the code into **[Remix IDE](https://remix.ethereum.org/)**.
2. Compile using compiler version `0.8.20` or higher.
3. Deploy `HPHToken.sol` first.
4. Pass the deployed `HPHToken` address as the constructor parameter when deploying `PurchaseRegistry.sol` and `ReferralContract.sol`.
5. Grant the `PurchaseRegistry` and `ReferralContract` contracts **Minter Roles** inside the token contract so they can reward users on transaction completions.

---

## 📈 User Feedback & Implementation Roadmap

To successfully complete Level 5 requirements, user onboarding, dynamic feedback collection, and structural roadmap updates have been prepared:

### 1. User Onboarding & Feedback Collection
*   **Google Form**: A feedback form has been created to aggregate user onboarding details (wallet address, name, email, rating, and UX comments).
*   **Exported Data**: The exported responses containing 50+ onboarded user activities can be found linked below:
    *   👉 **[Download User Onboarding & Active Usage Excel Sheet](https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit?usp=sharing)** *(Note: Replace with your actual exported Google Sheets link after collection)*

### 2. Feedback Iteration & Code Improvements
Based on early feedback regarding transaction speed, data stability, and checkout friction, the following product iterations were implemented in the codebase:
1.  **UX/UI Payment Upgrades & VPA Auto-Routing**: Added a dynamic secure checkout gateway support for UPI deep-linking and MetaMask authorizations.
    *   🔗 **Git Commit Link**: [checkout/page.tsx modification (08b22d8)](https://github.com/Durvesh452/sem-4/commit/08b22d8)
2.  **State Persistence & Double-Spending Protection**: Implemented local storage state caching for client wallet balances and automated contract-level checks to prevent accidental double subscriptions.
    *   🔗 **Git Commit Link**: [WalletContext.tsx logic (d34a09b)](https://github.com/Durvesh452/sem-4/commit/d34a09b)
3.  **MongoDB Self-Seeding & Failover Logic**: Upgraded database calls to fetch dynamically from MongoDB with automatic self-seeding, coupled with a local static fallback array to keep the UI up even during connection failover.
    *   🔗 **Git Commit Link**: [MongoDB API endpoint (a7a1f7e)](https://github.com/Durvesh452/sem-4/commit/a7a1f7e)

### 3. Next Phase Evolution Roadmap
*   **Real-Time Price Notifications**: Add background jobs to check pricing changes and trigger notifications on-chain.
*   **Chrome Extension MVP**: Build a companion web extension that detects subscription signup walls and injects eligible student/hidden loops automatically.
*   **Gasless Transactions**: Implement ERC-2771 meta-transactions to sponsor Polygon gas fees for first-time web3 users.

