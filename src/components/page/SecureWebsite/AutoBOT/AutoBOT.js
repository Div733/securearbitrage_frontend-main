import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import Swal from 'sweetalert2';
import HomeDisclimer from '../Components/HomeDisclimer';
import { useNavigate } from 'react-router-dom';

const AutoBOT = () => {
  const [email, setEmail] = useState('');
  const [range, setRange] = useState(-0.1);
  const [maxrange, setMaxRange] = useState(0.1);
  const [value, setValue] = useState(100);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState([]);
  const [startModalShow, setStartModalShow] = useState(false);
  const [isDisclaimer, setIsDisclaimer] = useState(false);

  const handleClose = () => {
    setIsDisclaimer(false)
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

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const handleMaxRangeChange = (e) => {
    setMaxRange(e.target.value);
  };

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(inputEmail)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  // const handleChange2 = (e) => {
  //   setValue(e.target.value);
  // };

  const randomlySelectPairs = () => {
    const randomSelection = options
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(option => option.value);
    setSelectedPairs(randomSelection);
  };
  const handleCheckboxChange2 = (e) => {
    const value = e.target.value;

    if (!e.target.checked && selectedPairs.includes(value)) {
      setSelectedPairs(prev => prev.filter(pair => pair !== value));
    } else if (e.target.checked && selectedPairs.length < 3) {
      setSelectedPairs(prev => [...prev, value]);
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
  };


  useEffect(() => {
    randomlySelectPairs();
  }, []);

  const handleOTP = () => {
    Swal.fire({
      text: 'Coming Soon!',
      icon: 'warning',
      background: '#2E292D',
      color: 'white',
      timer: '2000',
      showConfirmButton: false
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  const handleCloseModal = () => {
    setStartModalShow(false);
  }


  const [capital, setCapital] = useState(1000); // State for capital input

  const handleCapitalChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 100 && value <= 1000000) {
      setCapital(value);
    } else if (value < 100) {
      setCapital(100);
    } else if (value > 1000000) {
      setCapital(1000000);
    }
  };

  const [exchangesPair, setExchangesPair] = useState(100);
  const handleExchangesPair = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 10 && value <= 1440) {
      setExchangesPair(value);
    } else if (value < 10) {
      setExchangesPair(10);
    } else if (value > 1440) {
      setExchangesPair(1440);
    }
  }

  const navigate = useNavigate()


  return (
    <section className='secure-body-background'>
      <PageTitle title={'Auto BOT'} />

      <main className='container py-2 pb-5'>
        <div style={{ color: "white", paddingTop: '20px' }}>
          {/* <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Auto BOT</h2> */}
          <p style={{ fontSize: '16px' }}>The Auto Bot enables you to capitalize on all arbitrage opportunities. Please configure the following settings. Currently, you can only use your own funds for the Auto Bot. A subscription fee is required, along with a $1 bot fee for each execution, paid in BNB.</p>

          <p className='text-decoration-underline'>Please complete the following: </p>
          <br />

          <div className='d-flex align-items-center mb-2'>
            <span className='mr-2' style={{ width: '60px', color: '#F0A500' }}>Email:</span>
            <input
              type='email'
              placeholder='Your Email'
              className='p-1 px-2 border-none'
              style={{ border: 'none', width: '200px', background: '#D3D3D3', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', }}
              value={email}
              onChange={handleChange}
            />
            <button
              className={`btn ${isValidEmail ? 'btn-primary' : 'btn-secondary'} btn-sm px-2  ml-0`}
              style={{
                border: 'none',
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                paddingTop: '6px',
                paddingBottom: '6px'
                // fontSize: '12px'
              }}
              disabled={!isValidEmail}
              onClick={handleOTP}
            >
              Send OTP
            </button>
          </div>

          <p style={{ fontSize: '16px' }}>An email is required to provide updates after each execution and to notify you when 24 hours have passed. Please restart the auto bot every 24 hours.</p>
          <br />

          <p style={{ color: '#F0A500' }}>Slippage: </p>
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10px' }}>
            <div style={{ fontSize: '12px', marginBottom: '8px', paddingLeft: '175px' }}>
              {range === 0 ? '0%' : (
                range > 0 ? '+' + (range) + '%' : (
                  range == 0 ? '-' + (range) + '%' : (range) + '%'
                )
              )}
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
                  background: 'linear-gradient(to right, #FFD700 0%, #FFA500 100%)',
                  borderRadius: '10px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
            <div style={{ fontSize: '12px', marginBottom: '8px', paddingLeft: '175px' }}>
              {maxrange === 0 ? '0%' : (
                maxrange > -1 ? '+' + (maxrange) + '%' : (maxrange) + '%'
              )}
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
                  background: 'linear-gradient(to right, #FFD700 0%, #FFA500 100%)',
                  borderRadius: '10px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <p style={{ fontSize: '16px' }}>The difference between the expected price of a trade and the actual execution price.</p> <br />

          <div className='d-flex align-items-center gap-2'>
            <span style={{ width: '53px', color: '#F0A500' }}>Capital:</span>
            <input
              type='number'
              // defaultValue={1000}
              value={capital} // Bind state value
              onChange={handleCapitalChange} // Handle changes 
              className='p-1 px-2 rounded border-none'
              style={{ border: 'none', width: '200px', background: '#D3D3D3' }}
            />
            <span>USDT</span>
          </div>
          <br />

          <div className="d-flex align-items-start gap-md-4 gap-2 mt-2">
            <span style={{ width: '60px', color: '#F0A500' }}>Pairs: <br /> <span style={{ fontSize: '16px', color: 'white' }} >(Max 3)</span></span>
            <div className="d-flex gap-2 mt-1 flex-nowrap flex-md-wrap flex-md-row flex-column justify-content-start">
              {options.map((option, index) => (
                <label className='' key={index} style={{ fontSize: '16px', marginBottom: '5px', marginRight: "8px" }}>
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
          <div className='d-flex justify-content-end'>
            <button
              className='btn btn-outline-info btn-sm'
              onClick={() => {
                randomlySelectPairs();
              }}
            >
              Recommend Me
            </button>
          </div>
          <br />

          <div className='d-flex align-items-center gap-2 mt-2'>
            <span style={{ color: '#F0A500' }}>Executions per 24 Hours: </span>
            <input
              type="number"
              className="p-1 px-2 rounded border-none"
              value={exchangesPair}
              onChange={handleExchangesPair}
              min={10}
              max={1440}
              defaultValue={100}
              style={{ border: 'none', width: '200px', background: '#D3D3D3' }}
            />
          </div>

          <div className='d-flex align-items-center gap-2 mt-2'>
            <span style={{ color: '#F0A500' }}>Balance number of execution for your subscription: </span>
            <input
              type="number"
              className="p-1 px-2 rounded border-none"
              value={0}
              // onChange={handleExchangesPair}
              readOnly
              min={10}
              max={1440}
              defaultValue={100}
              style={{ border: 'none', width: '200px', background: '#D3D3D3' }}
            />
          </div>

          <div>
            <p>Each execution: USD 1.00.</p>
          </div>

          <div className='d-flex justify-content-between'>
            <button
              className='btn btn-outline-warning btn-sm mb-2'
              onClick={() => {
                navigate('/opportunity-bot')
              }}
            >Back</button>
            <button
              className='btn btn-outline-warning btn-sm mb-2'
              onClick={() => {
                setStartModalShow(true);
              }}
            >Start</button>
          </div>
        </div>
        <HomeDisclimer />
      </main>
    </section>
  );
};

export default AutoBOT;
