import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Table, Card, Modal, Button } from "react-bootstrap";
import './Arbitrage.css'
import { motion } from "framer-motion";
import img from './bot.png'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";
import BottomMessage from "../Components/BottomMessage";
import Disclimer from "../Components/Disclimer";
import Oppertuinity from "../Home/Oppertuinity";


const exchanges = [
  { name: "Pancake Swap", url: "https://pancakeswap.finance" },
  { name: "Biswap", url: "https://biswap.org" },
  { name: "Mdex", url: "https://mdex.com" },
  { name: "ApeSwap", url: "https://apeswap.finance" },
];

const Arbitrage = () => {
  const [loanAmount, setLoanAmount] = useState('Please Select');
  // const [exchangeA, setExchangeA] = useState("Pancake Swap");
  // const [exchangeB, setExchangeB] = useState("Biswap");
  const [exchangeA, setExchangeA] = useState(exchanges[0].name);
  const [exchangeB, setExchangeB] = useState(exchanges[1].name);
  const [selectedToken, setSelectedToken] = useState("Please Select"); // Default to BNB
  const [selectedOption, setSelectedOption] = useState("Seek Loan");
  const [isProcessing, setIsProcessing] = useState(true);


  const [price, setPrice] = useState(null);
  const [reducedPrice, setReducedPrice] = useState(null);
  const [increasedPrice, setIncreasedPrice] = useState(null);
  const [digitalAsset, setDigitalAsset] = useState();


  const [exFee, setExFee] = useState(loanAmount * 0.0007);

  const [sellDigit, setSellDigit] = useState(((100 - 0.07) * 0.001599).toFixed(6)); //unused

  const [exFeeB, setExFeeB] = useState(loanAmount / reducedPrice * 0.0010);

  const [isNotReady, setIsNotReady] = useState(false);
  useEffect(() => {
    if (loanAmount !== 'Please Select' && selectedToken !== 'Please Select') {
      setIsNotReady(true);
    }

  }, [loanAmount, selectedToken])

  const fetchData = async () => {
    try {
      const res = await axios.get("https://backend.dsl.sg/tokens-coin");
      let assets = res.data;

      // Sort assets alphabetically by the `symbol` property
      assets.sort((a, b) => a.symbol.localeCompare(b.symbol));

      setDigitalAsset(assets);
      if (assets.length > 0) {
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event) => {

    const value = (event.target.value)
    if (value === "") {
      setLoanAmount("");
      return;
    }
    else {
      if (value > 99) {
        const numericValue = Math.min(1000000, Number(value));
        setLoanAmount(numericValue);
      }
      else {

      }
    }

  };

  const [inputValue, setInputValue] = useState();
  const handleLoanInput = (e) => {
    const value = Number(e.target.value);
    if (e.target.value === '') {
      setInputValue('')
      return
    }
    // setInputValue(value);
    // setLoanAmount(100);

    if (/^\d*\.?\d*$/.test(value)) {
      setInputValue(value);
      setLoanAmount(100);
    }
  }

  const targetRef = useRef(null);
  const handleButtonClick = () => {

    setLoanAmount(inputValue);
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
    // setInputValue(0)
  };

  const handleExchangeAChange = (value) => {
    setExchangeA(value);
    if (value === exchangeB) {
      // setExchangeB(""); 
    }
  };

  // Function to handle Exchange B change
  const handleExchangeBChange = (value) => {
    setExchangeB(value);
    if (value === exchangeA) {
      // setExchangeA(""); 
    }
  };

  // let gasFee
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsVisible, setStepsVisible] = useState([]);
  const [gasFee, setGasFee] = useState(0.105022)
  const [gasFeeBNB, setGasFeeBNB] = useState((0.105022 / 656.39).toFixed(6))
  useEffect(() => {
    if (isNotReady && !show) {
      let indexA = 0;
      let indexB = 1;

      const interval = setInterval(() => {
        handleExchangeAChange(exchanges[indexA].name);
        indexB = (indexA + 1) % exchanges.length;
        handleExchangeBChange(exchanges[indexB].name);
        indexA = (indexA + 1) % exchanges.length;

        const randomPercentagePre = Math.random() * (0.040 - 0.010) + 0.010;
        let randomPercentagePost;

        do {
          randomPercentagePost = Math.random() * (0.040 - 0.010) + 0.010;
        } while (randomPercentagePost === randomPercentagePre);

        const numericPrice = Number(price);
        if (!isNaN(numericPrice)) {
          const pre = Number((numericPrice - numericPrice * randomPercentagePre).toFixed(6));
          const post = Number((numericPrice + numericPrice * randomPercentagePost).toFixed(6));

          setReducedPrice(pre);
          setIncreasedPrice(post);
        } else {
          console.error("Price is not a valid number:", price);
        }

        const randomDirection = Math.random() < 0.5 ? -1 : 1;
        const adjustment = 0.105022 * 0.05 * randomDirection;
        const value = Number((0.105022 + adjustment).toFixed(6));
        const BNBValue = Number(((0.105022 + adjustment) / 656.39).toFixed(6))
        setGasFee(Number((0.105022 + adjustment).toFixed(6)));
        setGasFeeBNB(BNBValue);

      }, 3000);

      return () => clearInterval(interval);
    }
  }, [exchangeA, exchangeB, exchanges, isNotReady, show, price]);

  const handleTokenChange = (event) => {
    const selectedSymbol = event.target.value;
    setSelectedToken(selectedSymbol);
    const selectedAsset = digitalAsset.find(
      (asset) => asset.symbol === selectedSymbol
    );
    if (selectedAsset) {
      setPrice(selectedAsset.price.toFixed(6));
    }
  };
  console.log(selectedToken, 'And+ ', price)

  const filteredExchangesA = exchanges.filter((exchange) => exchange.name !== exchangeB);
  const filteredExchangesB = exchanges.filter((exchange) => exchange.name !== exchangeA);




  const steps =
    selectedOption === "Own Funds"
      ? [
        "Signing in with Wallet",
        `Deducting ${loanAmount} USD worth of USDT and 1 USD worth of BNB from your wallet.`,
        `Buying from ${exchangeA}.`,
        `Selling at ${exchangeB}.`,
        "Capital and Profit Transferred to Wallet.",
        "Show Transaction Details",
      ]
      : [
        "Signing in with Wallet",
        `Seeking Loan from Liquidity Pool.`,
        "Deducting 1 USD worth of BNB from your wallet.",
        "Loan Approved.",
        `Buying from ${exchangeA}.`,
        `Selling at ${exchangeB}.`,
        "Paying Back Loans and Fees.",
        "Profit Transferred to Wallet.",
        "Show Transaction Details",
      ];

  const handleShow = () => {
    setShow(true);
    setStepsVisible([]);
    setCurrentStep(0);
    startStepDisplay();
  };

  const handleClose = () => {
    setShow(false);
  };

  const startStepDisplay = () => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setStepsVisible([step]);

        if (index === steps.length - 1) {

        }
      }, index * 4000);
    });
  };

  let balanceA = (loanAmount - exFee)?.toFixed(6);
  let DAB = (balanceA / reducedPrice).toFixed(6);
  let balanceB = (DAB - exFeeB).toFixed(6);
  let UR = (balanceB * increasedPrice).toFixed(6);
  let TEF = (parseFloat(exFee) + parseFloat(exFeeB) * increasedPrice).toFixed(6);
  // let TGF = 0.105022 + 0.105022;
  let TGF = gasFee * 2;
  let LF;
  if (selectedOption === 'Own Funds') {
    LF = loanAmount;
  }
  else {
    LF = (loanAmount * 1.005).toFixed(6)
  }
  let BSF = (1.000000).toFixed(6);
  let TotalExpenses = (parseFloat(TEF) + parseFloat(TGF) + parseFloat(LF) + parseFloat(BSF)).toFixed(6);
  let profit = (UR - TotalExpenses).toFixed(6);


  useEffect(() => {


    let updateExFee;
    if (exchangeA === 'Pancake Swap') updateExFee = (loanAmount * 0.0080).toFixed(6)
    else if (exchangeA === 'Biswap') updateExFee = (loanAmount * 0.0080).toFixed(6)
    else if (exchangeA === 'Mdex') updateExFee = (loanAmount * 0.0080).toFixed(6)
    else if (exchangeA === 'ApeSwap') updateExFee = (loanAmount * 0.0080).toFixed(6)

    setExFee(updateExFee);

    const fee = (loanAmount - updateExFee).toFixed(6)
    const updateSellDigit = (fee / 625.13).toFixed(6);
    setSellDigit(updateSellDigit);
  }, [loanAmount, exchangeA, sellDigit])



  useEffect(() => {
    let updateExFeeB;
    if (exchangeB === 'Pancake Swap') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (exchangeB === 'Biswap') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (exchangeB === 'Mdex') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (exchangeB === 'ApeSwap') updateExFeeB = (DAB * 0.0080).toFixed(6)
    console.log(sellDigit, 'From effect', updateExFeeB)
    setExFeeB(updateExFeeB);
  }, [loanAmount, exchangeB, DAB])


  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prevIndex) =>
        prevIndex + 1 < stepsVisible.length ? prevIndex + 1 : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [stepsVisible]);

  const navigate = useNavigate();

  return (
    <div style={{ background: 'linear-gradient(45deg, #2E292D, #414E55, #2A252D, #3360A2)' }}>
      <Container className="" style={{ marginTop: "0px", paddingBottom: "10px", textAlign: 'left' }}>
        <Card style={{ background: 'transparent', color: 'white' }} className="py-md-4 py-2 border-0">
          {/* <img src={img}/>
        <h2 className=" mb-4">ARBITRAGE BOT</h2> */}

          {/* <img src={img}/> */}

          <div className="p-4 rounded mb-4" style={{ background: '#2B2C3B' }}>
            <p>
              Earn Smart with Your Own Funds or Borrowed Capital!
            </p>
            <p>
              Maximize your earnings through arbitrage trading, whether using your own funds or our loan options. Take advantage of risk-free opportunities with no collateral required!
            </p>

            <p>Experience the profit potential by using our arbitrage bot to buy assets with USDT on Exchange A and sell them for USDT on Exchange B. Start earning today!</p>
          </div>

          <div className="pl-4 py-4 rounded  mb-4" style={{ background: '#2D3A56', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            {/* <div className="d-flex gap-5">
              <label className="d-flex items-center gap-2">
                <input type="checkbox" value="Own Funds" checked={selectedOption === "Own Funds"} onChange={handleCheckboxChange} className="h-5 w-5 text-blue-500" />
                <span>Own Funds</span>
              </label>

              <label className="d-flex items-center gap-2">
                <input type="checkbox" value="Seek Loan" checked={selectedOption === "Seek Loan"} onChange={handleCheckboxChange} className="h-5 w-5 text-blue-500" />
                <span>Seek Loan</span>
              </label>
            </div> */}

            {/* <div className="d-flex align-items-center gap-2">
              <p className="fw-bold fund-width" style={{ paddingTop: "10px", }}> Asset:</p>

              <select
                value={selectedToken}
                onChange={handleTokenChange}
                style={{
                  padding: "4px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "180px",
                }}
              >
                <option>Please Select</option>
                {digitalAsset?.map((asset) => (
                  <option key={asset.symbol} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div >
              <div className={`d-flex ${selectedOption == 'Seek Loan' ? 'align-items-center' : 'align-items-center'}  gap-2`}>
                <p className="fw-bold fund-width" style={{ paddingTop: "10px", }}>
                  Enter Amt(USDT): </p>
                {
                  selectedOption === 'Seek Loan' ?
                    <select value={loanAmount} onChange={handleChange} style={{ padding: "4px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", width: '180px' }} >

                      <option >
                        Please Select
                      </option>
                      {[...Array(10).keys()].map((num) => {
                        let amount = (num + 1) * 100;
                        return (
                          <>
                            <option key={amount} value={amount}>
                              {amount}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    :
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "180px", }}>
                        <input
                          type="number"
                          value={inputValue}
                          defaultValue={100}
                          onChange={handleLoanInput}
                          onKeyDown={(e) => {
                            if (e.key === "." || e.key === "e" || e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                          placeholder="Enter amount"
                          min={100}
                          max={500000}
                          step={100}
                          style={{
                            padding: "4px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: '100%'
                          }}
                        />

                        <button
                          onClick={handleButtonClick}
                          disabled={inputValue < 100 || inputValue >= 1000000}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            padding: "6px 12px",
                            fontSize: "16px",
                            backgroundColor: inputValue >= 100 && inputValue < 1000000 ? "#006666" : "gray",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: inputValue >= 100 && inputValue < 1000000 ? "pointer" : "not-allowed",
                          }}
                        >
                          <FaCheckCircle />
                        </button>

                      </div>

                    </div>

                }
              </div>

            </div> */}

            <div className="d-flex align-items-center gap-2">
              <p className="fw-bold fund-width" style={{ paddingTop: "10px" }}>Asset:</p>
              <select
                value={selectedToken}
                onChange={handleTokenChange}
                style={{
                  padding: "4px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  width: "180px",
                }}
              >
                <option>Please Select</option>
                {digitalAsset?.map((asset) => (
                  <option key={asset.symbol} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="d-flex align-items-center gap-2">
                <p className="fw-bold fund-width" style={{ paddingTop: "10px" }}>Enter Amt(USDT):</p>

                {selectedOption === 'Seek Loan' ? (
                  <select
                    value={loanAmount}
                    onChange={handleChange}
                    style={{
                      padding: "4px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      width: "180px", // Fixed width for alignment
                    }}
                  >
                    <option>Please Select</option>
                    {[...Array(10).keys()].map((num) => {
                      let amount = (num + 1) * 100;
                      return (
                        <option key={amount} value={amount}>
                          {amount}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div style={{ position: "relative", width: "180px" }}> {/* Consistent width */}
                    <input
                      type="number"
                      value={inputValue}
                      defaultValue={100}
                      onChange={handleLoanInput}
                      onKeyDown={(e) => {
                        if (e.key === "." || e.key === "e" || e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Enter amount"
                      min={100}
                      max={500000}
                      step={100}
                      style={{
                        padding: "4px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "100%", // Full width of parent container
                      }}
                    />
                    <button
                      onClick={handleButtonClick}
                      disabled={inputValue < 100 || inputValue >= 1000000}
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "6px 12px",
                        fontSize: "16px",
                        backgroundColor:
                          inputValue >= 100 && inputValue < 1000000 ? "#006666" : "gray",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor:
                          inputValue >= 100 && inputValue < 1000000
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      <FaCheckCircle />
                    </button>
                  </div>
                )}
              </div>
            </div>



            {/* <div >
              <div className={`d-flex ${selectedOption == 'Seek Loan' ? 'align-items-center' : 'align-items-center'}  gap-2`}>
                <p className="fw-bold fund-width" style={{ paddingTop: "10px", }}>
                  Enter Amt(USDT): </p>
                {
                  selectedOption === 'Seek Loan' ?
                    <select value={loanAmount} onChange={handleChange} style={{ padding: "4px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "4px", width: '180px' }} >

                      <option >
                        Please Select
                      </option>
                      {[...Array(10).keys()].map((num) => {
                        let amount = (num + 1) * 100;
                        return (
                          <>
                            <option key={amount} value={amount}>
                              {amount}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    :
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <div style={{ position: "relative", display: "flex", alignItems: "center", width: "180px", }}>
                        <input
                          type="number"
                          value={inputValue}
                          defaultValue={100}
                          onChange={handleLoanInput}
                          onKeyDown={(e) => {
                            if (e.key === "." || e.key === "e" || e.key === "-") {
                              e.preventDefault();
                            }
                          }}
                          placeholder="Enter amount"
                          min={100}
                          max={500000}
                          step={100}
                          style={{
                            padding: "4px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: '100%'
                          }}
                        />

                        <button
                          onClick={handleButtonClick}
                          disabled={inputValue < 100 || inputValue >= 1000000}
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "50%",
                            transform: "translateY(-50%)",
                            padding: "6px 12px",
                            fontSize: "16px",
                            backgroundColor: inputValue >= 100 && inputValue < 1000000 ? "#006666" : "gray",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: inputValue >= 100 && inputValue < 1000000 ? "pointer" : "not-allowed",
                          }}
                        >
                          <FaCheckCircle />
                        </button>

                      </div>
                      <p className="pt-md-3" style={{fontSize: '12px',}}>Please click tick to see the opportunities.</p>
                    </div>



                }
              </div>
              <p className="mt-0 pt-0 ex-pad" style={{ fontSize: '12px', color: '#0DCAF0' }} >
                {selectedOption == 'Own Funds' &&
                  'Funds will be deducted from Wallet. Maximum 100000 USDT.'}
              </p>
            </div> */}
            {
              selectedOption !== 'Own Funds' ?
                <p>Please select both options to explore opportunities using data from mempools.</p> :
                <p>Please select and enter both options to explore opportunities using data from mempools.</p>
            }

            {/* <div>
              <div className="d-flex align-items-center gap-2">
                <p className="fw-bold fund-width" style={{ paddingTop: "10px", }}>Select Exchange A:</p>
                <select
                  value={exchangeA}
                  onChange={handleExchangeAChange}
                  style={{
                    padding: "4px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: '180px'
                  }}
                >
                  {filteredExchangesA.map((exchange) => (
                    <option key={exchange.name} value={exchange.name}>
                      {exchange.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-0 pt-0 ex-pad" style={{ fontSize: '12px', color: '#0DCAF0' }} >
                {exchangeA == 'Pancake Swap' && 'Exchange Fees: 0.80%'}
                {exchangeA == 'Biswap' && 'Exchange Fees: 0.80%'}
                {exchangeA == 'Mdex' && 'Exchange Fees: 0.80%'}
                {exchangeA == 'ApeSwap' && 'Exchange Fees: 0.80%'}
              </p>

         
              <div className="d-flex align-items-center gap-2 mt-3">
                <p className="fw-bold fund-width" style={{ paddingTop: "10px", }}>Select Exchange B:</p>
                <select
                  value={exchangeB}
                  onChange={handleExchangeBChange}
                  style={{
                    padding: "4px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: '180px'
                  }}
                >
                  {filteredExchangesB.map((exchange) => (
                    <option key={exchange.name} value={exchange.name}>
                      {exchange.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-0 pt-0 ex-pad" style={{ fontSize: '12px', color: '#0DCAF0' }} >
                {exchangeB == 'Pancake Swap' && 'Exchange Fees: 0.80%'}
                {exchangeB == 'Biswap' && 'Exchange Fees: 0.80%'}
                {exchangeB == 'Mdex' && 'Exchange Fees: 0.80%'}
                {exchangeB == 'ApeSwap' && 'Exchange Fees: 0.80%'}
              </p>
            </div> */}
            <div className="d-flex gap-5">
              <label className="d-flex items-center gap-2">
                <input type="checkbox" value="Own Funds" checked={selectedOption === "Own Funds"} onChange={handleCheckboxChange} className="h-5 w-5 text-blue-500" />
                <span>Own Funds</span>
              </label>

              <label className="d-flex items-center gap-2">
                <input type="checkbox" value="Seek Loan" checked={selectedOption === "Seek Loan"} onChange={handleCheckboxChange} className="h-5 w-5 text-blue-500" />
                <span>Seek Loan</span>
              </label>
            </div>

          </div>


          {/* <div className="my-4">
            <p><strong>Note:</strong></p>
            <ol style={{ paddingLeft: "20px" }}>
              <li>Loan fees are charged at 0.5% of the loan amount per transaction.</li>
              <li>A service fee of USD 1.00 will apply to each loan request, payable in BNB.</li>
            </ol>
          </div> */}

          <div ref={targetRef} id="targetDiv" className="p-2 p-md-4 rounded mb-4" style={{ background: '#2B2C3B' }}>
            <Table className="overflow-x-auto mb-0" bordered responsive style={{ color: "black" }}>
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>
                    <p
                      className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"
                    ><span className="text-white">Exchange A:</span> <span className="text-info">{exchangeA}</span></p>
                  </th>
                  <th>
                    <p
                      className="d-flex flex-column flex-sm-row gap-1 align-items-start p-0 m-0"
                    ><span className="text-white">Exchange B:</span> <span className="text-info">{exchangeB}</span></p>
                  </th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="text-dark">
                  <td colSpan="2" style={{ textAlign: "center", verticalAlign: "middle", background: '#D3D3D3' }}>
                    Asset : <span className="fw-bold">{!isNotReady ? '-' : selectedToken}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="d-flex flex-column flex-sm-row gap-1 align-items-start p-0 m-0">
                      <span>Buy assets: </span>
                      <p style={{ height: '12px' }}>
                        {
                          !isNotReady ? '' : `${loanAmount} USDT`
                        }
                      </p>

                    </p>
                  </td>
                  <td>
                    <p className="d-flex flex-column flex-sm-row gap-1 align-items-start p-0 m-0">
                      <span>Sell assets: </span>
                      <p style={{ height: '12px' }}>
                        {/* {
                          !isNotReady ? '' : `${DAB} ${selectedToken}`
                        } */}
                        {
                          !isNotReady ? '' : `${isFinite(DAB) ? DAB : 0} ${selectedToken}`
                        }
                      </p>
                      {/* <span>{DAB} {selectedToken}</span> */}
                    </p>
                    {/* Sell assets: {DAB} {selectedToken} */}
                  </td>
                </tr>
                <tr>
                  <td className="three-line-td-height">
                    <p className="d-flex flex-column flex-sm-row gap-1 py-0 my-0"> <span>Exchange A fees:</span>
                      <span style={{ height: '12px' }}>

                        {
                          !isNotReady ? '' : `${exFee} USDT`
                        }
                      </span>


                    </p>
                  </td>
                  <td className="three-line-td-height" >

                    {/* {
                      !isNotReady ? 'Exchange B fees: ' : `Exchange B fees: ${(exFeeB * increasedPrice).toFixed(6)} USDT (${exFeeB} ${selectedToken})`
                    } */}
                    {
                      !isNotReady
                        ? 'Exchange B fees: '
                        : `Exchange B fees: ${isNaN(exFeeB * increasedPrice) ? 0 : (exFeeB * increasedPrice).toFixed(6)
                        } USDT (${isNaN(exFeeB * increasedPrice) ? 0 : exFeeB
                        } ${selectedToken})`
                    }
                  </td>
                  {/* <td>Exchange B fees: {(exFeeB * increasedPrice).toFixed(6)} USDT ({exFeeB} {selectedToken})</td> */}
                </tr>
                <tr>
                  <td className="two-line-td-height">
                    <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>Balance:</span> <span>
                      {
                        !isNotReady ? '' : `${balanceA} USDT`
                      }  </span></p>
                  </td>
                  <td className="two-line-td-height">
                    <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>Balance:</span> <span>
                      {/* {
                        !isNotReady ? '' : `${balanceB} ${selectedToken}`
                      } */}
                      {
                        !isNotReady ? '' : `${isNaN(balanceB) ? 0 : balanceB} ${selectedToken}`
                      }
                    </span></p>
                  </td>
                </tr>
                <tr>
                  <td className="two-line-td-height">
                    {/* Asset bought:
                    {
                      !isNotReady ? ' 0.000000' : `${DAB} ${selectedToken}`
                    } */}
                    <p className="d-flex flex-column flex-sm-row gap-1 my-0 py-0 "><span>Asset bought: </span>
                      <span>
                        {
                          !isNotReady ? '' : `${isFinite(DAB) ? DAB : 0} ${selectedToken}`
                        }</span>
                    </p>
                  </td>
                  <td className="two-line-td-height">
                    <p className="d-flex flex-column flex-sm-row gap-1 my-0 py-0 "><span>USDT received: </span>
                      <span>
                        {/* {
                          !isNotReady ? '' : `${UR} USDT`
                        }  */}
                        {
                          !isNotReady ? '' : `${isNaN(UR) ? 0 : UR} USDT`
                        }

                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="four-line-td-height">
                  {!isNotReady ? <>
                    <td>Exchange A gas fees (From wallet):  <span style={{ color: "yellow" }}></span> </td>
                    <td>Exchange B gas fees (From wallet):  <span style={{ color: "yellow" }}></span></td>
                  </> :
                    <>
                      {/* 0.000160 BNB */}
                      <td>Exchange A gas fees (From wallet): {gasFeeBNB} BNB <span style={{ color: "yellow" }}>({gasFee} USDT)</span> </td>
                      <td>Exchange B gas fees (From wallet): {gasFeeBNB} BNB <span style={{ color: "yellow" }}>({gasFee} USDT)</span></td>
                    </>
                  }
                </tr>
              </tbody>
            </Table>
          </div>


          <div className="p-2 p-md-4 rounded  mb-2 " style={{ background: '#2D3A56' }}>
            <Table className="overflow-x-auto mb-0 " bordered responsive style={{ color: "black" }}>
              <tbody className="text-white">
                <tr>
                  <td className="fw-bold" style={{ width: "50%" }}>
                    Total Exchange Fees
                  </td>
                  <td className="text-right" style={{ color: "yellow", textAlign: 'right' }}>
                    {/* {
                      !isNotReady ? ' 0.000000' : `${TEF}`
                    } */}
                    {
                      !isNotReady ? '0.000000' : `${isNaN(TEF) ? '0.000000' : TEF}`
                    } USDT
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">
                    Total Gas Fees (From wallet)
                  </td>
                  <td style={{ color: "yellow", textAlign: 'right' }}>
                    {
                      !isNotReady ? ' 0.000000' : `${TGF}`
                    }  USDT
                  </td>
                </tr>

                <tr>
                  <td className="fw-bold">
                    {selectedOption == 'Own Funds' ? 'Capital' :
                      "Loan + Fees"}
                  </td>
                  <td style={{ color: "yellow", textAlign: 'right' }}>
                    {
                      !isNotReady ? ' 0.000000' : `${LF}`
                    } USDT
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Bot Service Fees</td>
                  <td style={{ color: "yellow", textAlign: 'right' }}>{
                    !isNotReady ? ' 0.000000' : `${BSF}`
                  } USDT</td>
                </tr>
                <tr>
                  <td className="fw-bold">Total</td>
                  <td className="" style={{ color: "yellow", textAlign: 'right' }}>
                    {
                      !isNotReady ? '0.000000' : `${isNaN(TotalExpenses) ? '0.000000' : TotalExpenses}`
                    } USDT
                  </td>
                </tr>


                <tr
                  style={{
                    backgroundColor: profit < 0 ? "red" : "green", // Red if negative, Green if positive
                    color: "#fff", // Ensure text is readable
                  }}
                  className=" text-white">
                  <td className="fw-bold">
                    Estimated Profit:
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {/* {
                      !isNotReady ? ' 0.000000' : `${profit}`
                    } USDT */}
                    {
                      !isNotReady ? '0.000000' : `${isNaN(profit) ? '0.000000' : profit}`
                    } USDT
                  </td>
                </tr>

              </tbody>



            </Table>
          </div>


          <button
            disabled={profit < 0 || !isNotReady || isNaN(profit)}
            style={{
              backgroundColor: profit < 0 ? "red" : "green",
              color: "#fff",
              border: 'none',
              cursor: profit < 0 || !isNotReady || isNaN(profit) ? 'not-allowed' : 'pointer'
            }}
            onClick={handleShow} className="btn btn-md mx-auto btn-custom mb-2 d-flex flex-column flex-sm-row gap-1 align-items-center">
            {
              profit < 0 ? <><span>Increase the Loan Amount to see </span><span>more Estimated Profit</span></> : <><span>Click here to </span><span>make the profit.</span></>
            }
          </button>
          {/* <div>
            <br />
            <h6 className="text-info">
              Assumptions
            </h6>
            <ul style={{ fontSize: '' }}>
              <li>Loan fee: 0.50%</li>
              <li>Gas Fees: 0.000160 BNB <span style={{}}>(0.105022 USDT)</span> </li>
              <li>Service Fees: 1.000000 USDT</li>
            </ul> <hr />
          </div> */}


          {/* <div >
            <h6>Arbitrage Bot</h6>
          <span >
            Imagine two DEXs, A and B: <br/>
          </span>
          <span>
            A large trade is detected in the mempool that will push the price of Token X up on DEX A.<br/>
          </span>
          <span>
            Before this trade is confirmed, you buy Token X on DEX B at the current lower price.<br/>
          </span>
          <span>
            After the trade on DEX A is confirmed and the price rises, you sell Token X back on DEX A for a profit.<br/>
          </span>
          <span>
            By carefully monitoring mempool transactions, you can capitalize on such opportunities, but success depends on speed, strategy, and execution.
          </span>
        </div> */}
          {/* <div className="arbitrage-scenario">
            <h6 style={{ marginBottom: '20px' }} className="scenario-title mb-2 text-info">Arbitrage Bot Scenario</h6>
            <p className="mt-3 mb-0">Imagine two DEXs, A and B:</p>
            <ol>
              <li>A large trade is detected in the mempool that will push the price of Token X up on DEX A.</li>
              <li>Before this trade is confirmed, you buy Token X on DEX B at the current lower price.</li>
              <li>After the trade on DEX A is confirmed and the price rises, you sell Token X back on DEX A for a profit.</li>
              <li>
                By carefully monitoring mempool transactions, you can capitalize on such opportunities, but success depends on speed, strategy, and execution.
              </li>
            </ol>
          </div> */}

          {/* <button style={{ background: '#00008B', color: 'white', border: 'none' }} onClick={() => {
            navigate('/securearbitrage/opportunities')
          }} className="btn btn-md mx-auto btn-custom my-4">
            Click here to secure the opportunities.
          </button> */}

          {/* <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {stepsVisible[0] === "Show Transaction Details"
                  ? "Arbitrage Bot"
                  : "Arbitrage Bot"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                background: "#114372",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
              }}
            >
              {stepsVisible[0] === "Show Transaction Details" ? (
                <div style={{ width: '100%' }}>
                  <p
                    style={{ width: "200px", whiteSpace: "nowrap" }}
                    className="mx-auto my-4 fw-bold"
                  >
                    {selectedOption === "Own Funds" ? "Capital Amount: " : "Loan Amount: "}
                    {loanAmount} USDT
                  </p>
                  <p
                    style={{ width: "200px", whiteSpace: "nowrap" }}
                    className="mx-auto my-2 mb-4 fw-bold"
                  >
                    Profit: {profit} USDT
                  </p>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  >
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <motion.p
                  className="text-center fw-bold"
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1 }}
                >
                  {stepsVisible[currentStepIndex]}
                </motion.p>
              )}
            </Modal.Body>
          </Modal> */}
          <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>
                {stepsVisible[0] === "Show Transaction Details"
                  ? "Arbitrage Bot"
                  : "Arbitrage Bot"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                background: "#114372",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                position: "relative",
              }}
            >
              {stepsVisible[0] === "Show Transaction Details" ? (
                <div style={{ width: '100%' }}>
                  <motion.div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                  >
                    {/* Processing ring above the text */}


                    {/* Transaction Details Text */}
                    <p
                      style={{ width: "200px", whiteSpace: "nowrap" }}
                      className="mx-auto my-4 fw-bold"
                    >
                      {selectedOption === "Own Funds" ? "Capital Amount: " : "Loan Amount: "}
                      {loanAmount} USDT
                    </p>
                    <p
                      style={{ width: "200px", whiteSpace: "nowrap" }}
                      className="mx-auto my-2 mb-4 fw-bold"
                    >
                      Profit: {profit} USDT
                    </p>
                  </motion.div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  >
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {isProcessing && stepsVisible[currentStepIndex] == 'Signing in with Wallet' && (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "5px solid transparent",
                        borderTop: "5px solid #ff8c00", // Orange color for the spinner
                        animation: "spin 1s linear infinite", // Rotation animation
                        margin: "0 auto",
                        marginBottom: "20px", // Space between spinner and text
                      }}
                    ></div>
                  )}
                  <motion.p
                    className="text-center fw-bold"
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                  >
                    {stepsVisible[currentStepIndex]}
                  </motion.p>
                </div>
              )}
            </Modal.Body>
          </Modal>

          {/* <p className="mt-5">

         </p>
         <BottomMessage/> */}

          <Disclimer />
        </Card>
      </Container>
    </div>
  );
};

export default Arbitrage;