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
                        style={{ background: 'none', border: 'none', color: 'white' }}
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

const HomeDisclimer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div 
        // style={{ fontFamily: "Arial, sans-serif" }}
        >
            <button
                onClick={openModal}
                style={{ display: "flex", justifyContent: "center", width: '100px' }}
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
                    <li>No Financial Advice <br />
                        This Auto Bot does not constitute financial or investment advice. Users are encouraged to conduct their own research or seek professional advice before engaging in any financial activity. DS Legends Pte. Ltd. shall not be held responsible for any financial losses incurred through the use of this service.</li><br />

                    <li>Risk of Loss <br />
                        Cryptocurrency trading and arbitrage involve significant risks, including the potential loss of your entire capital. You are solely responsible for all risks associated with the use of this Auto Bot, including but not limited to market volatility, slippage, network fees, and other unforeseen circumstances.</li><br />

                    <li>Subscription and Execution Fees <br />
                        A subscription fee and an execution fee of $1.00 (paid in BNB) per trade are required to use the Auto Bot. These fees are non-refundable under any circumstances.</li><br />

                    <li>Performance and Guarantee <br />
                        The Auto Bot relies on market conditions and third-party exchanges, which are beyond our control. We do not guarantee any specific results, profits, or success from the use of this service. Historical performance does not guarantee future outcomes.</li><br />

                    <li>User Responsibility

                        <ul>
                            <li>Users must ensure that they have sufficient funds and are operating within the bounds of applicable laws in their jurisdiction.</li>
                            <li>Users must restart the Auto Bot every 24 hours to ensure continued operation.</li>
                            <li>DS Legends Pte. Ltd. is not liable for missed opportunities or operational issues due to user error or failure to follow instructions.</li>
                        </ul>
                    </li><br />

                    <li>Exchange Selection and Configuration <br />
                        Users are responsible for selecting their preferred trading pairs and configuring settings, such as slippage and capital allocation. Incorrect configuration may lead to unfavorable outcomes or losses.</li><br />

                    <li>Third-Party Dependence <br />
                        The Auto Bot interacts with third-party platforms like Pancakeswap, Biswap, Apeswap, and others. We are not liable for downtime, errors, or malfunctions caused by these external platforms.</li><br />

                    <li>Email Notifications <br />
                        Email notifications are provided for informational purposes only. DS Legends Pte. Ltd. does not guarantee the delivery or accuracy of these notifications.</li><br />

                    <li>Compliance with Laws <br />
                        Users must comply with all applicable laws, regulations, and tax obligations in their respective jurisdictions.</li><br />

                    <li>Limitation of Liability <br />
                        DS Legends Pte. Ltd. shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of the Auto Bot, including but not limited to financial losses, data breaches, or operational disruptions.</li><br />

                    <li>Termination of Service <br />
                        We reserve the right to suspend or terminate the Auto Bot service at any time without prior notice.</li><br />

                    <li>Custom Development <br />
                        Any requests for custom development of arbitrage bots are subject to separate terms and conditions. Please contact us directly for further details.</li><br />

                </ol>
                <p>
                    By accessing and using this platform, users acknowledge and accept the above terms and
                    assume full responsibility for their trading activities.
                </p>
            </CustomModal>
        </div>
    );
};

export default HomeDisclimer;