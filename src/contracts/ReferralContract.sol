// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHPHToken {
    function mint(address to, uint256 amount) external returns (bool);
}

/**
 * @title ReferralContract
 * @dev Distributes referral reward bonuses on-chain via smart contract
 */
contract ReferralContract {
    address public owner;
    IHPHToken public tokenContract;
    uint256 public referralBonus = 25 * 10**18; // 25 HPH tokens reward for successful referrals

    // Record of who referred whom
    mapping(address => address) public referredBy;
    // Count of successful referrals by referrer
    mapping(address => uint256) public referralCounts;

    event ReferralRegistered(address indexed user, address indexed referrer);
    event ReferralBonusPaid(address indexed referrer, address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenContract = IHPHToken(_tokenAddress);
    }

    function updateReferralBonus(uint256 _newBonus) public onlyOwner {
        referralBonus = _newBonus;
    }

    function registerReferral(address _user, address _referrer) public {
        require(_user != _referrer, "Cannot refer yourself");
        require(referredBy[_user] == address(0), "User already referred");

        referredBy[_user] = _referrer;
        referralCounts[_referrer]++;

        emit ReferralRegistered(_user, _referrer);

        // Distribute HPH tokens as referral bonus reward on-chain
        tokenContract.mint(_referrer, referralBonus);

        emit ReferralBonusPaid(_referrer, _user, referralBonus);
    }
}
