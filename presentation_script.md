# Presentation Script: Hidden Plans Hub

Use this script as a slide-by-slide guide for your Semester Project presentation. It is structured to help you explain the project clearly, confidently, and professionally.

---

## 🎙️ Slide 1: Title & Introduction
*   **Visual**: Project Title ("Hidden Plans Hub"), Subtitle ("Revealing Unadvertised Subscription Loops & Web3 Rewards"), Your Name, Roll Number, and Branch.
*   **Speaker Script**:
    > "Good morning/afternoon, respected teachers and examiners. Today, I am excited to present my project, **Hidden Plans Hub**. 
    > In today's digital economy, subscriptions have become a major monthly expense. However, many service providers hide their best offers—such as student discounts, bank partnerships, and regional pricing—deep within their sign-up flows to prevent profit loss. 
    > Our application acts as a discovery and curation engine that reveals these hidden deals, ranks them by normalized cost, and integrates a Web3 token rewards system to incentivize smart consumer behavior."

---

## 🎙️ Slide 2: Problem Statement
*   **Visual**: Bullet points outlining "The Subscription Trap":
    *   Hidden price points and unadvertised tiers.
    *   Complex and tedious verification walls (e.g., SheerID, UNiDAYS).
    *   Lack of rewards or cashbacks for direct subscriptions.
    *   No centralized place to compare unlisted student, family, and public rates.
*   **Speaker Script**:
    > "Let us look at the problem we are solving. Companies like Spotify, YouTube, and Adobe offer massive student discounts (up to 60-100% off), but they don't advertise them on their main homepages. Instead, they bury them under multiple verification links. 
    > Consumers end up paying full price simply because they don't know these options exist or find the verification instructions too complex. 
    > There is currently no unified platform that aggregates, filters, and ranks both public and hidden subscription tiers while rewarding users for checking out."

---

## 🎙️ Slide 3: Tech Stack & Architecture
*   **Visual**: Tech Stack Diagram:
    *   **Frontend & Routing**: Next.js 14 (App Router), React, TailwindCSS.
    *   **Database**: MongoDB (Dynamic Storage & Self-Seeding API).
    *   **Web3 Integration**: Ethereum/Polygon Smart Contracts (Solidity), Ethers.js, MetaMask.
    *   **Icons & Assets**: Lucide React.
*   **Speaker Script**:
    > "To build a modern, high-performance web application, we chose a full-stack architecture. 
    > On the frontend, we use **Next.js 14** for fast server-side rendering and routing, styled with **TailwindCSS** for a premium dark-themed aesthetic. 
    > For our data tier, we integrated **MongoDB** which dynamically serves our plans via Next.js API endpoints.
    > For the blockchain layer, we wrote a custom **Solidity Smart Contract** representing the HPH Token. Using **Ethers.js**, the app connects to the user's **MetaMask** wallet to record checkout actions and distribute rewards on-chain."

---

## 🎙️ Slide 4: Key Features
*   **Visual**: Screenshot placeholders or lists of features:
    *   **AI Subscription Recommender**: Personalized profile selector (Solo, Student, Family).
    *   **Interactive Eligibility Quiz**: Recommends secret deals based on budget and user status.
    *   **Cheapest Plan Leaderboard**: Filters by price, category, and lock status.
    *   **Unlock Walkthroughs**: Step-by-step verified instructions to unlock each hidden deal.
    *   **Web3 Loyalty Program**: Earn 10 HPH Tokens upon completing checkout.
*   **Speaker Script**:
    > "Our platform offers several core features:
    > First, the **AI Subscription Recommender** analyzes your profile (such as student or family size) and suggests the absolute cheapest plan.
    > Second, the **Eligibility Quiz** asks brief questions about your budget and educational status to uncover hidden matches.
    > Third, we have a **Leaderboard Finder** that ranks every app in a category by cost, showing which deals are secret.
    > Finally, we provide verified **Unlock Walkthroughs** showing exactly how to clear third-party verification filters like SheerID or UNiDAYS, and we reward successful checkouts with blockchain tokens."

---

## 🎙️ Slide 5: Database Integration (MongoDB)
*   **Visual**: Database schema or flowchart showing GET/POST API routes:
    *   `GET /api/services`: Auto-seeds if DB is empty; fetches from MongoDB; falls back to static JSON if DB is offline.
    *   `POST /api/services`: Allows developers/partners to add new services to MongoDB.
*   **Speaker Script**:
    > "Let's discuss our data integration. Initially, the project used static JSON data. We migrated this to **MongoDB** to enable dynamic updates. 
    > We implemented an intelligent **Self-Seeding GET API route**. The first time the application runs, it checks MongoDB; if the database is empty, it automatically seeds it with our predefined database catalog.
    > Furthermore, the application is designed to be highly resilient: if MongoDB goes offline, it automatically falls back to local data, preventing any frontend crashes."

---

## 🎙️ Slide 6: Web3 & Smart Contracts
*   **Visual**: Code snippets of `HPHToken.sol` or Web3 transaction status:
    *   ERC-20 token standard.
    *   Smart contract records purchase details on-chain.
    *   Award transactions verifiable via Polygonscan/Etherscan.
*   **Speaker Script**:
    > "A unique selling point of our system is the Web3 loyalty integration. We developed a Solidity Smart Contract called **HPHToken (HPH)**. 
    > When a user purchases a subscription, our application interacts with MetaMask. The smart contract registers the subscription ID, price, and timestamp on-chain, and automatically mints or transfers 10 HPH reward tokens to the user's wallet as cashback. 
    > This demonstrates how decentralized ledgers can power modern, tamper-proof loyalty programs."

---

## 🎙️ Slide 7: Live Demonstration Walkthrough
*   **Visual**: Run the application locally and show:
    1.  Homepage & Eligibility Quiz.
    2.  Finder Dashboard ranking the cheapest services.
    3.  Clicking a Hidden Deal (e.g. Spotify Student or Prime Youth) to see the step-by-step unlock instructions.
    4.  Checkout page simulating payment and triggering MetaMask wallet interaction.
*   **Speaker Script**:
    > "Now, I will walk you through a quick demonstration of the application. 
    > Here is the home page. If I take the quiz and select 'Student' with a budget of ₹200, the system instantly filters the database and matches me with student deals like Spotify Student or YouTube Music Student.
    > Clicking 'Unlock' displays the exact verification steps required. 
    > When I proceed to checkout and click submit, the app triggers a simulated payment and interacts with the connected Web3 wallet, displaying the resulting transaction hash directly on screen."

---

## 🎙️ Slide 8: Future Scope & Conclusion
*   **Visual**: Future roadmap items:
    *   Real-time notifications for price drops.
    *   Chrome Extension development to auto-inject codes.
    *   Direct smart contract subscription renewals.
*   **Speaker Script**:
    > "In the future, we plan to release our Chrome Extension that automatically scans subscription checkouts for loops, and integrate direct smart-contract-based recurring payments.
    > In conclusion, **Hidden Plans Hub** bridges the gap between hidden savings and consumers by using Next.js, MongoDB, and Web3 technology to create an engaging, modern, and high-utility financial dashboard.
    > Thank you, and I am now open to any questions."
