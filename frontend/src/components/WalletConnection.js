import React from 'react';

/**
 * WalletConnection Component
 * Handles wallet connection status and connect/disconnect functionality
 */
const WalletConnection = ({ account, balance, onConnect, onDisconnect }) => {
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance) => {
    return parseFloat(balance).toFixed(2);
  };

  return (
    <div className="wallet-section">
      <div className="wallet-header">
        <h2 className="wallet-title">Wallet Connection</h2>
        {account ? (
          <button onClick={onDisconnect} className="btn btn-text">
            Disconnect
          </button>
        ) : (
          <button onClick={onConnect} className="btn btn-primary">
            Connect Wallet
          </button>
        )}
      </div>
      
      <div className="wallet-status">
        <div className="status-indicator">
          <span className={`status-dot ${account ? 'connected' : ''}`}></span>
          {account ? 'Connected' : 'Not connected'}
        </div>
        
        {account && (
          <div className="wallet-details">
            <span className="wallet-address">
              {formatAddress(account)}
            </span>
            <span className="wallet-balance">
              {formatBalance(balance)} ETH
            </span>
          </div>
        )}
      </div>
      
      {!account && (
        <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Connect your MetaMask wallet to participate in voting
        </p>
      )}
    </div>
  );
};

export default WalletConnection; 