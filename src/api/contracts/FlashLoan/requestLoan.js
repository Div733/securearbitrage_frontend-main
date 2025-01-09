import Swal from "sweetalert2";
import { ABI_FLASH_LOAN } from "../../../utils/contracts/abis/abiFlashLoan";
import {
  CONTRACT_ADDRESS_SEPOLIA_AAVE_USDT,
  CONTRACT_ADDRESS_SEPOLIA_FLASH_LOAN,
} from "../../../utils/address";
import { e6sToHuman } from "../../../utils/conversions";
const ethers = require("ethers");

export const requestFlashLoan = async (amount) => {
  console.log(": ------------------------------------");
  console.log(": requestFlashLoan -> amount", amount);
  console.log(": ------------------------------------");
  console.log("Flash Loan API Running ...");

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log("Accounts ===>>", accounts);

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    // Create contract instance

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS_SEPOLIA_FLASH_LOAN,
      ABI_FLASH_LOAN,
      signer
    );

    // Make contract call
    const result = await contract.requestFlashLoan(
      CONTRACT_ADDRESS_SEPOLIA_AAVE_USDT,
      amount // 100 USDT 6 decimals
    );

    // Wait for transaction confirmation
    const receipt = await result.wait(1);

    Swal.fire({
      html: `<div>Tx Successful <a href=https://sepolia.etherscan.io/tx/${receipt.hash}>click</a></div>`,
      icon: "success",
      timer: "10000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  } catch (error) {
    console.log(": ----------------------------------");
    console.log(": requestFlashLoan -> error", error);
    console.log(": ----------------------------------");
    Swal.fire({
      text: `Error Occured while requesting ${e6sToHuman(
        amount || 0
      )} USDT from AAVE Pool `,
      icon: "error",
      timer: "10000",
      showConfirmButton: false,
      background: "#2E292E",
      color: "white",
    });
  }
};
