import React, { useState } from "react";
import { useWallet } from "../Hooks/useConnectWallet";
import meta from '../Assets/wallete/meta.png'
import tp from '../Assets/wallete/tp.png'
import trust from '../Assets/wallete/trust.png'
import logo from '../Assets/logo.jpg'
import Swal from "sweetalert2";

const WalletModal = ({ iswalletOpen, setIswalletOpen, onClose }) => {
  const [show, setShow] = useState(true); // Set show to true by default
  const { walletAddress, user, ethBalance, ethBalanceUsdt, connectWallet } = useWallet();

  const handleClose = () => setIswalletOpen(false);

  return (
    <>
      {/* Modal */}
      {iswalletOpen && (
        // <div
        //   className="modal d-block"
        //   tabIndex="-1"
        //   role="dialog"
        //   style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        // >
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", // Ensures modal shows in a flex layout
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050, // Higher z-index for the modal to appear on top
          }}
        >

          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title">Connect to SecureArbitrage</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">

                {/* MetaMask Option */}
                <div
                  onClick={() => {
                    connectWallet();
                    setIswalletOpen(false);
                    onClose();
                  }}
                  className="d-flex align-items-center justify-content-between p-3 mb-2"
                  style={{
                    backgroundColor: "#2a2a2a",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <img
                      // src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
                      src={meta}
                      alt="MetaMask"
                      width="30"
                      className="me-3"
                    />
                    <span>Connect to Metamask</span>
                  </div>
                  {/* <span className="badge bg-secondary">Last Used</span> */}
                </div>

                
                
                  </div>
                </div>
              </div>
            </div>
        
      )}
    </>
  );
};

export default WalletModal;
