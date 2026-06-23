import pkg from 'hardhat';
const { ethers } = pkg;
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Starting automated deployment...");

  const HPHToken = await ethers.getContractFactory("HPHToken");
  const hphToken = await HPHToken.deploy();
  await hphToken.waitForDeployment();
  const tokenAddress = await hphToken.getAddress();
  console.log(`HPHToken deployed to: ${tokenAddress}`);

  const PurchaseRegistry = await ethers.getContractFactory("PurchaseRegistry");
  const registry = await PurchaseRegistry.deploy(tokenAddress);
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();
  console.log(`PurchaseRegistry deployed to: ${registryAddress}`);

  const ReferralContract = await ethers.getContractFactory("ReferralContract");
  const referral = await ReferralContract.deploy(tokenAddress);
  await referral.waitForDeployment();
  const referralAddress = await referral.getAddress();
  console.log(`ReferralContract deployed to: ${referralAddress}`);

  try {
    const MINTER_ROLE = await hphToken.MINTER_ROLE();
    await hphToken.grantRole(MINTER_ROLE, registryAddress);
    await hphToken.grantRole(MINTER_ROLE, referralAddress);
    console.log("Granted Minter Roles to Registry and Referral contracts.");
  } catch (e) {
    console.log("Note: Could not grant MINTER_ROLE automatically.");
  }

  const envContent = `NEXT_PUBLIC_POLYGON_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=${tokenAddress}
NEXT_PUBLIC_REGISTRY_CONTRACT_ADDRESS=${registryAddress}
NEXT_PUBLIC_REFERRAL_CONTRACT_ADDRESS=${referralAddress}
`;

  const envPath = path.join(__dirname, "..", ".env.local");
  fs.writeFileSync(envPath, envContent);
  console.log(`\nSuccessfully auto-generated .env.local at ${envPath}`);
  console.log("Deployment and environment setup complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
