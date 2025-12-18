// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title Voting
 * @dev A decentralized voting contract where users can vote on proposals
 * @author Your Name
 */
contract Voting {
    // Struct to represent a proposal
    struct Proposal {
        string name;
        uint256 voteCount;
    }

    // Contract owner (can add proposals and manage voting)
    address public owner;
    
    // Array of all proposals
    Proposal[] public proposals;
    
    // Mapping to track if an address has voted
    mapping(address => bool) public hasVoted;
    
    // Mapping to track which proposal an address voted for
    mapping(address => uint256) public voterChoice;
    
    // Voting deadline (optional feature)
    uint256 public votingDeadline;
    
    // Events
    event ProposalAdded(uint256 indexed proposalId, string name);
    event VoteCast(address indexed voter, uint256 indexed proposalId);
    event VotingDeadlineSet(uint256 deadline);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier votingActive() {
        require(block.timestamp < votingDeadline || votingDeadline == 0, "Voting period has ended");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    /**
     * @dev Constructor sets the owner and initializes proposals
     * @param _proposalNames Array of proposal names to initialize
     */
    constructor(string[] memory _proposalNames) {
        owner = msg.sender;
        
        // Initialize proposals
        for (uint256 i = 0; i < _proposalNames.length; i++) {
            proposals.push(Proposal({
                name: _proposalNames[i],
                voteCount: 0
            }));
            emit ProposalAdded(i, _proposalNames[i]);
        }
    }

    /**
     * @dev Add a new proposal (only owner)
     * @param _name Name of the proposal
     */
    function addProposal(string memory _name) external onlyOwner {
        proposals.push(Proposal({
            name: _name,
            voteCount: 0
        }));
        emit ProposalAdded(proposals.length - 1, _name);
    }

    /**
     * @dev Set voting deadline (only owner)
     * @param _deadline Timestamp when voting should end (0 for no deadline)
     */
    function setVotingDeadline(uint256 _deadline) external onlyOwner {
        votingDeadline = _deadline;
        emit VotingDeadlineSet(_deadline);
    }

    /**
     * @dev Vote for a proposal
     * @param _proposalId Index of the proposal to vote for
     */
    function vote(uint256 _proposalId) external votingActive hasNotVoted {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        
        // Mark voter as having voted
        hasVoted[msg.sender] = true;
        voterChoice[msg.sender] = _proposalId;
        
        // Increment vote count for the chosen proposal
        proposals[_proposalId].voteCount++;
        
        emit VoteCast(msg.sender, _proposalId);
    }

    /**
     * @dev Get total number of proposals
     * @return Number of proposals
     */
    function getProposalCount() external view returns (uint256) {
        return proposals.length;
    }

    /**
     * @dev Get proposal details
     * @param _proposalId Index of the proposal
     * @return name Name of the proposal
     * @return voteCount Number of votes for the proposal
     */
    function getProposal(uint256 _proposalId) external view returns (string memory name, uint256 voteCount) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.name, proposal.voteCount);
    }

    /**
     * @dev Get all proposals at once
     * @return names Array of proposal names
     * @return voteCounts Array of vote counts
     */
    function getAllProposals() external view returns (string[] memory names, uint256[] memory voteCounts) {
        names = new string[](proposals.length);
        voteCounts = new uint256[](proposals.length);
        
        for (uint256 i = 0; i < proposals.length; i++) {
            names[i] = proposals[i].name;
            voteCounts[i] = proposals[i].voteCount;
        }
        
        return (names, voteCounts);
    }

    /**
     * @dev Get the current winner (proposal with most votes)
     * @return winnerIndex Index of winning proposal
     * @return winnerName Name of winning proposal
     * @return winnerVoteCount Vote count of winning proposal
     */
    function getWinner() external view returns (uint256 winnerIndex, string memory winnerName, uint256 winnerVoteCount) {
        require(proposals.length > 0, "No proposals available");
        
        uint256 winningVoteCount = 0;
        uint256 winningProposalIndex = 0;
        
        for (uint256 i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposalIndex = i;
            }
        }
        
        return (winningProposalIndex, proposals[winningProposalIndex].name, winningVoteCount);
    }

    /**
     * @dev Check if voting is currently active
     * @return bool True if voting is active
     */
    function isVotingActive() external view returns (bool) {
        return block.timestamp < votingDeadline || votingDeadline == 0;
    }

    /**
     * @dev Get total number of votes cast
     * @return uint256 Total votes
     */
    function getTotalVotes() external view returns (uint256) {
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < proposals.length; i++) {
            totalVotes += proposals[i].voteCount;
        }
        return totalVotes;
    }
} 