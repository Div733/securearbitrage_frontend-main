// import { SEPOLIA_NETWORK_PARAMS } from "../../../../utils/constants";

export const SEPOLIA_CHAIN_ID = "0xaa36a7";

///
///  Switch to Desaired network
///
export const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID }],
    });
  } catch (switchError) {
    console.log(": -------------------------------------------");
    console.log(": switchNetwork -> switchError", switchError);
    console.log(": -------------------------------------------");
    // If the network is not added to MetaMask
    //   if (switchError.code === 4902) {
    //     try {
    //       await window.ethereum.request({
    //         method: "wallet_addEthereumChain",
    //         params: [SEPOLIA_NETWORK_PARAMS],
    //       });
    //     } catch (addError) {
    //       // setError("Failed to add network: " + addError.message);
    //     }
    //   } else {
    //     //   setError("Failed to switch network: " + switchError.message);
    //   }
    // }
  }
};

///
/// Check if connected to Desitred network
///
export const checkNetwork = async () => {
  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
      params: [],
    });

    // setIsCorrectNetwork(chainId === currentChainId);
    console.log(`Current ChainID: ${chainId}`);
    return chainId === SEPOLIA_CHAIN_ID;
  } catch (err) {
    // setError("Failed to check network: " + err.message);
    return false;
  }
};

///
/// Method to check ethereum based wallet connection
///
export const isConnected = async () => {
  if (window.ethereum.isConnected()) {
    let address = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [],
    });
    return { status: true, message: address };
  } else {
    return { status: false, message: "Metamask not connected" };
  }
};
