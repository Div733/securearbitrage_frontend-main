import { useState } from 'react';
import Web3 from 'web3';

// Web3 setup
const web3 = new Web3('https://sly-cold-breeze.bsc.quiknode.pro/e7a6f8cb548ad0ab1e6a45f08149b03a3a096a9e');

const factoryAddresses = {
  PancakeSwap: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  BiSwap: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
  ApeSwap: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
  BabySwap: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
};

const getPairABI = [
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const useTokenPairChecker = () => {
  const [loading, setLoading] = useState(false);
  const [availablePairs, setAvailablePairs] = useState([]);
  const [unavailablePairs, setUnavailablePairs] = useState([]);
  const [error, setError] = useState('');

  const getPairAddress = async (factoryName, factoryAddress, token0, token1) => {
    try {
      const factoryContract = new web3.eth.Contract(getPairABI, factoryAddress);
      const pairAddress = await factoryContract.methods.getPair(token0, token1).call();

      if (pairAddress === '0x0000000000000000000000000000000000000000') {
        throw new Error(`Pair not available on ${factoryName}`);
      }

      return { factoryName, pairAddress };
    } catch (error) {
      console.error(`Error for ${factoryName}:`, error.message);
      return { factoryName, pairAddress: null };
    }
  };

  const checkPairs = async (token0, token1) => {
    setLoading(true);
    setAvailablePairs([]);
    setUnavailablePairs([]);
    setError('');

    try {
      const promises = Object.entries(factoryAddresses).map(([factoryName, factoryAddress]) =>
        getPairAddress(factoryName, factoryAddress, token0, token1)
      );

      const results = await Promise.all(promises);

      const available = results.filter(({ pairAddress }) => pairAddress !== null);
      const unavailable = results.filter(({ pairAddress }) => pairAddress === null);

      setAvailablePairs(available);
      setUnavailablePairs(unavailable);
    } catch (err) {
      setError('An error occurred while fetching pair addresses');
    } finally {
      setLoading(false);
    }
  };

  return { loading, availablePairs, unavailablePairs, error, checkPairs };
};

export default useTokenPairChecker;
