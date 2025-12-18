import { ethers } from 'ethers';

// Contract ABI - This should match your deployed contract
export const VOTING_ABI = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "_proposalNames",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "ProposalAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "VoteCast",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "VotingDeadlineSet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "addProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllProposals",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "names",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "voteCounts",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWinner",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "winnerIndex",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "winnerName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "winnerVoteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isVotingActive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "setVotingDeadline",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voterChoice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingDeadline",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract configuration
export const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
export const NETWORK_ID = process.env.REACT_APP_NETWORK_ID || '31337';
export const RPC_URL = process.env.REACT_APP_RPC_URL || 'http://127.0.0.1:8545';

/**
 * Get the contract instance for read operations
 * @returns {ethers.Contract} Contract instance
 */
export const getReadOnlyContract = () => {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    return new ethers.Contract(CONTRACT_ADDRESS, VOTING_ABI, provider);
  } catch (error) {
    console.error('Error creating read-only contract:', error);
    throw new Error('Failed to connect to contract');
  }
};

/**
 * Get the contract instance for write operations (requires signer)
 * @param {ethers.Signer} signer - The signer from MetaMask
 * @returns {ethers.Contract} Contract instance with signer
 */
export const getContractWithSigner = (signer) => {
  try {
    return new ethers.Contract(CONTRACT_ADDRESS, VOTING_ABI, signer);
  } catch (error) {
    console.error('Error creating contract with signer:', error);
    throw new Error('Failed to connect to contract with signer');
  }
};

/**
 * Fetch all proposals from the contract
 * @returns {Promise<Array>} Array of proposals with names and vote counts
 */
export const fetchProposals = async () => {
  try {
    const contract = getReadOnlyContract();
    const [names, voteCounts] = await contract.getAllProposals();
    
    return names.map((name, index) => ({
      id: index,
      name,
      voteCount: Number(voteCounts[index]),
    }));
  } catch (error) {
    console.error('Error fetching proposals:', error);
    throw new Error('Failed to fetch proposals');
  }
};

/**
 * Check if a user has already voted
 * @param {string} userAddress - The user's wallet address
 * @returns {Promise<boolean>} True if user has voted
 */
export const checkIfUserVoted = async (userAddress) => {
  try {
    const contract = getReadOnlyContract();
    return await contract.hasVoted(userAddress);
  } catch (error) {
    console.error('Error checking vote status:', error);
    return false;
  }
};

/**
 * Get the user's vote choice
 * @param {string} userAddress - The user's wallet address
 * @returns {Promise<number>} The proposal ID the user voted for
 */
export const getUserVoteChoice = async (userAddress) => {
  try {
    const contract = getReadOnlyContract();
    const choice = await contract.voterChoice(userAddress);
    return Number(choice);
  } catch (error) {
    console.error('Error fetching user vote choice:', error);
    return null;
  }
};

/**
 * Vote for a proposal
 * @param {ethers.Signer} signer - The signer from MetaMask
 * @param {number} proposalId - The ID of the proposal to vote for
 * @returns {Promise<ethers.TransactionResponse>} Transaction response
 */
export const voteForProposal = async (signer, proposalId) => {
  try {
    const contract = getContractWithSigner(signer);
    const tx = await contract.vote(proposalId);
    return tx;
  } catch (error) {
    console.error('Error voting for proposal:', error);
    throw error;
  }
};

/**
 * Get the current winner
 * @returns {Promise<Object>} Winner information
 */
export const getWinner = async () => {
  try {
    const contract = getReadOnlyContract();
    const [winnerIndex, winnerName, winnerVoteCount] = await contract.getWinner();
    
    return {
      index: Number(winnerIndex),
      name: winnerName,
      voteCount: Number(winnerVoteCount),
    };
  } catch (error) {
    console.error('Error getting winner:', error);
    return null;
  }
};

/**
 * Get total number of votes cast
 * @returns {Promise<number>} Total votes
 */
export const getTotalVotes = async () => {
  try {
    const contract = getReadOnlyContract();
    const total = await contract.getTotalVotes();
    return Number(total);
  } catch (error) {
    console.error('Error getting total votes:', error);
    return 0;
  }
};

/**
 * Check if voting is currently active
 * @returns {Promise<boolean>} True if voting is active
 */
export const isVotingActive = async () => {
  try {
    const contract = getReadOnlyContract();
    return await contract.isVotingActive();
  } catch (error) {
    console.error('Error checking voting status:', error);
    return true; // Default to true if error
  }
};

/**
 * Get contract owner address
 * @returns {Promise<string>} Owner address
 */
export const getContractOwner = async () => {
  try {
    const contract = getReadOnlyContract();
    return await contract.owner();
  } catch (error) {
    console.error('Error getting contract owner:', error);
    return null;
  }
}; 