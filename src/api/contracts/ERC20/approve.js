import { ABI_ERC20 } from "../../../utils/contracts/abis/abiErc20";
import {
  CONTRACT_ADDRESS_SEPOLIA_AAVE_USDT,
  CONTRACT_ADDRESS_SEPOLIA_FLASH_LOAN,
} from "../../../utils/contracts/addresses";
import Swal from "sweetalert2";

const ethers = require("ethers");

export const approve = async (spenderAddress, amount) => {
  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    // Create contract instance

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SEPOLIA_AAVE_USDT,
      ABI_ERC20,
      signer
    );

    // Make contract call
    const result = await contract.approve(spenderAddress, amount);

    // Wait for transaction confirmation
    const receipt = await result.wait(1);

    Swal.fire({
      text: `Approve Successful for Spender ${spenderAddress} and Amount ${amount}`,
      icon: "success",
      timer: "10000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  } catch (error) {
    Swal.fire({
      text: `Error Occured : ${JSON.stringify(error)}`,
      icon: "error",
      timer: "10000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  }
};