// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHPHToken {
    function mint(address to, uint256 amount) external returns (bool);
}

/**
 * @title PurchaseRegistry
 * @dev Records purchases on-chain and awards HPH tokens to users
 */
contract PurchaseRegistry {
    address public owner;
    IHPHToken public tokenContract;
    uint256 public rewardAmount = 10 * 10**18; // 10 HPH tokens on purchase

    struct Purchase {
        string userId;
        string planId;
        string category;
        uint256 amount;
        uint256 timestamp;
    }

    // Mapping transaction hash to purchase info
    mapping(bytes32 => Purchase) public purchases;
    // Array of transaction hashes for tracking
    bytes32[] public purchaseHashes;
    // Map address to transaction count
    mapping(address => uint256) public userPurchaseCounts;
    // Map buyer address => planId => last purchase timestamp for double spending prevention
    mapping(address => mapping(string => uint256)) public lastPurchaseTimestamp;

    event PurchaseRecorded(
        bytes32 indexed txHash,
        address indexed buyer,
        string userId,
        string planId,
        uint256 amount,
        uint256 rewardAmount
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenContract = IHPHToken(_tokenAddress);
    }

    function updateRewardAmount(uint256 _newAmount) public onlyOwner {
        rewardAmount = _newAmount;
    }

    function recordPurchase(
        string memory _userId,
        string memory _planId,
        string memory _category,
        uint256 _amount,
        address _buyerAddress
    ) public returns (bytes32) {
        // 1. Double Spending Prevention: Block if purchase exists within 30-day window
        uint256 lastPurchase = lastPurchaseTimestamp[_buyerAddress][_planId];
        if (lastPurchase > 0) {
            require(block.timestamp >= lastPurchase + 30 days, "Subscription is still active! Double spending blocked on-chain.");
        }

        // Generate a pseudo-random hash on chain for verification ID
        bytes32 txHash = keccak256(
            abi.encodePacked(_userId, _planId, block.timestamp, msg.sender)
        );

        purchases[txHash] = Purchase({
            userId: _userId,
            planId: _planId,
            category: _category,
            amount: _amount,
            timestamp: block.timestamp
        });

        purchaseHashes.push(txHash);
        userPurchaseCounts[_buyerAddress]++;
        
        // Update last purchase timestamp to block double spending and allow future reboot renewals
        lastPurchaseTimestamp[_buyerAddress][_planId] = block.timestamp;

        // Auto-mint HPH tokens as reward
        tokenContract.mint(_buyerAddress, rewardAmount);

        emit PurchaseRecorded(
            txHash,
            _buyerAddress,
            _userId,
            _planId,
            _amount,
            rewardAmount
        );

        return txHash;
    }

    function getPurchaseCount() public view returns (uint256) {
        return purchaseHashes.length;
    }
}
