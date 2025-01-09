import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Table } from 'react-bootstrap';
import './Opportunities.css';
import axios from 'axios';
import { motion } from "framer-motion";
import CountDown from './CountDown';
import { FaRegCirclePause } from 'react-icons/fa6';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaPlayCircle } from 'react-icons/fa';

const Opportunities = () => {
  const [selectedOption, setSelectedOption] = useState("Seek Loan");
  const services = ["Pancake Swap", "Biswap", "Mdex", "ApeSwap"];
  // const loan = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  // const loan = Array.from({ length: 1000000 / 100 }, (_, i) => (i + 1) * 100);
  let loan
  if (selectedOption == 'Seek Loan') {
    loan = Array.from({ length: (1000 / 1) }, (_, i) => (99 + i + 1) * 1);
  }
  else {
    loan = Array.from({ length: (1000000 / 1) - 99 }, (_, i) => (99 + i + 1) * 1);
  }

  console.log('loan ammount', loan);
  const [loanAmount, setLoanAmount] = useState(loan[[Math.floor(Math.random() * loan?.length)]]?.toFixed(6));
  const [selectedServices, setSelectedServices] = useState([
    services[0],
    services[1],
  ]);
  const [exchangeA, setExchangeA] = useState("Pancake Swap");
  const [exchangeB, setExchangeB] = useState("Biswap");
  const [selectedToken, setSelectedToken] = useState("");
  const [price, setPrice] = useState(null);
  const [reducedPrice, setReducedPrice] = useState(null);
  const [increasedPrice, setIncreasedPrice] = useState(null);
  const [exFee, setExFee] = useState((loanAmount * 0.0007).toFixed(6));
  const [exFeeB, setExFeeB] = useState(loanAmount / reducedPrice * 0.0010);
  const [digitalAsset, setDigitalAsset] = useState();
  const [alertShow, setAlertShow] = useState(false);
  const [stepsVisible, setStepsVisible] = useState([]);
  const [show, setShow] = useState(false);
  const [isStartPopUp, setIsStartPopUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isStartPay, setIsStartPay] = useState(false);


  const exchanges = [
    { name: "Pancake Swap", url: "https://pancakeswap.finance" },
    { name: "Biswap", url: "https://biswap.org" },
    { name: "Mdex", url: "https://mdex.com" },
    { name: "ApeSwap", url: "https://apeswap.finance" },
  ];

  const fetchData = async () => {
    try {
      const res = await axios.get("https://backend.dsl.sg/tokens-coin");
      const assets = res.data;

      setDigitalAsset(assets);
      if (assets.length > 0) {
        setSelectedToken(assets[0].symbol);
        setPrice(assets[0].price.toFixed(6));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (digitalAsset.length > 0) {
  //       const filteredAssets = digitalAsset.filter((asset) => asset.symbol !== 'VVS'); // Exclude 'VVS'

  //       if (filteredAssets.length > 0) { // Check if there are assets left after filtering
  //         const randomAsset =
  //           filteredAssets[Math.floor(Math.random() * filteredAssets.length)];
  //         setSelectedToken(randomAsset.symbol);
  //         setPrice(randomAsset.price.toFixed(6));
  //       } else {
  //         console.log("No valid assets available after filtering out 'VVS'.");
  //       }
  //     }


  //     if (loan?.length > 0) {
  //       let number = loan[Math.floor(Math.random() * loan.length)];
  //       if (number === 1000) {
  //         setLoanAmount(`${number}.000000`);
  //       } else {
  //         let randomDecimal = (Math.random()).toFixed(6).slice(2);
  //         setLoanAmount(`${number}.${randomDecimal}`);
  //       }
  //     }
  //     if (services.length > 1) {
  //       let firstIndex = Math.floor(Math.random() * services.length);
  //       let secondIndex;
  //       do {
  //         secondIndex = Math.floor(Math.random() * services.length);
  //       } while (secondIndex === firstIndex);

  //       setSelectedServices([services[firstIndex], services[secondIndex]]);
  //     }
  //     setAlertShow(true);
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   }
  // }, [digitalAsset, services, loan]);




  //another try ********
  // useEffect(() => {
  //   let interval;

  //   const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  //   const updateStates = () => {
  //     // Update selectedToken and price
  //     if (digitalAsset.length > 0) {
  //       let attempts = 0;
  //       let randomAsset;
  //       do {
  //         randomAsset = getRandomElement(digitalAsset);
  //         attempts++;
  //       } while (randomAsset.symbol === 'VVS' && attempts < digitalAsset.length);

  //       if (randomAsset && randomAsset.symbol !== 'VVS') {
  //         if (randomAsset.symbol !== selectedToken) {
  //           setSelectedToken(randomAsset.symbol);
  //           setPrice(randomAsset.price.toFixed(6));
  //         }
  //         // Trigger animation
  //         setAnimate(true);
  //         setTimeout(() => setAnimate(false), 2000);
  //       } else {
  //         console.log("No valid assets available after filtering out 'VVS'.");
  //       }
  //     }

  //     // Update loanAmount
  //     if (loan?.length > 0) {
  //       const number = getRandomElement(loan);
  //       const randomDecimal = number === 1000 ? '000000' : Math.random().toFixed(6).slice(2);
  //       const newLoanAmount = `${number}.${randomDecimal}`;
  //       if (newLoanAmount !== loanAmount) {
  //         setLoanAmount(newLoanAmount);
  //       }
  //     }

  //     // Update selectedServices
  //     if (services.length > 1) {
  //       const shuffledServices = [...services].sort(() => 0.5 - Math.random());
  //       const newSelectedServices = shuffledServices.slice(0, 2);
  //       if (
  //         JSON.stringify(newSelectedServices) !== JSON.stringify(selectedServices)
  //       ) {
  //         setSelectedServices(newSelectedServices);
  //       }
  //     }

  //     setAlertShow(true);
  //   };

  //   if (!isStartPopUp) {
  //     updateStates(); // Run immediately on mount
  //     interval = setInterval(updateStates, 10000); // Perform updates every 10 seconds
  //   }

  //   return () => clearInterval(interval);
  // }, [isStartPopUp, digitalAsset, services, loan, selectedToken, loanAmount, selectedServices]);




  //********** */ this is previous one *************


  useEffect(() => {
    let interval;

    if (!isStartPopUp && !isStartPay) {
      interval = setInterval(() => {
        if (digitalAsset.length > 0) {
          // const filteredAssets = digitalAsset.filter((asset) => asset.symbol !== 'VVS'); 
          const filteredAssets = digitalAsset.filter(
            (asset) => asset.symbol !== 'VVS' && asset.symbol !== 'VOLT' && asset.symbol !== 'XYZ'
          );

          if (filteredAssets.length > 0) { // Check if there are assets left after filtering
            const randomAsset =
              filteredAssets[Math.floor(Math.random() * filteredAssets.length)];
            setSelectedToken(randomAsset.symbol);
            setPrice(randomAsset.price.toFixed(6));
            setAnimate(true);
            setTimeout(() => {
              setAnimate(false);
            }, 2000);
          } else {
            console.log("No valid assets available after filtering out 'VVS'.");
          }
        }

        if (loan?.length > 0) {
          let number = loan[Math.floor(Math.random() * loan.length)];
          if (number === 1000000 || number === 1000) {
            setLoanAmount(`${number}.000000`);
          } else {
            let randomDecimal = (Math.random()).toFixed(6).slice(2);
            setLoanAmount(`${number}.${randomDecimal}`);
          }
        }

        if (services.length > 1) {
          let firstIndex = Math.floor(Math.random() * services.length);
          let secondIndex;
          do {
            secondIndex = Math.floor(Math.random() * services.length);
          } while (secondIndex === firstIndex);

          setSelectedServices([services[firstIndex], services[secondIndex]]);
        }

        setAlertShow(true);
      }, 9000);
    }

    // Cleanup the interval whenever isStartPopUp changes or the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [isStartPopUp, isStartPay, digitalAsset, services, loan]);

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    const numericPrice = Number(price);
    if (!isNaN(numericPrice)) {
      const pre = Number((numericPrice - numericPrice * 0.02).toFixed(6));
      const post = Number((numericPrice + numericPrice * 0.02).toFixed(6));

      setReducedPrice(pre);
      setIncreasedPrice(post);
    } else {
      console.error("Price is not a valid number:", price);
    }
  }, [price]);



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


  let balanceA = (loanAmount - parseFloat(exFee))?.toFixed(6);
  let DAB = (balanceA / reducedPrice).toFixed(6);
  let balanceB = (DAB - exFeeB).toFixed(6);
  let UR = (balanceB * increasedPrice).toFixed(6);
  let TEF = (parseFloat(exFee) + parseFloat(exFeeB) * increasedPrice).toFixed(6);
  let TGF = 0.105022 + 0.105022;
  let LF
  if (selectedOption === 'Own Funds') {
    LF = loanAmount;
  }
  else {
    LF = (loanAmount * 1.005).toFixed(6)
  }
  let BSF = (1.000000).toFixed(6);
  let TotalExpenses = (parseFloat(TEF) + parseFloat(TGF) + parseFloat(LF) + parseFloat(BSF)).toFixed(6);
  let profit = (UR - TotalExpenses).toFixed(6);
  let estimateProfit = parseFloat(profit).toFixed(6);


  useEffect(() => {
    let updateExFee;
    if (selectedServices[0] === 'Pancake Swap') updateExFee = ((loanAmount) * 0.0007).toFixed(6)
    else if (selectedServices[0] === 'Biswap') updateExFee = ((loanAmount) * 0.0010).toFixed(6)
    else if (selectedServices[0] === 'Mdex') updateExFee = ((loanAmount) * 0.0030).toFixed(6)
    else if (selectedServices[0] === 'ApeSwap') updateExFee = ((loanAmount) * 0.0020).toFixed(6)

    setExFee(updateExFee);

    // const fee = (loanAmount - updateExFee).toFixed(6)
    // const updateSellDigit = (fee / 625.13).toFixed(6);
    // setSellDigit(updateSellDigit);
  }, [loanAmount, selectedServices[0]])


  useEffect(() => {
    let updateExFeeB;
    if (selectedServices[1] === 'Pancake Swap') updateExFeeB = (DAB * 0.0007).toFixed(6)
    else if (selectedServices[1] === 'Biswap') updateExFeeB = (DAB * 0.0010).toFixed(6)
    else if (selectedServices[1] === 'Mdex') updateExFeeB = (DAB * 0.0030).toFixed(6)
    else if (selectedServices[1] === 'ApeSwap') updateExFeeB = (DAB * 0.0020).toFixed(6)
    // console.log(sellDigit, 'From effect', updateExFeeB)
    setExFeeB(updateExFeeB);
  }, [loanAmount, selectedServices[1], DAB])

  console.log('Calculation ===>>>', estimateProfit, 'Type ===>>', typeof (estimateProfit));


  const handleCheckboxChange = (event) => {
    setSelectedOption(event.target.value);
  };


  // modal work here 

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
    setIsStartPopUp(true);
  };

  const handleClose = () => {
    setShow(false);
    setIsStartPopUp(false);
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


  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prevIndex) =>
        prevIndex + 1 < stepsVisible.length ? prevIndex + 1 : 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [stepsVisible]);

  return (
    <section className='body-background'>
      <>
        <h2 className="oppertunities-heading">
          <span>SECURE OPPORTUNITIES</span>
        </h2>
      </>
      <div className='body-background mt-0 pt-0' >
        <div className="container mt-0 pt-0"> {/* Bootstrap container */}
          <div className="card p-4 border-0" style={{ background: 'transparent', color: 'white' }}>


            <div className="p-4 rounded my-4" style={{ background: '#2B2C3B' }}>
              <p>
                Seize arbitrage opportunities in decentralized exchanges.
                {/* —no investments or collateral required. */}
              </p>

            </div>

            <div className="pl-4 py-4 rounded  my-2"
              style={{
                // background: '#2D3A56', 
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem'
              }}>
              <div>
                <div>
                  <div className="d-flex align-items-sm-start align-items-md-center align-items-lg-center justify-content-center gap-2 my-1 " style={{ height: '40px' }}>
                    {/* <p
                      className="fw-bold fund-width"
                      style={{ paddingTop: "20px", paddingBottom: '10px' }}
                    >
                      Digital Asset: 
                    </p> */}


                    <div className="d-flex flex-column flex-sm-row align-items-center gap-2 ">
                      <select
                        value={selectedToken}
                        onChange={handleTokenChange}
                        style={{
                          padding: "4px",
                          fontSize: "16px",
                          border: `2px solid ${animate ? "#ccc" : "#ccc"}`,
                          borderRadius: "4px",
                          width: "180px",
                          transition: "all 0.3s ease",
                        }}
                        disabled
                        className={animate ? "flash-animation" : ""}
                      >
                        {digitalAsset?.map((asset) => (
                          <option key={asset.symbol} value={asset.symbol} className={animate ? "grow-option" : ""}>
                            {asset.symbol}
                          </option>
                        ))}
                      </select>

                      {/* <div className='mt-1'>
                        <CountDown
                          price={estimateProfit}
                          alertShow={alertShow}
                          setAlertShow={setAlertShow}
                          isOthers={1}
                        />
                      </div> */}

                    </div>


                  </div>
                </div>
              </div>

            </div>

            <CountDown
              price={estimateProfit}
              alertShow={alertShow}
              setAlertShow={setAlertShow}
              isStartPopUp={isStartPopUp}
              isStartPay={isStartPay}
            />

            <div className="p-4 rounded mb-4" style={{ background: '#2B2C3B' }}>
              <Table className="overflow-x-auto" bordered responsive style={{ color: "black" }}>
                <thead>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <th style={{ width: "50%" }}>
                      <p
                        className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"

                      ><span className="">Digital Asset Name</span> <span className="text-info"></span></p>
                    </th>
                    <th>
                      <p
                        className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"
                      ><span className="">Amount of Digital Asset</span> <span className="text-info"></span></p>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">

                  <tr>
                    <td style={{ color: '#90EE90' }} >{selectedToken}</td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 mb-0 pb-0">
                        <span>{DAB} </span>
                        {/* <span style={{ color: '#90EE90' }}>{selectedToken} </span> */}
                      </p>
                    </td>
                  </tr>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 mb-0 pb-0"> <span>Low Price at</span> <span style={{ color: '#4B0082' }} className=''>{selectedServices[0]}</span>

                      </p>
                      <p className="my-0 py-0" style={{ fontSize: '12px', color: '#335D9A' }} >
                        {selectedServices[0] == 'Pancake Swap' && 'Exchange Fees: 0.07%'}
                        {selectedServices[0] == 'Biswap' && 'Exchange Fees: 0.10%'}
                        {selectedServices[0] == 'Mdex' && 'Exchange Fees: 0.30%'}
                        {selectedServices[0] == 'ApeSwap' && 'Exchange Fees: 0.20%'}
                      </p>
                    </td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>High Price at </span> <span style={{ color: '#4B0082' }} className=''>
                        {selectedServices[1]}</span></p>
                      <p className="my-0 py-0" style={{ fontSize: '12px', color: '#335D9A' }} >
                        {selectedServices[1] == 'Pancake Swap' && 'Exchange Fees: 0.07%'}
                        {selectedServices[1] == 'Biswap' && 'Exchange Fees: 0.10%'}
                        {selectedServices[1] == 'Mdex' && 'Exchange Fees: 0.30%'}
                        {selectedServices[1] == 'ApeSwap' && 'Exchange Fees: 0.20%'}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>
                        {/* 625.130000  */}
                        {/* 612.627400 2% reduced value */}
                        {reducedPrice} USDT
                      </span>
                        {/* <span>USDT</span> */}
                      </p>
                    </td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>
                        {/* 656.386500  */}
                        {/* 637.632600 2% incresed value of 625.13 */}
                        {increasedPrice} USDT
                      </span>
                        {/* <span>USDT</span> */}
                      </p>
                    </td>
                  </tr>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <td><p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>USDT </span> <span>
                      needed </span></p>
                    </td>
                    <td className="d-flex flex-column flex-sm-row gap-1 "><span>Estimated </span>
                      <span>Profit </span>
                    </td>
                  </tr>
                  <tr>
                    <td>{loanAmount} USDT
                      {/* <span style={{ color: "yellow" }}>(0.105022 USDT)</span>  */}
                    </td>
                    <td className='bg-info text-dark'>
                      {estimateProfit} USDT
                    </td>
                    {/* <td
                      style={{
                        background: estimateProfit < 0 ? 'red' : 'green',
                        color: 'white', 
                      }}
                    >
                      {estimateProfit} USDT
                    </td> */}

                  </tr>
                  <tr className="text-dark">
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        // background: "red",
                        background: estimateProfit < 0 ? 'red' : 'green',
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleShow()}
                    >
                      {/* <span>Secure the Opportunity Now! </span> */}
                      {/* <br /> */}
                      <CountDown
                        price={estimateProfit}
                        alertShow={alertShow}
                        setAlertShow={setAlertShow}
                        isOthers={2}
                        isStartPopUp={isStartPopUp}
                        isStartPay={isStartPay}
                      />
                    </td>
                  </tr>

                </tbody>
              </Table>

              <div className='d-flex justify-content-between align-items-center'>
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

                <div>
                  {
                    !isStartPay ?
                      <button
                        onClick={() => {
                          setIsStartPay(true)
                        }}
                        // style={{fontSize: '20px'}}
                        className='btn btn-outline-success'
                      >
                        <FaRegCirclePause />
                      </button>
                      :
                      <button
                        onClick={() => {
                          setIsStartPay(false)
                        }}
                        className='btn btn-outline-info'
                      >
                        <FaPlayCircle />
                      </button>
                  }
                </div>
              </div>
            </div>

            <div>
              <br />
              <h6 className="text-info">
                Assumptions
              </h6>
              <ul style={{ fontSize: '' }}>
                <li>Loan fee: 0.50%</li>
                {/* <li>Buying Price of 1 BNB at {exchangeA}: 625.130000 USDT</li>
              <li>Selling Price of 1 BNB at {exchangeB}: 656.386500 USDT</li> */}
                <li>Gas Fees: 0.000160 BNB <span style={{}}>(0.105022 USDT)</span> </li>
                <li>Service Fees: 1.000000 USDT</li>
              </ul>
              {/* <hr/> */}
            </div>




            {/* modal here  */}
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>
                  {stepsVisible[0] === "Show Transaction Details"
                    ? "SECURE OPPORTUNITIES"
                    : "SECURE OPPORTUNITIES"}
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
                      <p
                        style={{ whiteSpace: "nowrap" }}
                        className="mx-auto my-2 fw-bold"
                      >
                        {selectedOption === "Own Funds" ? "Capital Amount: " : "Loan Amount: "}
                        {loanAmount} USDT
                      </p>
                      <p
                        style={{ whiteSpace: "nowrap" }}
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
                    {stepsVisible[currentStepIndex] == 'Signing in with Wallet' && (
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

          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunities;
