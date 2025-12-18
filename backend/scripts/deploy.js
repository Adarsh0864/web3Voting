const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the contract factory
  const Voting = await ethers.getContractFactory("Voting");

  // Initial proposals
  const initialProposals = ["Alice", "Bob", "Charlie"];

  console.log("📋 Deploying with initial proposals:", initialProposals);

  // Deploy the contract
  const voting = await Voting.deploy(initialProposals);
  await voting.waitForDeployment();

  const contractAddress = await voting.getAddress();
  console.log("✅ Voting contract deployed to:", contractAddress);

  // Get network information
  const network = await ethers.provider.getNetwork();
  console.log("🌐 Network:", network.name, "| Chain ID:", network.chainId);

  // Save deployment info
  const fs = require("fs");
  const path = require("path");

  const deploymentInfo = {
    contractAddress: contractAddress,
    network: network.name,
    chainId: network.chainId.toString(),
    initialProposals: initialProposals,
    deployedAt: new Date().toISOString(),
    owner: await voting.owner()
  };

  // Create artifacts directory if it doesn't exist
  const artifactsDir = path.join(__dirname, "../artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  // Save deployment info
  fs.writeFileSync(
    path.join(artifactsDir, "deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("📄 Deployment info saved to artifacts/deployment.json");

  // Verify initial state
  console.log("\n🔍 Verifying deployment...");
  const proposalCount = await voting.getProposalCount();
  console.log("Total proposals:", proposalCount.toString());

  for (let i = 0; i < proposalCount; i++) {
    const [name, voteCount] = await voting.getProposal(i);
    console.log(`Proposal ${i}: ${name} - ${voteCount} votes`);
  }

  console.log("\n🎉 Deployment completed successfully!");
  console.log("📝 Next steps:");
  console.log("1. Copy the contract address to your frontend .env file");
  console.log("2. Start the frontend development server");
  console.log("3. Connect your MetaMask to the local network (http://localhost:8545)");
  console.log("4. Import one of the Hardhat accounts to MetaMask for testing");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 