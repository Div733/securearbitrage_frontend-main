import React, { useState } from 'react';
import PageTitle from '../Components/PageTitle';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, formatEther } from 'ethers';
import PropTypes from "prop-types";

const SignInSignUp = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('');

  
  const navigate = useNavigate();
  
  const connectWallet = async () => {
    // if (window.ethereum)
    if(1)
       {
      try {
        const provider1 = new BrowserProvider(window.ethereum);

        // Request accounts
        const accounts = await provider1.send('eth_requestAccounts', []);
        const address = accounts[0];
        setWalletAddress(address);

        // Get balance
        const rawBalance = await provider1.getBalance(address);
        const rawBalanceUsdt = await provider1.getBalance('0x55d398326f99059fF775485246999027B3197955');
        const ethBalance = formatEther(rawBalance);
        const ethBalanceUsdt = formatEther(rawBalanceUsdt);
        setBalance(ethBalance);

        // Navigate to dashboard with walletAddress and balance as state
        navigate('/securearbitrage/dashboard', {
          state: { 
            walletAddress: address,
            ethBalance,
            ethBalanceUsdt
           },
        });
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
  };
  

  return (
    <section>
      <PageTitle title={'WALLET LOGIN'} />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          height: '90vh', // Full viewport height for vertical centering
          background: 'linear-gradient(45deg, #3360A2, #2E292D, #2A252D, #414E55)',
        }}
      >
        <main className="container d-flex align-items-center justify-content-center">
          <button
            className="btn"
            style={{
              background: 'linear-gradient(45deg, #5B86E5, #36D1DC)', // Stylish gradient for the button
              color: '#FFFFFF',
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.3s ease',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
            }}
            onClick={connectWallet}
          >
            Connect to Wallet
          </button>
        </main>
      </div>
    </section>
  );
};

SignInSignUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default SignInSignUp;
