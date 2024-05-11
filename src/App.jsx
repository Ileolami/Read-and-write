import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import contractABI from './contractABI.json';
import { BrowserProvider } from 'ethers';
import Navbar from './components/Navbar';

function App() {
  const [votesForCandidate1, setVotesForCandidate1] = useState(0);
  const [votesForCandidate2, setVotesForCandidate2] = useState(0);

  // const provider = new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ENDPOINT);
 

  //const provider =  new JsonRpcProvider(import.meta.env.VITE_ALCHEMY_ENDPOINT);

  // const signer = provider.getSigner();
  // console.log(provider)
  const contractAddress = '0xcc61c44548216e974ee596dabe6e6e5c52a5b60c';
  // const contract = new ethers.Contract(contractAddress, contractABI);

  //console.log(contract);

  const connecttoContractInstance = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signerAddress = await provider.getSigner();
      console.log(signerAddress);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signerAddress
      );
      return contract;
    } catch (error) {
      console.error('Error connecting to wallet:', error.message);
    }
  }
  

  const getTotalVotesForCandidate1 = async () => {
    try {
      const contract = await connecttoContractInstance();
      const votes = contract.totalVotesForCandidate1()
     console.log(votes)
     setVotesForCandidate1(votes.toNumber());
    } catch (error) {
      console.log('Error connecting to wallet:', error);
    }
  };

  const getTotalVotesForCandidate2 = async () => {
    try {
      const contract = await connecttoContractInstance();
      const votes = contract.totalVotesForCandidate2()
     console.log(votes)
     setVotesForCandidate1(votes.toNumber());
    } catch (error) {
      console.log('Error connecting to wallet:', error);
    }
  };

  const castVote = async (candidateId) => {
    try {
      // const signerAddress = await provider.getSigner();
      // console.log(signerAddress)
      // if (!signerAddress) {
      //   alert('Please connect to a wallet');
      //   return;
      // }
  
      // await contract.vote(candidateId);
      // if (candidateId === 1) {
      //   getTotalVotesForCandidate1();
      // } else if (candidateId === 2) {
      //   getTotalVotesForCandidate2();
      // }

      const contract = await connecttoContractInstance();
      const contractInstance = contract.vote(candidateId);
      console.log(contractInstance)
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  useEffect(() => {
    getTotalVotesForCandidate1();
    getTotalVotesForCandidate2();
  }, [votesForCandidate1, votesForCandidate2]);

  return (
<>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <Navbar />
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
    </div></>
  );
}

export default App;