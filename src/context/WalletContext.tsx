// src/context/WalletContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  hash: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  tokensMinted: number;
  timestamp: string;
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  hphBalance: number;
  transactions: Transaction[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  recordPurchase: (planId: string, planName: string, amount: number) => Promise<string>;
  getSubscriptionStatus: (planId: string) => { isActive: boolean; expiryDate: string | null; daysRemaining: number };
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hphBalance, setHphBalance] = useState(120); // Default seed balance
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      hash: "3af5a6e8b7c9...4b12",
      userId: "user_01",
      planId: "spotify-student",
      planName: "Spotify Student Premium",
      amount: 59,
      tokensMinted: 10,
      timestamp: "2026-05-18 14:32"
    },
    {
      hash: "bc88d2f5a6b1...19e0",
      userId: "user_01",
      planId: "ytm-student",
      planName: "YouTube Music Student",
      amount: 39,
      tokensMinted: 10,
      timestamp: "2026-04-12 09:15"
    }
  ]);

  useEffect(() => {
    try {
      // Check if wallet address was stored previously
      const savedAddress = localStorage.getItem("hph_wallet_address");
      const savedBalance = localStorage.getItem("hph_token_balance");
      const savedTx = localStorage.getItem("hph_transactions");

      if (savedAddress) {
        setIsConnected(true);
        setWalletAddress(savedAddress);
      }
      if (savedBalance) {
        const parsedBalance = Number(savedBalance);
        if (!isNaN(parsedBalance)) {
          setHphBalance(parsedBalance);
        }
      }
      if (savedTx) {
        try {
          setTransactions(JSON.parse(savedTx));
        } catch (parseError) {
          console.error("Corrupted transaction logs detected in local storage. Resetting cache.", parseError);
          localStorage.removeItem("hph_transactions");
        }
      }
    } catch (e) {
      console.error("Failed to access localStorage safely:", e);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const { isConnected: isFreighterConnected, requestAccess } = await import('@stellar/freighter-api');
      const connectedRes = await isFreighterConnected();
      if (connectedRes && connectedRes.isConnected) {
        const accessRes = await requestAccess();
        if (accessRes && accessRes.address) {
          setIsConnected(true);
          setWalletAddress(accessRes.address);
          localStorage.setItem("hph_wallet_address", accessRes.address);
        } else {
          throw new Error("No address returned from Freighter");
        }
      } else {
        console.warn("Freighter wallet extension is not installed. Falling back to mock Stellar wallet.");
        mockConnect();
      }
    } catch (error) {
      console.error("Freighter connection failed, falling back to mock Stellar wallet", error);
      mockConnect();
    }
  };

  const mockConnect = () => {
    const mockAddress = "GB" + Array.from({length: 54}, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"[Math.floor(Math.random()*32)]).join('');
    setIsConnected(true);
    setWalletAddress(mockAddress);
    localStorage.setItem("hph_wallet_address", mockAddress);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress(null);
    localStorage.removeItem("hph_wallet_address");
  };

  const getSubscriptionStatus = (planId: string) => {
    const planTx = transactions.find(t => t.planId === planId);
    if (!planTx) {
      return { isActive: false, expiryDate: null, daysRemaining: 0 };
    }

    // Standardize parsing by replacing potential spaces with T
    const purchaseDate = new Date(planTx.timestamp.replace(' ', 'T'));
    const expiryDate = new Date(purchaseDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30-day billing cycle
    const now = new Date();

    const isExpired = now.getTime() > expiryDate.getTime();
    if (isExpired) {
      return { 
        isActive: false, 
        expiryDate: expiryDate.toISOString().replace('T', ' ').substring(0, 16), 
        daysRemaining: 0 
      };
    }

    const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      isActive: true,
      expiryDate: expiryDate.toISOString().replace('T', ' ').substring(0, 16),
      daysRemaining
    };
  };

  const recordPurchase = async (planId: string, planName: string, amount: number) => {
    // 1. Double Spending Prevention: Block if already has an active subscription
    const status = getSubscriptionStatus(planId);
    if (status.isActive) {
      throw new Error(`Double Spending Blocked: You already have an active subscription for ${planName} expiring on ${status.expiryDate}.`);
    }

    // 2. Reboot/Renew Payment: If expired or new, generate a standard transaction record
    const txHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const newTx: Transaction = {
      hash: txHash.substring(0, 8) + "..." + txHash.substring(58),
      userId: walletAddress ? walletAddress.substring(0, 8) : "guest_user",
      planId,
      planName,
      amount,
      tokensMinted: 10,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedTxs = [newTx, ...transactions];
    const newBalance = hphBalance + 10;

    setTransactions(updatedTxs);
    setHphBalance(newBalance);

    localStorage.setItem("hph_transactions", JSON.stringify(updatedTxs));
    localStorage.setItem("hph_token_balance", String(newBalance));

    return txHash;
  };

  return (
    <WalletContext.Provider value={{
      isConnected,
      walletAddress,
      hphBalance,
      transactions,
      connectWallet,
      disconnectWallet,
      recordPurchase,
      getSubscriptionStatus
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
