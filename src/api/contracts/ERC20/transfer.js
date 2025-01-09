import { ABI_ERC20 } from "../../../utils/contracts/abis/abiErc20";

import Swal from "sweetalert2";
import { e6sToHuman } from "../../../utils/conversions";

const ethers = require("ethers");

export const transfer = async (contractAddress, recipient, amount) => {
  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, ABI_ERC20, signer);

    // Make contract call
    const result = await contract.transfer(recipient, amount);
    console.log(": ----------------------------");
    console.log(": transfer -> result", result);
    console.log(": ----------------------------");

    // Wait for transaction confirmation
    const receipt = await result.wait(1);

    Swal.fire({
      text: `Transfer Successful of Amount ${e6sToHuman(
        amount || 0
      )} USDT to ${recipient}`,
      icon: "success",
      timer: "10000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  } catch (error) {
    Swal.fire({
      text: `Error Occured while Transferring ${e6sToHuman(
        amount || 0
      )} to ${recipient}`,
      icon: "error",
      timer: "5000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  }
};
