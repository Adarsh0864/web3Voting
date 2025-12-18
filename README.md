# 🗳️ Decentralized Voting App

A modern, transparent, and tamper-proof voting application built on Ethereum using Solidity, React.js, MetaMask, and Hardhat.

## 🚀 Features

- **Smart Contract Voting**: All votes are stored immutably on the Ethereum blockchain
- **MetaMask Integration**: Seamless wallet connection and transaction signing
- **One Vote Per User**: Blockchain enforced voting restrictions
- **Real-time Results**: Live vote counts and winner tracking
- **Modern UI**: Beautiful, responsive interface with loading states and notifications
- **Network Detection**: Automatic detection and switching to correct network
- **Voting Deadline**: Optional time-based voting restrictions (bonus feature)
- **Owner Controls**: Contract owner can add proposals and set deadlines

## 🛠️ Tech Stack

### Backend
- **Solidity**: Smart contract development
- **Hardhat**: Ethereum development environment
- **Ethers.js**: Blockchain interaction library
- **Chai**: Testing framework

### Frontend
- **React.js**: Frontend framework
- **Ethers.js**: Web3 integration
- **React Toastify**: Notifications
- **CSS3**: Modern styling with glassmorphism effects

## 📁 Project Structure

```
web3-voting/
├── backend/                 # Hardhat backend
│   ├── contracts/          # Solidity contracts
│   │   └── Voting.sol      # Main voting contract
│   ├── scripts/            # Deployment scripts
│   │   └── deploy.js       # Contract deployment
│   ├── test/               # Contract tests
│   │   └── Voting.test.js  # Comprehensive tests
│   ├── hardhat.config.js   # Hardhat configuration
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── WalletConnection.js
│   │   │   ├── VotingDashboard.js
│   │   │   └── ProposalCard.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── contract.js # Contract interaction
│   │   │   └── wallet.js   # Wallet management
│   │   ├── App.js          # Main app component
│   │   └── index.js        # App entry point
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **Git**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd web3-voting
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional, for testnets)
cp .env.example .env
# Edit .env with your keys if deploying to testnets
```

### 3. Start Hardhat Local Network

```bash
# In backend directory
npm run node
```

This will start a local Ethereum network on `http://localhost:8545` with 20 test accounts, each funded with 10,000 ETH.

### 4. Deploy Smart Contract

Open a new terminal in the backend directory:

```bash
# Compile and deploy the contract
npm run compile
npm run deploy
```

**Important**: Copy the deployed contract address from the output!

### 5. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `frontend/.env` and add the contract address:

```env
REACT_APP_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
REACT_APP_NETWORK_NAME=localhost
REACT_APP_NETWORK_ID=31337
REACT_APP_RPC_URL=http://127.0.0.1:8545
```

### 6. Start Frontend

```bash
# In frontend directory
npm start
```

The app will open at `http://localhost:3000`

### 7. MetaMask Configuration

1. **Install MetaMask**: Download from [metamask.io](https://metamask.io)

2. **Add Hardhat Network**:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

3. **Import Test Account**:
   - Copy a private key from the Hardhat console output
   - Import it into MetaMask
   - You'll have 10,000 ETH to test with!

## 🎯 How to Use

### For Voters

1. **Connect Wallet**: Click "Connect MetaMask" button
2. **Check Network**: Ensure you're on Hardhat Local Network (Chain ID: 31337)
3. **View Proposals**: See all available candidates/proposals
4. **Cast Vote**: Click "Vote" on your preferred proposal
5. **Confirm Transaction**: Approve the transaction in MetaMask
6. **View Results**: See real-time vote counts and current winner

### For Contract Owner

As the contract deployer, you can:

- Add new proposals (modify and redeploy contract)
- Set voting deadlines
- View all voting statistics

## 🧪 Testing

### Run Smart Contract Tests

```bash
cd backend
npm test
```

The test suite includes:
- Contract deployment verification
- Proposal management tests
- Voting functionality tests
- Security and access control tests
- Edge case handling

### Test Coverage

- ✅ Owner can add proposals
- ✅ Users can vote only once
- ✅ Invalid proposal ID rejection
- ✅ Voting deadline enforcement
- ✅ Winner calculation
- ✅ Event emission verification

## 🔧 Available Scripts

### Backend Scripts

```bash
npm run compile      # Compile smart contracts
npm run deploy       # Deploy to local network
npm run deploy:testnet # Deploy to Sepolia testnet
npm run test         # Run contract tests
npm run node         # Start Hardhat local network
npm run clean        # Clean artifacts
```

### Frontend Scripts

```bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run React tests
```

## 🌐 Network Configuration

### Local Development (Default)
- **Network**: Hardhat Local
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337

### Testnet Deployment (Optional)
To deploy to Ethereum testnets:

1. Get testnet ETH from faucets
2. Configure `.env` in backend:
   ```env
   SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
   PRIVATE_KEY=your_private_key_here
   ```
3. Deploy: `npm run deploy:testnet`

## 🔒 Security Features

- **Access Control**: Only contract owner can add proposals
- **Vote Uniqueness**: Blockchain enforces one vote per address
- **Immutable Records**: All votes stored permanently on blockchain
- **Transparent Results**: Public, verifiable vote counting
- **Time-based Controls**: Optional voting deadlines

## 🎨 UI Features

- **Modern Design**: Glassmorphism effects and gradients
- **Responsive Layout**: Works on desktop and mobile
- **Loading States**: Visual feedback during transactions
- **Toast Notifications**: Success/error messages
- **Real-time Updates**: Automatic data refresh
- **Network Warnings**: Alerts for wrong network
- **Wallet Status**: Clear connection indicators

## 🐛 Common Issues & Solutions

### MetaMask Connection Issues
```bash
# Reset MetaMask account (Settings > Advanced > Reset Account)
# Clear browser cache
# Ensure correct network is selected
```

### Contract Interaction Errors
```bash
# Verify contract address in .env
# Check network connection (Chain ID: 31337)
# Ensure Hardhat network is running
```

### Transaction Failures
```bash
# Check gas settings in MetaMask
# Verify account has sufficient ETH
# Try increasing gas limit manually
```

## 📝 Smart Contract Details

### Key Functions

- `vote(proposalId)`: Cast a vote for a proposal
- `getAllProposals()`: Get all proposals with vote counts
- `getWinner()`: Get current winning proposal
- `hasVoted(address)`: Check if address has voted
- `addProposal(name)`: Add new proposal (owner only)
- `setVotingDeadline(timestamp)`: Set voting deadline (owner only)

### Events

- `VoteCast(voter, proposalId)`: Emitted when vote is cast
- `ProposalAdded(proposalId, name)`: Emitted when proposal is added
- `VotingDeadlineSet(deadline)`: Emitted when deadline is set

## 🚀 Deployment to Mainnet

**⚠️ Warning**: This is educational software. For production use:

1. **Security Audit**: Have contracts professionally audited
2. **Gas Optimization**: Optimize for lower transaction costs
3. **Access Controls**: Implement more sophisticated ownership models
4. **Upgradability**: Consider proxy patterns for contract upgrades

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Hardhat Team**: For the excellent development framework
- **OpenZeppelin**: For security best practices
- **Ethereum Community**: For building the decentralized future
- **MetaMask**: For making Web3 accessible

## 📞 Support

If you encounter any issues:

1. Check the [Common Issues](#-common-issues--solutions) section
2. Review your network configuration
3. Verify all environment variables are set correctly
4. Ensure Hardhat local network is running

---

**Happy Voting! 🗳️**

*Built with ❤️ for the decentralized web* 