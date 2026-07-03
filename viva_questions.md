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
    - **Client Components** are marked with `"use client"` at the top of the file. They run in the browser and support state (`useState`), side-effects (`useEffect`), browser events, and Web3 wallet connections (like Freighter Wallet/Stellar SDK). Our pages use `"use client"` because they require client-side filters, active search states, and wallet integrations.

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

## 🔵 Section 3: Web3 & Soroban Smart Contracts

### Q7: What is Rust, and what is the role of your Soroban smart contracts in `lib.rs`?
*   **Answer**: Rust is a systems programming language known for memory safety and performance. Soroban is the smart contract platform built on the Stellar network.
    Our Soroban smart contracts implement the HPHToken logic, purchase registry, and referral records. HPHToken acts as our platform's utility token, and the registry logs checkouts securely on the Stellar ledger, automatically minting HPH rewards.

### Q8: What is Freighter, and how does your app talk to it?
*   **Answer**: Freighter is a browser extension wallet designed for the Stellar network.
    Our application uses the official Stellar SDK and Freighter API. When the user clicks "Link Freighter Wallet", we request their Stellar public key. During checkout, we build transaction operations that Freighter signs, submitting them to the Stellar Testnet.

### Q9: How is storage optimized in Soroban compared to Solidity?
*   **Answer**: Soroban uses a stateful ledger with explicit lease-based storage settings (temporary, instance, and persistent) to prevent state bloat. This is different from Solidity's mapping storage which stays in state forever unless explicitly cleared, making Soroban contracts highly scalable and cost-efficient.

### Q10: What are Stellar transaction fees and base reserves?
*   **Answer**: Stellar requires a small base fee (in stroops, where 1 XLM = 10,000,000 stroops) to process transactions and prevent network spam. Accounts also require a minimum balance (base reserve) in XLM to maintain trustlines and data entries on the ledger. We use the Stellar Testnet Friendbot to fund our accounts for testing without real-world costs.
