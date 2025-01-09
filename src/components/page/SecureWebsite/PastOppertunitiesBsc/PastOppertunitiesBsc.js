import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import moment from 'moment-timezone';
import Disclimer from '../Components/Disclimer';

const PastOpportunitiesBsc = () => {
    const [pastData, setPastData] = useState();
    const [error, setError] = useState(null);
    const [userTimezone, setUserTimezone] = useState('');
    const [isLoading, setIsLoanding] = useState(false);
    const [copiedAddress, setCopiedAddress] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [intervalId, setIntervalId] = useState(null); // Store interval ID

    const fetchData = async () => {
        // setIsLoanding(true);
        try {
            const response = await axios.get("https://backend.dsl.sg/api/v1/arbitrage/pass/transactions");
            const reversedData = response.data.data;
            setPastData(reversedData);
            setError(null);
            // setIsLoanding(false);
        } catch (err) {
            console.error("Error fetching data:", err.message);
            setError(err.message);
            // setIsLoanding(false);
        }
    };


    useEffect(() => {
        if(!pastData) setIsLoanding(true);
        else setIsLoanding(false);
    } ,[pastData])

    useEffect(() => {
        fetchData(); // Fetch data immediately on load

        // Start the interval
        const id = setInterval(fetchData, 1000);
        setIntervalId(id);

        // Cleanup on unmount
        return () => clearInterval(id);
    }, []);

    const handlePausePlay = () => {
        if (isPaused) {
            // Resume fetching
            const id = setInterval(fetchData, 5000);
            setIntervalId(id);
        } else {
            // Pause fetching
            clearInterval(intervalId);
        }
        setIsPaused(!isPaused); // Toggle pause state
    };

    const convertToLocalTime = (gmtTimeString) => {
        return moment(gmtTimeString)?.tz(userTimezone)?.format('DD-MM-YYYY HH:mm:ss');
    };

    const formatTransactionAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    };

    useEffect(() => {
        fetch('https://ipwhois.app/json/')
            .then((response) => response.json())
            .then((data) => {
                setUserTimezone(data.timezone);
            })
            .catch((error) => {
                console.error('Error fetching timezone:', error);
            });
    }, []);

    useEffect(()=>{window.scroll(0,0)},[])

    return (
        <section className='secure-body-background2'>
            <PageTitle title={'USDT Swaps on BSC'} />
            <main className='container py-5'>
                <div className="d-flex justify-content-end mb-3">
                    {/* Play/Pause Button */}
                    <button
                        className={`btn btn-${isPaused ? 'success' : 'danger'}`}
                        onClick={handlePausePlay}
                    >
                        {isPaused ? 'Play' : 'Pause'}
                    </button>
                </div>
                <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                        <thead className=''>
                            <tr style={{ background: '#D3D3D3', color: 'black' }}>
                                <th>ChainID</th>
                                {/* <th style={{ width: '200px', whiteSpace: 'nowrap' }}>Token Symbol</th> */}
                                <th style={{ width: '200px', whiteSpace: 'nowrap' }}>Token Name</th>
                                <th style={{ width: '150px', whiteSpace: 'nowrap' }}>Action</th>
                                <th style={{ width: '200px', whiteSpace: 'nowrap' }}>Token Address</th>
                                <th style={{ width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>Amount of USDT</th>
                                <th style={{ width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>Amount of Token</th>
                                <th style={{ width: '150px', whiteSpace: 'nowrap' }}>Block Number</th>
                                <th style={{ width: '200px', whiteSpace: 'nowrap' }}>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className='table-body-text-color' style={{ color: 'white !important' }}>
                            {pastData?.map((item, index) => (
                                <tr style={{ color: 'white' }} key={index}>
                                    <td style={{ color: 'white' }}>{item.chainId}</td>
                                    {/* <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap' }}>{item.tokenSymbol}</td> */}
                                    <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap' }}>{item.tokenName}</td>
                                    <td
                                        style={{
                                            color: 'white',
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            backgroundColor: item.action === 'Buy Token' ? 'rgb(38 111 38)' : item.action === 'Sell Token' ? '#FF4500' : 'transparent',
                                        }}
                                    >
                                        {item.action}
                                    </td>

                                    <td
                                        style={{
                                            color: 'white',
                                            width: '200px',
                                            whiteSpace: 'nowrap',
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        <a
                                            href={`https://bscscan.com/token/${item.tokenAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'white',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            {formatTransactionAddress(item.tokenAddress)}
                                        </a>
                                    </td>

                                    <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>{Number(item.amountUSDT).toFixed(6)}</td>
                                    <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>{Number(item.amountToken).toFixed(6)}</td>
                                    <td style={{ color: 'white', width: '150px', whiteSpace: 'nowrap' }}>
                                    <a
                                            href={`https://bscscan.com/block/${item.blockNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'white',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                             {item.blockNumber}
                                        </a>
                                    </td>
                                    <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap' }}>
                                       
                                        <a
                                            href={`https://bscscan.com/token/${item.tokenAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'white',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                             {convertToLocalTime(item.createdAt)}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isLoading && <p style={{ color: '#F0A500' }} className='text-center'>Fetching data from mempools.</p>}

                <Disclimer />
            </main>
        </section>
    );
};

export default PastOpportunitiesBsc;
