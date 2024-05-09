// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

contract Voting {
    // The total votes for each candidate
    uint public totalVotesForCandidate1 = 0;
    uint public totalVotesForCandidate2 = 0;

    // Voting function
    function vote(uint candidateID) public {
        if(candidateID == 1) {
            totalVotesForCandidate1 += 1;
        } else if(candidateID == 2) {
            totalVotesForCandidate2 += 1;
        }
    }

    // Function to get the total votes for a candidate
    function totalVotesFor(uint candidateID) public view returns (uint) {
         uint totalVotes;
        if(candidateID == 1) {
            totalVotes = totalVotesForCandidate1;
        } else if(candidateID == 2) {
            totalVotes = totalVotesForCandidate2;
        }
        return totalVotes;
    }
}