// import React, { useState } from 'react';
// import Web3 from 'web3';
// import { Button, Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
// // import getPairABI from './getPairABI';

// const getPairABI = [
//   {
//     "inputs": [
//       { "internalType": "address", "name": "", "type": "address" },
//       { "internalType": "address", "name": "", "type": "address" }
//     ],
//     "name": "getPair",
//     "outputs": [
//       { "internalType": "address", "name": "", "type": "address" }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// // Web3 setup
// // const web3 = new Web3('https://hidden-proud-cloud.bsc.quiknode.pro/');
// const web3 = new Web3('https://sly-cold-breeze.bsc.quiknode.pro/e7a6f8cb548ad0ab1e6a45f08149b03a3a096a9e');

// const factoryAddresses = {
//   PancakeSwap: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
//   BiSwap: '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
//   ApeSwap: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
//   BabySwap: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
// };

// const getPairAddress = async (factoryName, factoryAddress, token0, token1) => {
//   try {
//     const factoryContract = new web3.eth.Contract(getPairABI, factoryAddress);
//     const pairAddress = await factoryContract.methods.getPair(token0, token1).call();

//     if (pairAddress === '0x0000000000000000000000000000000000000000') {
//       throw new Error(`Pair not available on ${factoryName}`);
//     }

//     return { factoryName, pairAddress };
//   } catch (error) {
//     console.error(`Error for ${factoryName}:`, error.message);
//     return { factoryName, pairAddress: null };
//   }
// };

// // Main React Component
// const TokenPairChecker = () => {
//   const [loading, setLoading] = useState(false);
//   const [availablePairs, setAvailablePairs] = useState([]);
//   const [unavailablePairs, setUnavailablePairs] = useState([]);
//   const [error, setError] = useState('');

//   const token0 = '0x55d398326f99059fF775485246999027B3197955'; // USDT
//   const token1 = '0x111111111117dC0aa78b770fA6A738034120C302'; // BTCB

//   const checkPairs = async () => {
//     setLoading(true);
//     setAvailablePairs([]);
//     setUnavailablePairs([]);
//     setError('');

//     try {
//       const promises = Object.entries(factoryAddresses).map(([factoryName, factoryAddress]) =>
//         getPairAddress(factoryName, factoryAddress, token0, token1)
//       );

//       const results = await Promise.all(promises);

//       const available = results.filter(({ pairAddress }) => pairAddress !== null);
//       const unavailable = results.filter(({ pairAddress }) => pairAddress === null);

//       setAvailablePairs(available);
//       setUnavailablePairs(unavailable);
//     } catch (err) {
//       setError('An error occurred while fetching pair addresses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <h1>Token Pair Checker</h1>
//       <Button variant="primary" onClick={checkPairs} disabled={loading}>
//         {loading ? <Spinner animation="border" size="sm" /> : 'Check Token Pairs'}
//       </Button>

//       {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

//       <div className="mt-4">
//         <h3>Available Pairs:</h3>
//         <ListGroup>
//           {availablePairs.length > 0 ? (
//             availablePairs.map(({ factoryName, pairAddress }) => (
//               <ListGroup.Item key={factoryName}>
//                 {factoryName}: {pairAddress}
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item>No available pairs found</ListGroup.Item>
//           )}
//         </ListGroup>
//       </div>

//       <div className="mt-4">
//         <h3>Unavailable Pairs:</h3>
//         <ListGroup>
//           {unavailablePairs.length > 0 ? (
//             unavailablePairs.map(({ factoryName }) => (
//               <ListGroup.Item key={factoryName}>
//                 {factoryName}: Pair not available
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item>No unavailable pairs</ListGroup.Item>
//           )}
//         </ListGroup>
//       </div>
//     </Container>
//   );
// };

// export default TokenPairChecker;






// previous code was working

















// import React, { useState } from 'react';
// import { Button, Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
// import useTokenPairChecker from '../Hooks/useTokenPairChecker';

// const tokens = [
//   { name: "1INCH", address: "0x111111111117dC0aa78b770fA6A738034120C302" },
//   { name: "AAST", address: "0xb1E998b346DDDacD06f01db50645bE52DafB93db" },
//   { name: "BABY", address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657" },
//   { name: "BANANA", address: "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95" },
//   { name: "BSW", address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1" },
//   { name: "BUNI", address: "0x0E7BeEc376099429b85639Eb3abE7cF22694ed49" },
//   { name: "BURGER", address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f" },
//   { name: "CAKE", address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" },
//   { name: "CET", address: "0x9F3BCBE48E8b754F331Dfc694A894e8E686aC31D" },
//   { name: "CHEX", address: "0x9Ce84F6A69986a83d92C324df10bC8E64771030f" },
//   { name: "COW", address: "0x8B6fA031c7D2E60fbFe4E663EC1B8f37Df1ba483" },
//   { name: "CTK", address: "0x1234567890abcdef1234567890abcdef12345678" },
//   { name: "DDX", address: "0x1234567890abcdef1234567890abcdef12345678" },
//   { name: "DEEP", address: "0xA0A2eE912CAF7921eaAbC866c6ef6FEc8f7E90A4" },
//   { name: "DRIFT", address: "0x5de9a1C782Fd38EABBf6c99f5457E0518AB36AE4" },
//   { name: "EPS", address: "0xA7f552078dcC247C2684336020c03648500C6d9F" },
//   { name: "EPX", address: "0xAf41054C1487b0e5E2B9250C0332eCBCe6CE9d71" }
// ];


