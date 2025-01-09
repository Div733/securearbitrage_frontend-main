import React, { useEffect, useState } from "react";
import "./Home.css";
import "../SecureWeb.css";
import { useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import Oppertuinity from "./Oppertuinity";
import PageTitle from "../Components/PageTitle";
import BottomMessage from "../Components/BottomMessage";
import { Modal } from "react-bootstrap";
import HomeDisclimer from "../Components/HomeDisclimer";
import Disclimer from "../Components/Disclimer";
import TokenTable from "./TokenTable";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [isDisclaimer, setIsDisclaimer] = useState(false);

  const handleClose = () => {
    setIsDisclaimer(false)
  }
  useEffect(()=>{
    window.scroll(0,0);
  } ,[])

  const keyFeatures = [
    {
      title: "Use Own Funds or Loan Options",
      description: "Trade using your own capital or seamlessly access funds through instant loans.",
    },
    {
      title: "Lightning-Fast Arbitrage",
      description: "Execute trades within milliseconds for optimal profit opportunities.",
    },
    {
      title: "Intuitive Platform",
      description: "Built to accommodate traders of all experience levels.",
    },
    {
      title: "Real-Time Market Insights",
      description: "Leverage automated analysis to stay ahead of market trends.",
    },
  ];


  return (
    <section style={{position: 'relative'}} className="secure-body-background">
      <PageTitle title={'SECURE ARBITRAGE'} />

      <main  className="container py-5">
        <div className="text-center">
          <h5 className="fw-bold mb-0 pb-0">
            Maximize Your Crypto Profits with Automated Arbitrage Using Own Funds or Loans.
          </h5>
          <p style={{ fontSize: "12px", marginTop: "10px", paddingTop: "0px" }}>
            Effortlessly execute high-speed, risk-free trades on decentralized exchanges using either your own funds or borrowed capital.
          </p>
        </div>

        <div className="mt-5">
          <p style={{ color: 'orange' }}>Key Features:</p>
          <div>
            <ul>
              {keyFeatures?.map((item, i) => (
                <li key={i}>
                  <span>{item?.title}: </span>
                  <span>{item?.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 text-position">We monitor BSC mempools 28 times per second to deliver real-time updates on BEP20 token swaps involving USDT.</p>
        

        <TokenTable/>
        <div className="dis">

        </div>

        <Disclimer />
        {/* <div style={{position: 'absolute', bottom: '10px', left: '45%'}} >
          
        </div> */}

      </main>

    </section>
  );
};

export default Home;
