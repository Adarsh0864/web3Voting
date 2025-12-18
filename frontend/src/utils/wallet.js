import { ethers } from 'ethers';

/**
 * Check if MetaMask is installed
 * @returns {boolean} True if MetaMask is available
 */
export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

/**
 * Connect to MetaMask wallet
 * @returns {Promise<Object>} Connection result with provider, signer, and address
 */
export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
  }

  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // Get network information
    const network = await provider.getNetwork();

    return {
      provider,
      signer,
      address,
      network: {
        name: network.name,
        chainId: Number(network.chainId),
      },
    };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    
    if (error.code === 4001) {
      throw new Error('User rejected the connection request');
    } else if (error.code === -32002) {
      throw new Error('Connection request is already pending. Please check MetaMask.');
    } else {
      throw new Error('Failed to connect to wallet. Please try again.');
    }
  }
};

/**
 * Check if wallet is already connected
 * @returns {Promise<Object|null>} Connection info if connected, null otherwise
 */
export const checkWalletConnection = async () => {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      return null;
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();

    return {
      provider,
      signer,
      address,
      network: {
        name: network.name,
        chainId: Number(network.chainId),
      },
    };
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return null;
  }
};

/**
 * Switch to the correct network (Hardhat local network)
 * @returns {Promise<boolean>} True if switch was successful
 */
export const switchToCorrectNetwork = async () => {
  const targetChainId = process.env.REACT_APP_NETWORK_ID || '31337';
  const targetChainIdHex = `0x${parseInt(targetChainId).toString(16)}`;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetChainIdHex }],
    });
    return true;
  } catch (error) {
    // If the network doesn't exist, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: targetChainIdHex,
              chainName: 'Hardhat Local',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: [process.env.REACT_APP_RPC_URL || 'http://127.0.0.1:8545'],
              blockExplorerUrls: null,
            },
          ],
        });
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        return false;
      }
    } else {
      console.error('Error switching network:', error);
      return false;
    }
  }
};

/**
 * Format wallet address for display
 * @param {string} address - The wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Format ether amount for display
 * @param {string|number} amount - Amount in wei
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted amount
 */
export const formatEther = (amount, decimals = 4) => {
  try {
    const etherAmount = ethers.formatEther(amount.toString());
    return parseFloat(etherAmount).toFixed(decimals);
  } catch (error) {
    console.error('Error formatting ether:', error);
    return '0.0000';
  }
};

/**
 * Get wallet balance
 * @param {string} address - Wallet address
 * @param {ethers.Provider} provider - Ethereum provider
 * @returns {Promise<string>} Balance in ETH
 */
export const getWalletBalance = async (address, provider) => {
  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return '0';
  }
};

/**
 * Listen for account changes
 * @param {Function} callback - Callback function to handle account change
 */
export const onAccountsChanged = (callback) => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      callback(null);
    } else {
      // User switched accounts
      callback(accounts[0]);
    }
  });
};

/**
 * Listen for network changes
 * @param {Function} callback - Callback function to handle network change
 */
export const onChainChanged = (callback) => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.on('chainChanged', (chainId) => {
    // Convert hex to decimal
    const networkId = parseInt(chainId, 16);
    callback(networkId);
  });
};

/**
 * Remove all event listeners
 */
export const removeEventListeners = () => {
  if (!isMetaMaskInstalled()) return;

  window.ethereum.removeAllListeners('accountsChanged');
  window.ethereum.removeAllListeners('chainChanged');
};

/**
 * Sign a message with the wallet
 * @param {ethers.Signer} signer - The wallet signer
 * @param {string} message - Message to sign
 * @returns {Promise<string>} Signed message
 */
export const signMessage = async (signer, message) => {
  try {
    return await signer.signMessage(message);
  } catch (error) {
    console.error('Error signing message:', error);
    throw new Error('Failed to sign message');
  }
}; 