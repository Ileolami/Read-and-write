import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import contractABI from './contractABI.json';
import { BrowserProvider } from 'ethers';
import Navbar from './components/Navbar';

function App() {
  const [votesForCandidate1, setVotesForCandidate1] = useState(0);
  const [votesForCandidate2, setVotesForCandidate2] = useState(0);
  const contractAddress = '0xcc61c44548216e974ee596dabe6e6e5c52a5b60c';

    // Create a function to connect to the contract instance and a signer 
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

   //a function to get the current total votes for each candidate
      const getTotalVotesForCandidate = async (candidateID) => {
        try {
          
          const contract = await connecttoContractInstance();
          let votes = await contract.totalVotesFor(candidateID);
          console.log(votes);
          return parseInt(votes); // Parse the result to integer
        } catch (error) {
          console.error('Error getting total votes:', error);
          throw error; // Rethrow the error for further handling
        }
      }
      
      useEffect(() => {
        getTotalVotesForCandidate(1).then(votes => {
          setVotesForCandidate1(votes);
        }).catch(error => {
          console.error('Failed to get votes for candidate 1:', error);
        });
      
        getTotalVotesForCandidate(2).then(votes => {
          setVotesForCandidate2(votes);
        }).catch(error => {
          console.error('Failed to get votes for candidate 2:', error);
        });
      }, []);
      

      // a fucntion to cast votes connected to buttons
      const castVote = async (candidateId) => {
        try {
          const contract = await connecttoContractInstance();
          await contract.vote(candidateId);
          // Update the vote counts in the state after casting a vote
          const newVotesForCandidate1 = await getTotalVotesForCandidate(1);
          const newVotesForCandidate2 = await getTotalVotesForCandidate(2);
          setVotesForCandidate1(newVotesForCandidate1);
          setVotesForCandidate2(newVotesForCandidate2);
        } catch (error) {
          console.error('Error casting vote:', error);
        }
      };
      


  return (
    <main className="min-h-screen bg-gray-100 my-10">
      <Navbar />
    <div className='grid place-content-center'>
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
        <div className='flex flex-col justify-center items-center'>
        <h2 className="mt-6 text-2xl text-gray-700 font-bold">Results</h2>
          <p className="text-gray-700">Votes for Candidate 1: {votesForCandidate1}</p>
          <p className="text-gray-700">Votes for Candidate 2: {votesForCandidate2}</p>
        </div>
        </div></main>
      );
}

export default App;