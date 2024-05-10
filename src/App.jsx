import React, { useState, useEffect } from 'react';
import {JsonRpcProvider, ethers } from 'ethers';
import contractABI from './contractABI.json';

function App() {
  const [votesForCandidate1, setVotesForCandidate1] = useState(0);
  const [votesForCandidate2, setVotesForCandidate2] = useState(0);

  //const provider = new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ENDPOINT);
 

  const provider =  new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ENDPOINT);

  // const signer = provider.getSigner();
  // console.log(provider)
  const contractAddress = '0xcc61c44548216e974ee596dabe6e6e5c52a5b60c';
  const contract = new ethers.Contract(contractAddress, contractABI);

  //console.log(contract);
  

  const getTotalVotesForCandidate1 = async () => {
    const votes = await contract.totalVotesForCandidate1();
    setVotesForCandidate1(votes.toNumber());
  };

  const getTotalVotesForCandidate2 = async () => {
    const votes = await contract.totalVotesForCandidate2();
    setVotesForCandidate2(votes.toNumber());
  };

  const castVote = async (candidateId) => {
    try {
      const signerAddress = await provider.getSigner();
      if (!signerAddress) {
        alert('Please connect to a wallet');
        return;
      }
  
      await contract.vote(candidateId);
      if (candidateId === 1) {
        getTotalVotesForCandidate1();
      } else if (candidateId === 2) {
        getTotalVotesForCandidate2();
      }
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  useEffect(() => {
    getTotalVotesForCandidate1();
    getTotalVotesForCandidate2();
  }, []);

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