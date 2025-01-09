import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Table } from 'react-bootstrap';
import '../Opportunities/Opportunities.css';
import axios from 'axios';
import { motion } from "framer-motion";
import CountDown from '../Opportunities/CountDown';
import { FaRegCirclePause } from 'react-icons/fa6';
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Oppertuinity = () => {
  const [selectedOption, setSelectedOption] = useState("Seek Loan");
  const services = ["Pancake Swap", "Biswap", "Mdex", "ApeSwap"];
  let loan
  if (selectedOption == 'Seek Loan') {
    // loan = Array.from({ length: (1000 / 1) }, (_, i) => (99 + i + 1) * 1);
    loan = Array.from({ length: (1000 - 100 + 1) }, (_, i) => 100 + i);
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
  const [againPlay, setAgainPlay] = useState(0);
  const [botModal, setBotModal] = useState(false);


  const exchanges = [
    { name: "Pancake Swap", url: "https://pancakeswap.finance" },
    { name: "Biswap", url: "https://biswap.org" },
    { name: "Mdex", url: "https://mdex.com" },
    { name: "ApeSwap", url: "https://apeswap.finance" },
  ];
  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get("https://backend.dsl.sg/tokens-coin");
      const assets = res.data;

      setDigitalAsset(assets);
      if (assets.length > 0) {
        const randomIndex = Math.floor(Math.random() * assets.length);
        setSelectedToken(assets[randomIndex].symbol);
        setPrice(assets[randomIndex].price.toFixed(6));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //********** */ this is previous one ************* 


  useEffect(() => {
    let interval;
    if (!isStartPopUp && !isStartPay) {
      if (!isStartPay) clearInterval(interval);
      interval = setInterval(() => {
        if (digitalAsset.length > 0) {
          const filteredAssets = digitalAsset.filter(
            (asset) => asset.symbol !== 'VVS' && asset.symbol !== 'VOLT' && asset.symbol !== 'XYZ'
          );

          if (filteredAssets.length > 0) {
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
  let estimateProfit = (parseFloat(profit).toFixed(6) || 0);

  // 0.0007 0.0010 0.0030 0.0020
  useEffect(() => {
    let updateExFee;
    if (selectedServices[0] === 'Pancake Swap') updateExFee = ((loanAmount) * 0.0080).toFixed(6)
    else if (selectedServices[0] === 'Biswap') updateExFee = ((loanAmount) * 0.0080).toFixed(6)
    else if (selectedServices[0] === 'Mdex') updateExFee = ((loanAmount) * 0.0080).toFixed(6)
    else if (selectedServices[0] === 'ApeSwap') updateExFee = ((loanAmount) * 0.0080).toFixed(6)

    setExFee(updateExFee);
  }, [loanAmount, selectedServices[0]])


  useEffect(() => {
    let updateExFeeB;
    if (selectedServices[1] === 'Pancake Swap') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (selectedServices[1] === 'Biswap') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (selectedServices[1] === 'Mdex') updateExFeeB = (DAB * 0.0080).toFixed(6)
    else if (selectedServices[1] === 'ApeSwap') updateExFeeB = (DAB * 0.0080).toFixed(6)
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


  const handleCloseBot = () => {
    setBotModal(false);
  }



  const options = [
    { value: 'Pancakeswap ↔ Biswap', label: 'Pancakeswap ↔ Biswap' },
    { value: 'Pancakeswap ↔ Apeswap', label: 'Pancakeswap ↔ Apeswap' },
    { value: 'Pancakeswap ↔ Babyswap', label: 'Pancakeswap ↔ Babyswap' },
    { value: 'Pancakeswap ↔ 1inch', label: 'Pancakeswap ↔ 1inch' },
    { value: 'Biswap ↔ Apeswap', label: 'Biswap ↔ Apeswap' },
    { value: 'Biswap ↔ Babyswap', label: 'Biswap ↔ Babyswap' },
    { value: 'Biswap ↔ 1inch', label: 'Biswap ↔ 1inch' },
    { value: 'Apeswap ↔ Babyswap', label: 'Apeswap ↔ Babyswap' },
    { value: 'Apeswap ↔ 1inch', label: 'Apeswap ↔ 1inch' },
    { value: 'Babyswap ↔ 1inch', label: 'Babyswap ↔ 1inch' },
  ];

  const [selectedPairs, setSelectedPairs] = useState([]);

  // Handle selection
  // const handleChange = (selectedOption) => {
  //   if (selectedOption.length <= 3) {
  //     setSelectedPairs(selectedOption);
  //   } else {
  //     Swal.fire(
  //       {
  //         text: 'You can select a maximum of 3 exchange pairs.',
  //         icon: 'warning',
  //         timer: '2000',
  //         showConfirmButton: false,
  //         background: '#2E292E',
  //         color: 'white'
  //       }
  //     )
  //   }
  // };
  const handleCheckboxChange2 = (e) => {
    const selectedValue = e.target.value;

    // Check if the option is already selected
    if (selectedPairs.includes(selectedValue)) {
      setSelectedPairs(selectedPairs.filter((pair) => pair !== selectedValue));
    } else {
      // Check if the selection limit is reached
      if (selectedPairs.length < 3) {
        setSelectedPairs([...selectedPairs, selectedValue]);
      } else {
        Swal.fire(
          {
            text: 'You can select a maximum of 3 exchange pairs.',
            icon: 'warning',
            timer: '2000',
            showConfirmButton: false,
            background: '#2E292E',
            color: 'white'
          }
        )
      }
    }
  };



  const [value, setValue] = useState(100); // Default value set to 100

  const handleChange2 = (e) => {
    let newValue = e.target.value;

    // Check if the new value is within the allowed range (1-1000)
    if (newValue >= 0 && newValue <= 1000) {
      setValue(newValue); // Update state only if the value is within the range
    } else {
      e.target.value = value; // Revert to the previous valid value if out of range
    }
  };


  // email handler
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [range, setRange] = useState(0);
  const [maxrange, setMaxRange] = useState(0);

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Validate email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputEmail)) {
      setIsValidEmail(true); // Email is valid
    } else {
      setIsValidEmail(false); // Email is invalid
    }
  };

  const handleRangeChange = (e) => {
    setRange(parseFloat(e.target.value)); // Ensure value is treated as a number
  };
  const handleMaxRangeChange = (e) => {
    setMaxRange(parseFloat(e.target.value)); // Ensure value is treated as a number
  };


  const navigate = useNavigate();

  return (
    <section className=''>
      <>
        {/* <h2 className="oppertunities-heading">
          <span>SECURE OPPORTUNITIES</span>
        </h2> */}
      </>
      <div className=' mt-0 pt-0' >
        <div className=" mt-0 pt-0"> {/* Bootstrap container */}
          <div className="card  border-0" style={{ background: 'transparent', color: 'white' }}>

            {/* <div className="pl-4 py-4 rounded  my-2"
              style={{
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem'
              }}>
              <div>
                <div>
                  <div className="d-flex align-items-sm-start align-items-md-center align-items-lg-center justify-content-center gap-2 my-1 " style={{ height: '40px' }}>
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
                    </div>
                  </div>
                </div>
              </div>

            </div> */}

            <p></p>

            <CountDown
              price={estimateProfit}
              alertShow={alertShow}
              setAlertShow={setAlertShow}
              isStartPopUp={isStartPopUp}
              isStartPay={isStartPay}
              againPlay={againPlay}
            />

            <div className="p-md-4 p-2 rounded mb-2" style={{ background: 'rgb(62 64 96)' }}>
              <Table className="overflow-x-auto" bordered responsive style={{ color: "black" }}>
                <thead>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <th style={{ width: "50%" }}>
                      <p
                        className="d-flex flex-column flex-sm-row gap-1 p-0 m-0 responsive-text"
                      >
                        <span className="">Name of Asset</span>
                        {/* <span className="">Asset</span> */}
                        {/* <span className="text-info"></span> */}
                      </p>
                    </th>
                    <th>
                      <p
                        className="d-flex flex-column flex-sm-row gap-1 p-0 m-0 responsive-text"
                      >
                        <span className="">Amount of Asset</span>
                        {/* <span className="">Asset</span> */}
                        {/* <span className="text-info"></span> */}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">

                  <tr>
                    <td style={{ color: '#90EE90' }} >{selectedToken}</td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 mb-0 pb-0">
                        <span>{DAB} </span>

                      </p>
                    </td>
                  </tr>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 mb-0 pb-0"> <span>Low Price at</span> <span style={{ color: '#4B0082' }} className=''>{selectedServices[0]}</span>

                      </p>
                      {/* <p className="my-0 py-0" style={{ fontSize: '12px', color: '#335D9A' }} >
                        {selectedServices[0] == 'Pancake Swap' && 'Exchange Fees: 0.80%'}
                        {selectedServices[0] == 'Biswap' && 'Exchange Fees: 0.80%'}
                        {selectedServices[0] == 'Mdex' && 'Exchange Fees: 0.80%'}
                        {selectedServices[0] == 'ApeSwap' && 'Exchange Fees: 0.80%'}
                      </p> */}
                    </td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>High Price at </span> <span style={{ color: '#4B0082' }} className=''>
                        {selectedServices[1]}</span></p>
                      {/* <p className="my-0 py-0" style={{ fontSize: '12px', color: '#335D9A' }} >
                        {selectedServices[1] == 'Pancake Swap' && 'Exchange Fees: 0.80%'}
                        {selectedServices[1] == 'Biswap' && 'Exchange Fees: 0.80%'}
                        {selectedServices[1] == 'Mdex' && 'Exchange Fees: 0.80%'}
                        {selectedServices[1] == 'ApeSwap' && 'Exchange Fees: 0.80%'}
                      </p> */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>

                        {reducedPrice} USDT
                      </span>
                      </p>
                    </td>
                    <td>
                      <p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>
                        {increasedPrice} USDT
                      </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ background: '#D3D3D3' }} className='fw-bold text-dark'>
                    <td><p className="d-flex flex-column flex-sm-row gap-1 p-0 m-0"> <span>Estimated </span> <span>
                      Fund(USDT) <FaInfoCircle
                        style={{ color: 'black', cursor: 'pointer' }}
                        onClick={() => {
                          Swal.fire({
                            text: 'To estimate the USDT amount for arbitrage, we calculate the price difference (spread) between the two DEXs, subtract all fees (buy, sell, and gas), and account for slippage based on liquidity and trade size. We ensure the trade remains profitable after these costs and simulate different amounts to optimize the balance between profit and slippage. This approach helps determine the ideal amount for maximum profit.',
                            background: '#2E2E39',
                            color: 'white',
                            customClass: {
                              popup: 'custom-swal-popup',
                            }
                          })
                        }}
                      />
                    </span></p>
                    </td>
                    <td className="d-flex flex-column flex-sm-row gap-1 "><span>Estimated </span>
                      <span>Profit(USDT) <FaInfoCircle
                        style={{ color: 'black', cursor: 'pointer' }}
                        onClick={() => {
                          Swal.fire({
                            text: 'To engage in arbitrage trading on DEXs, we identify price differences for the same asset across multiple platforms. We then buy the asset on the exchange where it’s cheaper and sell it on the exchange where it’s more expensive, factoring in trading fees, gas costs, and potential slippage. The key is to execute quickly, ensuring the price gap remains intact and profits are maximized before fees or market changes reduce the opportunity.',
                            background: '#2E2E39',
                            color: 'white',
                            customClass: {
                              popup: 'custom-swal-popup',
                            }
                          })
                        }}
                      />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>{loanAmount}
                    </td>
                    {/* <td className="bg-info text-dark">
                      {isNaN(estimateProfit) ? 0 : estimateProfit}
                    </td> */}
                    <td
                      style={{
                        backgroundColor: estimateProfit < 0 ? 'red' : 'green',
                        color: 'white', // Optional: To make text readable on colored background
                      }}
                    >
                      {/* {estimateProfit} USDT */}
                      {isNaN(estimateProfit) ? 0 : estimateProfit} USDT
                    </td>


                  </tr>
                  <tr className="text-dark">
                    <td
                      colSpan="2"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        // background: "red",
                        backgroundColor: estimateProfit < 0 ? '#BB181A' : 'green',
                        color: "white",
                        cursor: estimateProfit < 0 ? 'not-allowed' : "pointer",
                      }}
                      disabled={estimateProfit < 0}
                      onClick={() => {
                        if (estimateProfit < 0) {

                        }
                        else handleShow();
                      }}
                    >
                      {/* <br /> */}
                      <CountDown
                        price={estimateProfit}
                        alertShow={alertShow}
                        setAlertShow={setAlertShow}
                        isOthers={2}
                        isStartPopUp={isStartPopUp}
                        isStartPay={isStartPay}
                        againPlay={againPlay}
                      />
                    </td>
                  </tr>

                </tbody>
              </Table>

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
              <div className='d-flex justify-content-between align-items-center'>
                <div className="d-flex gap-5">
                  <label className="d-flex items-center gap-2">
                    <input type="checkbox" value="Own Funds" checked={selectedOption === "Own Funds"} onChange={handleCheckboxChange} disabled={isStartPay} className="h-5 w-5 text-blue-500" />
                    <span>Own Funds</span>
                  </label>

                  <label className="d-flex items-center gap-2">
                    <input type="checkbox" value="Seek Loan" checked={selectedOption === "Seek Loan"} onChange={handleCheckboxChange} disabled={isStartPay} className="h-5 w-5 text-blue-500" />
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
                          Swal.fire({
                            // title: 'Page Reloading',
                            text: 'The page will reload shortly!',
                            icon: 'info',
                            timer: 2000, // Time in milliseconds before closing (2 seconds)
                            showConfirmButton: false,
                            background: '#2E292D',
                            color: 'white',
                            willClose: () => {
                              window.location.reload(); // Reloads the page after the alert closes
                            },
                          });
                          // setIsStartPay(false);
                        }}
                        className='btn btn-outline-info text-white'
                      >
                        <FaPlayCircle />
                      </button>
                  }
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-center">
              <button
                onClick={() => {
                  navigate("/auto-bot");
                  // setBotModal(true)
                }}
                style={{ background: "#800080", color: "white" }}
                className="btn"
              >
                Auto Bot
              </button>
            </div>

            {/* modal here  */}
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
                      <Button variant="danger" onClick={() => {
                        handleClose();
                        window.location.reload();
                      }}>
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
                          borderTop: "5px solid #ff8c00",
                          animation: "spin 1s linear infinite",
                          margin: "0 auto",
                          marginBottom: "20px",
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


            {/* bot modal */}
            <Modal show={botModal} onHide={handleCloseBot} centered>
              <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Auto BOT
                </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  background: "#114372",
                  color: "white",
                  justifyContent: "center",
                  position: "relative",
                  fontSize: '12px'
                }}
              >
                <p style={{ fontSize: '12px' }}>The Auto Bot enables you to capitalize on all arbitrage opportunities. Please configure the following settings. Currently, you can only use your own funds for the Auto Bot. A subscription fee is required, along with a $1 bot fee for each execution, paid in BNB.</p>

                <p>Please complete the following:</p>

                <div className='d-flex align-items-center'>
                  <span className='mr-2' style={{ width: '45px' }}>Email:</span>
                  <input
                    type='email'
                    placeholder='Your Email'
                    className='p-1 px-2 border-none'
                    style={{ border: 'none', width: '200px', background: '#D3D3D3', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', }}
                    value={email}
                    onChange={handleChange}
                  />
                  <button className={`btn ${isValidEmail ? 'btn-primary' : 'btn-secondary'} btn-sm p-1 px-2 py-1 pl-0 ml-0`}
                    style={{
                      border: 'none',
                      borderTopRightRadius: '8px', // Right side rounded
                      borderBottomRightRadius: '8px', // Right side rounded
                      fontSize: '12px'
                    }}
                    disabled={!isValidEmail}
                    onClick={() => {
                      Swal.fire({
                        text: 'Coming Soon!',
                        icon: 'warning',
                        background: '#2E292D',
                        color: 'white',
                        timer: '2000',
                        showConfirmButton: false
                      })
                    }}
                  >
                    Send OTP
                  </button>

                </div>
                <p style={{ fontSize: '12px' }}>An email is required to provide updates after each execution and to notify you when 24 hours have passed. Please restart the auto bot every 24 hours.</p>

                <p>Slippage: </p>
                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '12px', marginBottom: '8px', paddingLeft: '170px' }}>
                    {range === 0 ? '0%' : (range)?.toFixed(2) + '%'}
                  </div>
                  <div className='d-flex gap-2 align-items-center'>
                    <span>Min</span>
                    <input
                      type="range"
                      min="-0.5"
                      max="0.5"
                      step="0.01"
                      value={range}
                      onChange={handleRangeChange}
                      style={{
                        width: '300px',
                        height: '10px',
                        background: 'linear-gradient(to right, #000 0%, #FF6347 50%, #000 100%)',
                        borderRadius: '10px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
                  <div style={{ fontSize: '12px', marginBottom: '8px', paddingLeft: '170px' }}>
                    {range === 0 ? '0%' : (maxrange)?.toFixed(2) + '%'}
                  </div>
                  <div className='d-flex gap-2 align-items-center'>
                    <span>Max</span>
                    <input
                      type="range"
                      min="-0.5"
                      max="0.5"
                      step="0.01"
                      value={maxrange}
                      onChange={handleMaxRangeChange}
                      style={{
                        width: '300px',
                        height: '10px',
                        background: 'linear-gradient(to right, #000 0%, #FF6347 50%, #000 100%)',
                        borderRadius: '10px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>


                <p style={{ fontSize: '12px' }}>The difference between the expected price of a trade and the actual execution price.</p>


                <div className='d-flex align-items-center gap-2'>
                  <span className='' style={{ width: '45px' }}>Capital:</span>
                  <input
                    type='number'
                    className='p-1 px-2 rounded border-none'
                    style={{ border: 'none', width: '200px', background: '#D3D3D3' }}
                  />
                  <span>USDT</span>
                </div>


                <div className="d-flex align-items-start gap-2 mt-2">
                  <span className='d-flex flex-wrap' style={{ width: '150px' }}>Pairs: <span style={{ fontSize: '12px' }}>(Max 3)</span></span>
                  <div className="d-flex gap-2 align-items-center mt-1 flex-md-row flex-column">
                    <div style={{ marginLeft: '0px' }}> {/* Add left margin for starting point */}
                      {options.map((option, index) => (
                        <label key={index} style={{ fontSize: '12px', marginBottom: '5px', marginRight: "8px" }}>
                          <input
                            type="checkbox"
                            name="exchangePairs"
                            value={option.value}
                            checked={selectedPairs.includes(option.value)}
                            onChange={handleCheckboxChange2}
                            style={{ marginRight: '5px' }}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>


                <div className='d-flex align-items-center gap-2 mt-2 '>
                  <span>Number of Executions per 24 Hours: </span>
                  <input
                    type="number"
                    className="p-1 px-2 rounded border-none"
                    value={value}
                    onChange={handleChange2}  // Call the handleChange function
                    min={1}
                    max={1000}
                    defaultValue={100}
                    style={{ border: 'none', width: '200px', background: '#D3D3D3' }}
                  />

                </div>

                <div>
                  <p>Each execution will cost $1.00.</p>
                </div>


                <div className='d-flex justify-content-between'>
                  <p></p>
                  <button className='btn btn-outline-warning mb-2'>Start</button>
                </div>
              </Modal.Body>
            </Modal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Oppertuinity;
