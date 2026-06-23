# Viva Voce (Oral Exam) Q&A Guide

Prepare for your project viva with these frequently asked technical questions and their answers.

---

## 🟢 Section 1: Next.js & Frontend Architecture

### Q1: What is Next.js, and why did you choose it over plain React?
*   **Answer**: Next.js is a React framework that supports server-side rendering (SSR), static site generation (SSG), and API routing out of the box. We chose Next.js because:
    1.  **File-based routing** makes page management simple (e.g. `src/app/app/[slug]/page.tsx` for dynamic app details).
    2.  **Built-in API Routes** (under `src/app/api/`) allow us to build backend endpoints (like MongoDB fetch/insert) directly inside the same project without running a separate Express server.
    3.  **Performance & SEO**: Hybrid rendering models improve page load speeds and search engine readability.

### Q2: Explain the difference between Server Components and Client Components in Next.js 14.
*   **Answer**: 
    - **Server Components (Default)** render on the server. They don't download javascript to the client, which makes them fast and excellent for direct database queries or secure API calls.
    - **Client Components** are marked with `"use client"` at the top of the file. They run in the browser and support state (`useState`), side-effects (`useEffect`), browser events, and Web3 wallet connections (like MetaMask/Ethers.js). Our pages use `"use client"` because they require client-side filters, active search states, and wallet integrations.

### Q3: What is the dynamic route folder syntax `[slug]` in Next.js?
*   **Answer**: The square brackets `[slug]` define a dynamic segment in the URL path. When a user navigates to `/app/spotify` or `/app/youtube-music`, Next.js routes the request to `src/app/app/[slug]/page.tsx` and passes `'spotify'` or `'youtube-music'` as the value of `params.slug` to the page component.

---

## 🟡 Section 2: MongoDB Integration & API Layer

### Q4: How is MongoDB connected to your Next.js application?
*   **Answer**: We use the official native `mongodb` driver. We created a connection helper in `src/lib/mongodb.ts`. To prevent Next.js from creating a new database connection every time the code updates in development mode (which causes connection exhaustion), the helper caches the `MongoClient` promise in a global variable (`global._mongoClientPromise`).

### Q5: What is "Self-Seeding", and how did you implement it?
*   **Answer**: Self-seeding means the application automatically populates its database with default data if it detects that the database is empty. 
    In `src/app/api/services/route.ts` GET handler, we count the documents using `collection.countDocuments()`. If the count is `0`, we perform an `insertMany()` using the static catalog in `src/data/plans.ts`. This ensures zero configuration setup for new developers.

### Q6: Why did you implement a "Fallback" mechanism for database calls?
*   **Answer**: In professional web development, system resilience is critical. If MongoDB is down or the database URI is misconfigured, our frontend components catch the fetch error in a `.catch()` block and default to using the static local array `APP_SERVICES`. This prevents the user interface from crashing and allows partial site functionality (graceful degradation).

---

## 🔵 Section 3: Web3 & Smart Contracts

### Q7: What is Solidity, and what is the role of your smart contract `HPHToken.sol`?
*   **Answer**: Solidity is an object-oriented programming language used for writing smart contracts on blockchain platforms like Ethereum. 
    Our contract `HPHToken` is a custom token implementation based on the ERC-20 standard. It keeps track of user balances and allowances, and includes a minting/reward function to distribute tokens when a checkout transaction is recorded.

### Q8: What is MetaMask, and how does your app talk to it?
*   **Answer**: MetaMask is a browser-extension wallet that acts as a bridge between the browser and a blockchain network. 
    Our application uses **Ethers.js** to detect `window.ethereum` (injected by MetaMask). When the user clicks "Authorize Wallet", we request their account address. During checkout, we construct a transaction that invokes our smart contract to record their purchase and reward them, which the user signs and pays gas fees for through MetaMask.

### Q9: Why did you use an ERC-20 standard instead of an NFT (ERC-721)?
*   **Answer**: Loyalty points are fungible—one reward token has the same value as another, and they can be split into smaller fractions (decimals). Therefore, the **ERC-20** (Fungible Token) standard is the appropriate choice. An NFT (ERC-721) would represent unique, non-divisible digital assets, which is not suitable for a cashback/points ledger.

### Q10: What is gas, and why is it needed?
*   **Answer**: Gas refers to the fee required to execute transactions or smart contracts on Ethereum-compatible networks. It compensates miners/validators for the computational power needed to process and secure the transaction. To keep gas fees negligible, we deploy our contract on the **Polygon Network** or a local development blockchain (like Hardhat/Ganache) rather than the Ethereum Mainnet.
