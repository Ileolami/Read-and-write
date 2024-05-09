import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [votesForCandidate1, setVotesForCandidate1] = useState(0);
  const [votesForCandidate2, setVotesForCandidate2] = useState(0);

  

  const castVote = (candidateId) => {
    console.log(`Vote for Candidate ${candidateId}`);
    if (candidateId === 1) {
      setVotesForCandidate1(votesForCandidate1 + 1);
    } else if (candidateId === 2) {
      setVotesForCandidate2(votesForCandidate2 + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">Simple Voting DApp</h1>
      <button 
        onClick={() => castVote(1)} 
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-950"
      >
        Vote for Candidate 1
      </button>
      <button 
        onClick={() => castVote(2)} 
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-950"
      >
        Vote for Candidate 2
      </button>
      <h2 className="mt-6 text-2xl text-gray-700">Results:</h2>
      <p className="text-gray-700">Votes for Candidate 1: {votesForCandidate1}</p>
      <p className="text-gray-700">Votes for Candidate 2: {votesForCandidate2}</p>
    </div>
  );
}

export default App;