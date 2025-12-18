import React from 'react';
import ProposalCard from './ProposalCard';

/**
 * VotingDashboard Component
 * Main dashboard for displaying all proposals and voting statistics
 */
const VotingDashboard = ({ 
  proposals, 
  hasVoted, 
  userVote, 
  onVote, 
  isConnected,
  loading
}) => {
  const totalVotes = proposals.reduce((sum, p) => sum + p.voteCount, 0);
  const winner = proposals.reduce((prev, current) => 
    current.voteCount > prev.voteCount ? current : prev
  , proposals[0]);

  if (loading) {
    return (
      <div className="empty-state">
        <div className="loading-spinner"></div>
        <p className="empty-state-text">Loading voting data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Voting Dashboard</h1>
        <p className="dashboard-subtitle">View proposals and cast your vote</p>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Proposals</div>
          <div className="stat-value">{proposals.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Votes</div>
          <div className="stat-value">{totalVotes}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Current Leader</div>
          <div className="stat-value">{winner?.name || '-'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Your Status</div>
          <div className="stat-value">{hasVoted ? 'Voted' : 'Not Voted'}</div>
        </div>
      </div>

      {/* Proposals */}
      <div className="proposals-section">
        <div className="section-header">
          <h2 className="section-title">Active Proposals</h2>
        </div>
        
        {!isConnected && (
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <p className="empty-state-text">Connect your wallet to view and vote on proposals</p>
          </div>
        )}
        
        {isConnected && proposals.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <p className="empty-state-text">No proposals available at the moment</p>
          </div>
        )}

        {isConnected && proposals.length > 0 && (
          <div className="proposals-grid">
            {proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onVote={onVote}
                hasVoted={hasVoted}
                userVote={userVote}
                isWinner={winner?.id === proposal.id && totalVotes > 0}
                totalVotes={totalVotes}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default VotingDashboard; 