// const TokenPairChecker = () => {
//   const { loading, availablePairs, unavailablePairs, error, checkPairs } = useTokenPairChecker();
//   const [token0, setToken0] = useState('0x55d398326f99059fF775485246999027B3197955'); // Default USDT
//   const [token1, setToken1] = useState('0x111111111117dC0aa78b770fA6A738034120C302'); // Default BTCB

//   const handleCheckPairs = () => {
//     checkPairs(token0, token1);
//   };

//   console.log(availablePairs);

//   return (
//     <Container className="mt-5">
//       <h1>Token Pair Checker</h1>

//       <div className="mb-3">
//         <label>Token 1 Address:</label>
//         <input
//           type="text"
//           className="form-control"
//           value={token1}
//           onChange={(e) => setToken1(e.target.value)}
//         />
//       </div>

//       <Button variant="primary" onClick={handleCheckPairs} disabled={loading}>
//         {loading ? <Spinner animation="border" size="sm" /> : 'Check Token Pairs'}
//       </Button>

//       {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

//       <div className="mt-4">
//         <h3>Available Pairs:</h3>
//         <ListGroup>
//           {availablePairs.length > 0 ? (
//             availablePairs.map(({ factoryName, pairAddress }) => (
//               <ListGroup.Item key={factoryName}>
//                 {factoryName}: {pairAddress}
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item>No available pairs found</ListGroup.Item>
//           )}
//         </ListGroup>
//       </div>

//       <div className="mt-4">
//         <h3>Unavailable Pairs:</h3>
//         <ListGroup>
//           {unavailablePairs.length > 0 ? (
//             unavailablePairs.map(({ factoryName }) => (
//               <ListGroup.Item key={factoryName}>
//                 {factoryName}: Pair not available
//               </ListGroup.Item>
//             ))
//           ) : (
//             <ListGroup.Item>No unavailable pairs</ListGroup.Item>
//           )}
//         </ListGroup>
//       </div>
//     </Container>
//   );
// };

// export default TokenPairChecker;




























































import React, { useState } from 'react';
import { Button, Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
import useTokenPairChecker from '../Hooks/useTokenPairChecker';

const tokens = [
  { name: "1INCH", address: "0x111111111117dC0aa78b770fA6A738034120C302" },
  { name: "AAST", address: "0xb1E998b346DDDacD06f01db50645bE52DafB93db" },
  { name: "BABY", address: "0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657" },
  { name: "BANANA", address: "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95" },
  { name: "BSW", address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1" },
  { name: "BUNI", address: "0x0E7BeEc376099429b85639Eb3abE7cF22694ed49" },
  { name: "BURGER", address: "0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f" },
  { name: "CAKE", address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82" },
  { name: "CET", address: "0x9F3BCBE48E8b754F331Dfc694A894e8E686aC31D" },
  { name: "CHEX", address: "0x9Ce84F6A69986a83d92C324df10bC8E64771030f" },
  { name: "COW", address: "0x8B6fA031c7D2E60fbFe4E663EC1B8f37Df1ba483" },
  { name: "CTK", address: "0x1234567890abcdef1234567890abcdef12345678" },
  { name: "DDX", address: "0x1234567890abcdef1234567890abcdef12345678" },
  { name: "DEEP", address: "0xA0A2eE912CAF7921eaAbC866c6ef6FEc8f7E90A4" },
  { name: "DRIFT", address: "0x5de9a1C782Fd38EABBf6c99f5457E0518AB36AE4" },
  { name: "EPS", address: "0xA7f552078dcC247C2684336020c03648500C6d9F" },
  { name: "EPX", address: "0xAf41054C1487b0e5E2B9250C0332eCBCe6CE9d71" }
];

const TokenPairChecker = () => {
  const { loading, availablePairs, unavailablePairs, error, checkPairs } = useTokenPairChecker();
  const [token0, setToken0] = useState('0x55d398326f99059fF775485246999027B3197955'); // Default USDT
  const [token1, setToken1] = useState('0x111111111117dC0aa78b770fA6A738034120C302'); // Default BTCB

  const handleCheckPairs = () => {
    checkPairs(token0, token1);
  };

  console.log(availablePairs);

  return (
    <div className="pt-5 secure-body-background">
      <Container >
      {/* <h1>Token Pair Checker</h1> */}

      <div className="mb-3">
        <h6>Digital Asset:</h6>
        <select
          className="form-control"
          value={token1}
          onChange={(e) => {
            const selectedAddress = e.target.value;
            setToken1(selectedAddress);
            checkPairs(token0, selectedAddress);

          }}
        >
          {tokens.map((token) => (
            <option key={token.name} value={token.address}>
              {token.name}
            </option>
          ))}
        </select>
      </div>

      {/* <Button variant="primary" onClick={handleCheckPairs} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Check Token Pairs'}
      </Button> */}


      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <div className="mt-4">
        <h6>Available Exchanges Pairs:</h6>
        <ListGroup>
          {availablePairs.length > 0 ? (
            availablePairs.map(({ factoryName, pairAddress }) => (
              <ListGroup.Item key={factoryName}>
                {factoryName}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No available pairs found</ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </Container>
    </div>
  );
};

export default TokenPairChecker;

