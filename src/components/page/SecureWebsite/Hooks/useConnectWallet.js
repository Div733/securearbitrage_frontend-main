// WalletContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { BrowserProvider, formatEther } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { checkNetwork, switchNetwork } from "./metamask";
import { MAIN_CHAIN_ID } from "../../../../utils/constants";
const WalletContext = createContext();

const links = [
  {
    name: "Chrome",
    url: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_Chrome_icon_%282011%29.svg/2048px-Google_Chrome_icon_%282011%29.svg.png",
  },
  {
    name: "Android",
    url: "https://play.google.com/store/apps/details?id=io.metamask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/2048px-Android_robot.svg.png",
  },
  {
    name: "iOS",
    url: "https://apps.apple.com/app/metamask/id1438144202",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/IOS_logo.svg/2048px-IOS_logo.svg.png",
  },
];

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [ethBalance, setEthBalance] = useState("");
  const [ethBalanceUsdt, setEthBalanceUsdt] = useState("");
  const navigate = useNavigate();

  const getBalanceMainnet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider1 = new BrowserProvider(window.ethereum);
      const rawBalance = await provider1.getBalance(walletAddress);
      const rawBalanceUsdt = await provider1.getBalance(
        "0x55d398326f99059fF775485246999027B3197955"
      );

      const ethBalance = formatEther(rawBalance);
      const ethBalanceUsdt = formatEther(rawBalanceUsdt);

      setEthBalance(ethBalance);
      setEthBalanceUsdt(ethBalanceUsdt);
    } else {
      console.log("dataaaaaaa");
    }
  };

  // const connectWallet = async () => {
  //   try {
  //     if (typeof window.ethereum !== 'undefined') {
  //       const provider1 = new BrowserProvider(window.ethereum);

  //       const accounts = await provider1.send('eth_requestAccounts', []);
  //       const address = accounts[0];
  //       setWalletAddress(address);

  //       const rawBalance = await provider1.getBalance(address);
  //       const rawBalanceUsdt = await provider1.getBalance(
  //         '0x55d398326f99059fF775485246999027B3197955'
  //       );

  //       const ethBalance = formatEther(rawBalance);
  //       const ethBalanceUsdt = formatEther(rawBalanceUsdt);

  //       setEthBalance(ethBalance);
  //       setEthBalanceUsdt(ethBalanceUsdt);

  //       await axios
  //         .post(`https://backend.dsl.sg/api/v1/arbitrage/user`, {
  //           walletAddress: address,
  //         })
  //         .then((res) => {
  //           if (res.data.user) {
  //             setUser(res.data.user);
  //             setLoading(false);
  //             getBalanceMainnet();
  //             localStorage.setItem("tokenSecureWeb", res.data.token);
  //             return null;
  //           } else {
  //             console.log("NO data Here");
  //             return null;
  //           }
  //         });

  //       navigate('/dashboard', {
  //         state: {
  //           walletAddress: address,
  //           ethBalance,
  //           ethBalanceUsdt,
  //         },
  //       });
  //     } else {
  //       alert('MetaMask is not installed. Please install MetaMask and try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error connecting to MetaMask:', error);
  //   }
  // };

  const connectWallet = async () => {
    try {
      // Show SweetAlert2 loading modal
      Swal.fire({
        title: "Connecting Wallet...",
        text: "Please wait while we connect to MetaMask.",
        background: "#2F2D35",
        color: "white",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading(); // Display loading spinner
        },
      });

      if (typeof window.ethereum !== "undefined") {
        if (!(await checkNetwork())) {
          await switchNetwork();
        }
        const provider1 = new BrowserProvider(window.ethereum);

        const accounts = await provider1.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        const rawBalance = await provider1.getBalance(address);
        const rawBalanceUsdt = await provider1.getBalance(
          "0x55d398326f99059fF775485246999027B3197955"
        );

        const ethBalance = formatEther(rawBalance);
        const ethBalanceUsdt = formatEther(rawBalanceUsdt);

        setEthBalance(ethBalance);
        setEthBalanceUsdt(ethBalanceUsdt);

        await axios
          .post(`https://backend.dsl.sg/api/v1/arbitrage/user`, {
            walletAddress: address,
          })
          .then((res) => {
            if (res.data.user) {
              setUser(res.data.user);
              setLoading(false);
              getBalanceMainnet();
              localStorage.setItem("tokenSecureWeb", res.data.token);

              // Close SweetAlert2 modal and show success message
              Swal.fire({
                icon: "success",
                text: "Your wallet has been successfully connected!",
                background: "#2F2D35",
                color: "white",
                timer: 2000,
                showConfirmButton: false,
              });

              return null;
            } else {
              console.log("No data here");
              Swal.close(); // Close SweetAlert2 modal
              return null;
            }
          });

        navigate("/dashboard", {
          state: {
            walletAddress: address,
            ethBalance,
            ethBalanceUsdt,
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "MetaMask Not Found",
          text: "MetaMask is not installed. Please install MetaMask and try again.",
          background: "#2F2D35",
          color: "white",
          html: `
          <div>
          <b>
          Download Now
          </b>
          <br/>
          <div id="metamask-links-container">
          <a href=${links[0].url}> ${links[0].name}</a>
          <a href=${links[1].url}> ${links[1].name}</a>
          <a href=${links[2].url}> ${links[2].name}</a>
          </div>
          </div>`,
        });
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);

      // Close SweetAlert2 modal and show error
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: "An error occurred while connecting to MetaMask. Please try again.",
      });
    }
  };

  // const logout = () => {
  //   if (window.confirm('Are you sure you want to disconnect your wallet?')) {
  //     setWalletAddress('');
  //     setEthBalance('');
  //     setUser({});
  //     setEthBalanceUsdt('');
  //     localStorage.removeItem("tokenSecureWeb");
  //     navigate('/');
  //   }
  // };

  const logout = (event) => {
    event.preventDefault();
    Swal.fire({
      // title: "Are you sure?",
      text: "Are you sure? You want to disconnect your wallet!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      background: "#2F2D35",
      color: "white",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setWalletAddress("");
        setEthBalance("");
        setUser({});
        setEthBalanceUsdt("");
        localStorage.removeItem("tokenSecureWeb");
        navigate("/");
        Swal.fire({
          text: "Your wallet has been disconnected.",
          icon: "success",
          background: "#2F2D35",
          color: "white",
        });
        // "Your wallet has been disconnected.", "success"
      }
    });
  };

  //changes on user account change
  useEffect(() => {
    if (localStorage.getItem("tokenSecureWeb")) {
      setLoading(true);
      axios
        .get(`https://backend.dsl.sg/api/v1/arbitrage/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("tokenSecureWeb")}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
          getBalanceMainnet();
        });
      // setUserRefetch(false);
    }
  }, [localStorage.getItem("tokenSecureWeb")]);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        ethBalance,
        ethBalanceUsdt,
        connectWallet,
        logout,
        user,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
