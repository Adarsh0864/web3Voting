# 🚀 Complete Setup Guide

This guide will walk you through setting up the Decentralized Voting App from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git**
- **MetaMask** browser extension

## Step-by-Step Setup

### 1. Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd web3-voting

# Verify Node.js version
node --version  # Should be v16+
npm --version   # Should be v7+
```

### 2. Backend Setup (Hardhat)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify installation
npx hardhat --version
```

#### Configure Environment (Optional)

If you plan to deploy to testnets:

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env  # or use your preferred editor
```

Add your keys:
```env
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_private_key_without_0x_prefix
```

### 3. Start Local Blockchain

```bash
# In backend directory
npm run node
```

**Important**: Keep this terminal window open! You should see:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (18 more accounts)
```

### 4. Deploy Smart Contract

Open a **new terminal** in the backend directory:

```bash
# Compile contracts
npm run compile

# Deploy to local network
npm run deploy
```

**Copy the contract address** from the output! You'll need it for the frontend.

Example output:
```
✅ Voting contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 5. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

#### Configure Frontend Environment

Edit `frontend/.env`:

```env
# Replace with your actual contract address from step 4
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
REACT_APP_NETWORK_NAME=localhost
REACT_APP_NETWORK_ID=31337
REACT_APP_RPC_URL=http://127.0.0.1:8545
```

### 6. Start Frontend Application

```bash
# In frontend directory
npm start
```

The application will open at `http://localhost:3000`

### 7. MetaMask Configuration

#### Install MetaMask

1. Go to [metamask.io](https://metamask.io/download/)
2. Install the browser extension
3. Create a new wallet or import existing one

#### Add Hardhat Network

1. Open MetaMask
2. Click the network dropdown (usually shows "Ethereum Mainnet")
3. Click "Add Network" or "Custom RPC"
4. Enter the following details:

```
Network Name: Hardhat Local
New RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
Block Explorer URL: (leave blank)
```

5. Click "Save"

#### Import Test Account

1. In MetaMask, click the account icon
2. Select "Import Account"
3. Select "Private Key"
4. Copy a private key from your Hardhat console (step 3)
5. Paste and click "Import"

**Recommended**: Use Account #1 or #2, save Account #0 for contract owner.

### 8. Test the Application

1. **Connect Wallet**: Click "Connect MetaMask" in the app
2. **Verify Network**: Ensure Chain ID shows 31337
3. **View Proposals**: You should see Alice, Bob, and Charlie
4. **Cast a Vote**: Click "Vote" on any proposal
5. **Confirm Transaction**: Approve in MetaMask
6. **View Results**: See your vote reflected in real-time

## Verification Checklist

- [ ] Hardhat network is running (terminal 1)
- [ ] Contract deployed successfully
- [ ] Frontend environment configured with correct contract address
- [ ] React app running on http://localhost:3000
- [ ] MetaMask installed and configured
- [ ] Test account imported with 10,000 ETH
- [ ] Connected to Hardhat Local Network (Chain ID: 31337)
- [ ] Can connect wallet to the app
- [ ] Can view proposals
- [ ] Can cast votes successfully

## Testing

### Run Contract Tests

```bash
# In backend directory
npm test
```

Expected output:
```
  Voting Contract
    Deployment
      ✓ Should set the right owner
      ✓ Should initialize proposals correctly
    Adding Proposals
      ✓ Should allow owner to add new proposals
      ✓ Should not allow non-owner to add proposals
    Voting
      ✓ Should allow users to vote
      ✓ Should not allow users to vote twice
      ✓ Should not allow voting for invalid proposal
      ✓ Should emit VoteCast event
    ... (more tests)

  16 passing (2s)
```

## Common Issues & Solutions

### Issue: "Cannot connect to network"

**Solution**: 
1. Ensure Hardhat node is running (`npm run node` in backend)
2. Check MetaMask network settings
3. Restart MetaMask if needed

### Issue: "Contract address not configured"

**Solution**: 
1. Verify `.env` file in frontend has correct contract address
2. Restart React development server
3. Check console for errors

### Issue: "Transaction failed"

**Solution**: 
1. Check MetaMask network (should be Hardhat Local)
2. Ensure account has sufficient ETH
3. Try resetting MetaMask account (Settings > Advanced > Reset Account)

### Issue: "User rejected transaction"

**Solution**: 
1. Click "Confirm" in MetaMask popup
2. Adjust gas settings if needed
3. Try the transaction again

### Issue: "Already voted" error

**Solution**: 
1. This is expected behavior (one vote per user)
2. Try with a different MetaMask account
3. Check "Your Vote" indicator in the UI

## Advanced Configuration

### Custom Proposals

To deploy with different proposals, modify `backend/scripts/deploy.js`:

```javascript
// Change this array
const initialProposals = ["Alice", "Bob", "Charlie"];

// To your preferred proposals
const initialProposals = ["Proposal A", "Proposal B", "Proposal C"];
```

Then redeploy:
```bash
npm run deploy
```

### Adding Voting Deadline

In the deployed contract, the owner can set a voting deadline:

1. Connect as contract owner (Account #0)
2. Use the contract's `setVotingDeadline` function
3. Pass a Unix timestamp for when voting should end

### Multiple Networks

To run on different networks simultaneously:

1. Deploy to multiple networks
2. Update frontend environment variables
3. Switch networks in MetaMask to test

## Production Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

3. Update environment variables for production

### Smart Contract (Testnet)

1. Get testnet ETH from faucets
2. Configure `.env` with real keys
3. Deploy: `npm run deploy:testnet`
4. Update frontend `.env` with testnet contract address

## Next Steps

- [ ] Explore the smart contract code in `backend/contracts/Voting.sol`
- [ ] Customize the UI in `frontend/src/components/`
- [ ] Add more proposals by redeploying the contract
- [ ] Test with multiple MetaMask accounts
- [ ] Try deploying to a testnet
- [ ] Implement additional features (voting deadline, proposal descriptions, etc.)

## Support

If you encounter issues:

1. Check this guide first
2. Review error messages in browser console
3. Check MetaMask for pending transactions
4. Ensure all terminals are running the correct commands
5. Verify environment variables are correctly set

---

**You're now ready to vote! 🗳️** 