import React from 'react';

/**
 * ProposalCard Component
 * Displays individual proposal with voting functionality
 */
const ProposalCard = ({ proposal, onVote, hasVoted, userVote, isWinner, totalVotes }) => {
  const votePercentage = totalVotes > 0 ? (proposal.voteCount / totalVotes * 100) : 0;

  return (
    <div className="proposal-card">
      <div className="proposal-header">
        <h3 className="proposal-name">{proposal.name}</h3>
        <p className="proposal-id">Proposal #{proposal.id + 1}</p>
      </div>

      {isWinner && (
        <span className="winner-badge">Leading</span>
      )}

      <div className="vote-stats">
        <div className="vote-count">{proposal.voteCount}</div>
        <div className="vote-label">votes</div>
        <div className="vote-percentage">{votePercentage.toFixed(1)}% of total</div>
      </div>

      {hasVoted && userVote === proposal.name && (
        <div className="user-vote-status">
          <i className="fas fa-check-circle"></i>
          You voted for this proposal
        </div>
      )}

      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${votePercentage}%` }}
          />
        </div>
      </div>

      <button
        className={`vote-button ${hasVoted && userVote === proposal.name ? 'voted' : ''}`}
        onClick={() => onVote(proposal.name)}
        disabled={hasVoted}
      >
        {hasVoted ? (
          userVote === proposal.name ? 'Your Vote' : 'Already Voted'
        ) : (
          `Vote for ${proposal.name}`
        )}
      </button>
    </div>
  );
};

export default ProposalCard; 