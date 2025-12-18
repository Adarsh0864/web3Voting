import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  connectWallet, 
  isMetaMaskInstalled, 
  checkWalletConnection,
  getWalletBalance 
} from './utils/wallet';
import { 
  fetchProposals, 
  voteForProposal, 
  checkIfUserVoted, 
  getUserVoteChoice,
  getContractWithSigner
} from './utils/contract';
import WalletConnection from './components/WalletConnection';
import VotingDashboard from './components/VotingDashboard';

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [proposals, setProposals] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useState(null);

  // Load data when wallet is connected
  useEffect(() => {
    if (account) {
      loadBlockchainData();
    }
  }, [account]);

  // Check if wallet is already connected
  useEffect(() => {
    checkExistingConnection();
  }, []);

  const checkExistingConnection = async () => {
    if (isMetaMaskInstalled()) {
      const connection = await checkWalletConnection();
      if (connection) {
        setAccount(connection.address);
        setSigner(connection.signer);
        const bal = await getWalletBalance(connection.address);
        setBalance(bal);
      }
    }
  };

  const loadBlockchainData = async () => {
    try {
      setLoading(true);
      
      // Get proposals
      const proposalData = await fetchProposals();
      setProposals(proposalData);
      
      // Check if user has voted
      const voted = await checkIfUserVoted(account);
      setHasVoted(voted);
      
      if (voted) {
        const voteChoice = await getUserVoteChoice(account);
        // Convert vote choice ID to proposal name
        const votedProposal = proposalData.find(p => p.id === voteChoice);
        setUserVote(votedProposal?.name || null);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load voting data');
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const connection = await connectWallet();
      setAccount(connection.address);
      setSigner(connection.signer);
      const bal = await getWalletBalance(connection.address);
      setBalance(bal);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to connect wallet');
    }
  };

  const handleDisconnect = () => {
    setAccount(null);
    setBalance('0');
    setProposals([]);
    setHasVoted(false);
    setUserVote(null);
    setSigner(null);
    toast.info('Wallet disconnected');
  };

  const handleVote = async (proposalName) => {
    try {
      setLoading(true);
      
      // Find proposal ID by name
      const proposal = proposals.find(p => p.name === proposalName);
      if (!proposal) {
        throw new Error('Invalid proposal');
      }
      
      // Vote using the proposal ID
      const tx = await voteForProposal(signer, proposal.id);
      toast.info('Transaction submitted. Waiting for confirmation...');
      
      await tx.wait();
      toast.success(`Successfully voted for ${proposalName}!`);
      
      // Reload data
      await loadBlockchainData();
    } catch (error) {
      console.error('Voting error:', error);
      
      let errorMessage = 'Failed to submit vote';
      if (error.code === 4001) {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message.includes('already voted')) {
        errorMessage = 'You have already voted';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <span className="app-logo"></span>
            <div>
              <div className="app-name">Decentralized Voting</div>
              <div className="header-tagline">Secure blockchain-based voting system</div>
            </div>
          </div>
          <div className="header-right">
            {/* Could add additional header items here */}
          </div>
        </div>
      </header>

      <main className="main-content">
        <WalletConnection
          account={account}
          balance={balance}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        <VotingDashboard
          proposals={proposals}
          hasVoted={hasVoted}
          userVote={userVote}
          onVote={handleVote}
          isConnected={!!account}
          loading={loading}
        />
      </main>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App; 