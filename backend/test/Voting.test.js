const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let voting;
  let owner;
  let voter1;
  let voter2;
  let voter3;

  const initialProposals = ["Alice", "Bob", "Charlie"];

  beforeEach(async function () {
    // Get signers
    [owner, voter1, voter2, voter3] = await ethers.getSigners();

    // Deploy contract
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(initialProposals);
    await voting.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await voting.owner()).to.equal(owner.address);
    });

    it("Should initialize proposals correctly", async function () {
      const proposalCount = await voting.getProposalCount();
      expect(proposalCount).to.equal(3);

      for (let i = 0; i < initialProposals.length; i++) {
        const [name, voteCount] = await voting.getProposal(i);
        expect(name).to.equal(initialProposals[i]);
        expect(voteCount).to.equal(0);
      }
    });
  });

  describe("Adding Proposals", function () {
    it("Should allow owner to add new proposals", async function () {
      await voting.connect(owner).addProposal("David");
      
      const proposalCount = await voting.getProposalCount();
      expect(proposalCount).to.equal(4);
      
      const [name, voteCount] = await voting.getProposal(3);
      expect(name).to.equal("David");
      expect(voteCount).to.equal(0);
    });

    it("Should not allow non-owner to add proposals", async function () {
      await expect(
        voting.connect(voter1).addProposal("David")
      ).to.be.revertedWith("Only owner can perform this action");
    });
  });

  describe("Voting", function () {
    it("Should allow users to vote", async function () {
      await voting.connect(voter1).vote(0); // Vote for Alice
      
      const [, voteCount] = await voting.getProposal(0);
      expect(voteCount).to.equal(1);
      
      expect(await voting.hasVoted(voter1.address)).to.be.true;
      expect(await voting.voterChoice(voter1.address)).to.equal(0);
    });

    it("Should not allow users to vote twice", async function () {
      await voting.connect(voter1).vote(0);
      
      await expect(
        voting.connect(voter1).vote(1)
      ).to.be.revertedWith("You have already voted");
    });

    it("Should not allow voting for invalid proposal", async function () {
      await expect(
        voting.connect(voter1).vote(10)
      ).to.be.revertedWith("Invalid proposal ID");
    });

    it("Should emit VoteCast event", async function () {
      await expect(voting.connect(voter1).vote(0))
        .to.emit(voting, "VoteCast")
        .withArgs(voter1.address, 0);
    });
  });

  describe("Voting Deadline", function () {
    it("Should allow owner to set voting deadline", async function () {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      
      await voting.connect(owner).setVotingDeadline(futureTimestamp);
      expect(await voting.votingDeadline()).to.equal(futureTimestamp);
    });

    it("Should prevent voting after deadline", async function () {
      // Set deadline to past timestamp
      const pastTimestamp = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
      await voting.connect(owner).setVotingDeadline(pastTimestamp);
      
      await expect(
        voting.connect(voter1).vote(0)
      ).to.be.revertedWith("Voting period has ended");
    });
  });

  describe("Getting Results", function () {
    beforeEach(async function () {
      // Set up some votes
      await voting.connect(voter1).vote(0); // Alice
      await voting.connect(voter2).vote(0); // Alice
      await voting.connect(voter3).vote(1); // Bob
    });

    it("Should return correct proposal details", async function () {
      const [name, voteCount] = await voting.getProposal(0);
      expect(name).to.equal("Alice");
      expect(voteCount).to.equal(2);
    });

    it("Should return all proposals correctly", async function () {
      const [names, voteCounts] = await voting.getAllProposals();
      
      expect(names).to.deep.equal(["Alice", "Bob", "Charlie"]);
      expect(voteCounts[0]).to.equal(2); // Alice: 2 votes
      expect(voteCounts[1]).to.equal(1); // Bob: 1 vote
      expect(voteCounts[2]).to.equal(0); // Charlie: 0 votes
    });

    it("Should return correct winner", async function () {
      const [winnerIndex, winnerName, winnerVoteCount] = await voting.getWinner();
      
      expect(winnerIndex).to.equal(0);
      expect(winnerName).to.equal("Alice");
      expect(winnerVoteCount).to.equal(2);
    });

    it("Should return correct total votes", async function () {
      const totalVotes = await voting.getTotalVotes();
      expect(totalVotes).to.equal(3);
    });

    it("Should return voting status correctly", async function () {
      expect(await voting.isVotingActive()).to.be.true;
      
      // Set deadline to past
      const pastTimestamp = Math.floor(Date.now() / 1000) - 3600;
      await voting.connect(owner).setVotingDeadline(pastTimestamp);
      
      expect(await voting.isVotingActive()).to.be.false;
    });
  });
}); 