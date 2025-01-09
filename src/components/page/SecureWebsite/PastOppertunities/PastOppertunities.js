import React, { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import moment from 'moment-timezone';
import BottomMessage from '../Components/BottomMessage';
import Disclimer from '../Components/Disclimer';

const PastOpportunities = () => {
    const [pastData, setPastData] = useState();
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState();
    const [userTimezone, setUserTimezone] = useState('');
    const [isLoading, setIsLoanding] = useState(false);

    const fetchData = async () => {
        setIsLoanding(true);
        try {
            const response = await axios.get("https://backend.dsl.sg/api/v1/securearbitrage/data");
            const reversedData = response.data?.reverse();
            setPastData(reversedData);

            setError(null);
            const total = reversedData.reduce((sum, item) => {
                const price = parseFloat(item?.profit); // Safely handle cases where price may not be a valid number
                const ans = (sum + price)
                return parseFloat(ans.toFixed(6));
            }, 0);

            // Set the total price in the state
            setTotalPrice(total);
            setIsLoanding(false)
            // console.log("Data fetched successfully:", response.data);
        } catch (err) {
            console.error("Error fetching data:", err.message);
            setError(err.message);
        }
    };
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(()=>{
        window.scroll(0,0);
      } ,[])


    const formatNumber = (number) => {
        if (isNaN(number)) return ''; // Check if it's a valid number

        // Ensure 6 decimal places
        let formattedNumber = number.toFixed(6);

        // Add commas for thousands
        const parts = formattedNumber.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to the integer part

        return parts.join('.');
    };

    const convertToLocalTime = (gmtTimeString) => {
        // Step 1: Convert 'DD-MM-YYYY HH:mm:ss' to ISO 8601 format 'YYYY-MM-DDTHH:mm:ssZ'
        const [day, month, year, hour, minute, second] = gmtTimeString.split(/[-\s:]+/); // Split the input string
        const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`; // Create ISO 8601 format string

        // Step 2: Use moment-timezone to convert the GMT time to Bangladesh Time (Asia/Dhaka)
        return moment(isoString).tz(userTimezone).format('DD-MM-YYYY HH:mm:ss'); // Convert and format time
    };

    console.log('zonneee===>>>', pastData?.length);


    useEffect(() => {
        fetch('https://ipwhois.app/json/')
            .then((response) => response.json())
            .then((data) => {
                setUserTimezone(data.timezone); // Set the user's timezone
            })
            .catch((error) => {
                console.error('Error fetching timezone:', error);
            });
    }, []);

    return (
        <section className='secure-body-background'>
            <PageTitle title={'PAST OPPORTUNITIES'} />
            <main className='container py-5'>
                {/* <h5>Past Opportunities</h5> */}
                <p>In the last 24 hours, you missed the chance to earn <span style={{ color: 'yellow' }}>{formatNumber(totalPrice)} </span>USDT. Don’t let it slip away again—subscribe now!</p>
                {/* Responsive Table */}
                <div className='table-responsive'>
                    <table className='table table-striped table-bordered'>
                        <thead className=''>
                            <tr style={{ background: '#D3D3D3', color: 'black' }}>
                                <th>Timestamp</th>
                                <th>Asset</th>
                                <th>Fund</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {pastData?.map((item, index) => (
                                <tr
                                    key={index}
                                    className='text-white'
                                    style={{ color: 'white' }}
                                >
                                    <td style={{ color: 'white' }}> {convertToLocalTime(item.date)} </td>
                                    <td style={{ color: 'white' }}>{item.digitalAsset}</td>
                                    <td style={{ color: 'white' }}>{item.profit} USDT</td>
                                </tr>
                            ))}
                        </tbody> */}
                        <tbody>
                            {pastData?.map((item, index) => (
                                <tr key={index} className="text-white">
                                    {/* <td className={index === 0 ? 'bg-success text-white' : 'text-white'}>
                                        {convertToLocalTime(item.date)}
                                    </td>
                                    <td className={index === 0 ? 'bg-success text-white' : 'text-white'}>
                                        {item.digitalAsset}
                                    </td>
                                    <td className={index === 0 ? 'bg-success text-white' : 'text-white'}>
                                        {item.profit} USDT
                                    </td> */}
                                    <td
                                        style={{
                                            backgroundColor: index === 0 ? '#1A2421' : index === 1 ? '#00A86B' : 
                                            index === 2 ? '#708238' : 'transparent', 
                                            color: index === 1 || index === 2 ? 'white' : 'white', 
                                        }}
                                    >
                                        {convertToLocalTime(item.date)}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: index === 0 ? '#1A2421' : index === 1 ? '#00A86B' : 
                                            index === 2 ? '#708238' : 'transparent',
                                            color: index === 1 || index === 2 ? 'white' : 'white', 
                                        }}
                                    >
                                        {item.digitalAsset}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: index === 0 ? '#1A2421' : index === 1 ? '#00A86B' : 
                                            index === 2 ? '#708238' : 'transparent',
                                            color: index === 1 || index === 2 ? 'white' : 'white', 
                                        }}
                                    >
                                        {item.estimatedFunds} {item.estimatedFunds && 'USDT'}
                                    </td>
                                    <td
                                        style={{
                                            backgroundColor: index === 0 ? '#1A2421' : index === 1 ? '#00A86B' : 
                                            index === 2 ? '#708238' : 'transparent',
                                            color: index === 1 || index === 2 ? 'white' : 'white', 
                                        }}
                                    >
                                        {item.profit} USDT
                                    </td>


                                </tr>
                            ))}
                        </tbody>

                        <thead className=''>
                            <tr style={{ background: '#D3D3D3', color: 'black', height: '40px' }}>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {
                    isLoading && <div>

                        <p style={{ color: '#F0A500' }} className='text-center'>Retrieving what you missed in the past 24 hours.</p>
                        <div style={{ height: '16px' }} className="d-flex justify-content-center mb-4 py-2">
                            <div className="spinner-border text-primary mt-1" role="status" style={{ width: '30px', height: '30px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                    </div>
                }

                {/* <p className='mt-5'></p>
                <BottomMessage /> */}
                <Disclimer />
            </main>
        </section>
    );
};

export default PastOpportunities;
