// import React, { useState } from 'react';
// import { Modal } from 'react-bootstrap';

// const Disclimer = () => {
//     const [isDisclaimer, setIsDisclaimer] = useState(false);

//     const handleClose = () => {
//         setIsDisclaimer(false)
//     }
//     return (
//         <div>
//             <div className="mt-4 d-flex justify-content-center">
//                 <button
//                     onClick={() => {
//                         setIsDisclaimer(true);
//                     }}
//                     style={{ color: "white" }}
//                     className="btn btn-sm btn-outline-info"
//                 >
//                     Disclaimer
//                 </button>
//             </div>


//             <Modal

//                 show={isDisclaimer}
//                 onHide={handleClose} >
//                 <Modal.Body
//                     style={{
//                         background: "linear-gradient(to right, #2E2B33, #325489, #2C272D)",
//                         color: "white",
//                         justifyContent: "center",
//                         position: "relative",
//                         fontSize: '16px',
//                         width: '100% !important',
//                         minWidth: '90% !important'

//                     }}
//                 >

//                     <div style={{ width: '90%', maxWidth: '800px'}}>
//                         <h2>Disclaimer</h2>
//                         <hr />
//                         <p>The information presented on this platform is for informational purposes only and should not be considered as financial or investment advice. Engaging in cryptocurrency arbitrage or trading involves significant financial risk, including the potential loss of your entire investment. Past performance does not guarantee future results.</p>

//                         <ol>
//                             <li>Risk Disclosure <br />
//                                 Cryptocurrency markets are highly volatile and unpredictable. Automated arbitrage systems, while designed to capitalize on price discrepancies, may not always produce profits due to factors such as market fluctuations, slippage, or transaction delays. Users should evaluate their financial position, risk tolerance, and investment objectives before engaging in any trading activity.</li>

//                             <li>No Guarantees <br />
//                                 The profitability estimations displayed, such as the potential earnings or arbitrage opportunities, are hypothetical and should not be relied upon as a guarantee of actual performance. Market conditions and execution timing can significantly affect outcomes.</li>

//                             <li>Loan Usage <br />
//                                 Utilizing borrowed capital to engage in arbitrage increases financial risk. In the event of losses, users are still liable to repay borrowed amounts, including any associated interest or fees. Users are strongly encouraged to consult a financial advisor before using loan options.</li>

//                             <li>Technical Risks <br />
//                                 This platform relies on third-party APIs, exchanges, and blockchain technology, all of which may experience outages, errors, or disruptions beyond our control. Users acknowledge that technical failures, latency, or platform errors could result in lost opportunities or financial loss.</li>

//                             <li>Regulatory Compliance <br />
//                                 Users are responsible for ensuring that their participation in cryptocurrency trading or arbitrage complies with the laws and regulations of their jurisdiction. This platform does not guarantee compliance with applicable laws or regulations.</li>

//                             <li>Third-Party Platforms <br />
//                                 Arbitrage opportunities involve third-party exchanges, and this platform does not have control over their operations. Users must perform due diligence on these exchanges to assess their reliability, security, and fees before engaging in any transactions.</li>

//                             <li>Limitation of Liability <br />
//                                 This platform, its developers, and associated entities disclaim all liability for any direct, indirect, incidental, or consequential damages incurred as a result of using the services. Users accept full responsibility for their actions and the outcomes of their trades.</li>

//                             <li>Consultation Recommended <br />
//                                 Users are encouraged to seek independent advice from qualified professionals before making financial decisions. The platform does not provide legal, tax, or financial consultation services.</li>

//                         </ol>

//                         <p>By accessing and using this platform, users acknowledge and accept the above terms and assume full responsibility for their trading activities.</p>
//                     </div>

//                 </Modal.Body>
//             </Modal>
//         </div>
//     );
// };

// export default Disclimer;

import React, { useState } from "react";

const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.8)", // Semi-transparent overlay
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "90%",
                    maxWidth: "800px",
                    background: "linear-gradient(to right, #2E2B33, #325489, #2C272D)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                    overflowY: "auto",
                    maxHeight: "90%",
                }}
            >
                <div className="d-flex justify-content-between">
                <h2 style={{ textAlign: "left", marginBottom: "10px" }}>Disclaimer</h2>
                <button 
                style={{background: 'none', border: 'none' , color: 'white'}}
                onClick={onClose}
                >X</button>
                </div>
                <hr style={{ border: "2px solid #ffffff" }} />
                <div style={{ fontSize: "16px" }}>{children}</div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: "5px 10px",
                            fontSize: "16px",
                            background: "#FF5E57",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Disclimer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div 
        // style={{ fontFamily: "Arial, sans-serif" }}
        >
            <button
                onClick={openModal}
                style={{display: "flex", justifyContent: "center", width: '100px'}}
                className="btn mt-5 btn-sm btn-outline-info d-flex justify-content-center mx-auto"
            >
                Disclaimer
            </button>

            <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <p>
                    The information presented on this platform is for informational purposes only and should
                    not be considered as financial or investment advice. Engaging in cryptocurrency arbitrage
                    or trading involves significant financial risk, including the potential loss of your
                    entire investment. Past performance does not guarantee future results.
                </p>

                <ol>
                    <li>Risk Disclosure <br />
                        Cryptocurrency markets are highly volatile and unpredictable. Automated arbitrage systems, while designed to capitalize on price discrepancies, may not always produce profits due to factors such as market fluctuations, slippage, or transaction delays. Users should evaluate their financial position, risk tolerance, and investment objectives before engaging in any trading activity.</li>
                    <br />
                    <li>No Guarantees <br />
                        The profitability estimations displayed, such as the potential earnings or arbitrage opportunities, are hypothetical and should not be relied upon as a guarantee of actual performance. Market conditions and execution timing can significantly affect outcomes.</li>
                    <br />
                    <li>Loan Usage <br />
                        Utilizing borrowed capital to engage in arbitrage increases financial risk. In the event of losses, users are still liable to repay borrowed amounts, including any associated interest or fees. Users are strongly encouraged to consult a financial advisor before using loan options.</li>
                    <br />
                    <li>Technical Risks <br />
                        This platform relies on third-party APIs, exchanges, and blockchain technology, all of which may experience outages, errors, or disruptions beyond our control. Users acknowledge that technical failures, latency, or platform errors could result in lost opportunities or financial loss.</li>
                    <br />
                    <li>Regulatory Compliance <br />
                        Users are responsible for ensuring that their participation in cryptocurrency trading or arbitrage complies with the laws and regulations of their jurisdiction. This platform does not guarantee compliance with applicable laws or regulations.</li>
                    <br />
                    <li>Third-Party Platforms <br />
                        Arbitrage opportunities involve third-party exchanges, and this platform does not have control over their operations. Users must perform due diligence on these exchanges to assess their reliability, security, and fees before engaging in any transactions.</li>
                    <br />
                    <li>Limitation of Liability <br />
                        This platform, its developers, and associated entities disclaim all liability for any direct, indirect, incidental, or consequential damages incurred as a result of using the services. Users accept full responsibility for their actions and the outcomes of their trades.</li>
                    <br />
                    <li>Consultation Recommended <br />
                        Users are encouraged to seek independent advice from qualified professionals before making financial decisions. The platform does not provide legal, tax, or financial consultation services.</li>

                </ol>

                <p>
                    By accessing and using this platform, users acknowledge and accept the above terms and
                    assume full responsibility for their trading activities.
                </p>
            </CustomModal>
        </div>
    );
};

export default Disclimer;
