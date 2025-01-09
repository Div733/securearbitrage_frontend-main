import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';

const TokenTable = () => {
  const [pastData, setPastData] = useState();
  const [error, setError] = useState(null);
  const [userTimezone, setUserTimezone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://backend.dsl.sg/api/v1/arbitrage/pass/transactions");
      const reversedData = response.data.data;
      setPastData(reversedData);
      setError(null);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const convertToLocalTime = (gmtTimeString) => {
    return moment(gmtTimeString)?.tz(userTimezone)?.format('DD-MM-YYYY HH:mm:ss');
  };

  const navigate = useNavigate();

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

  const getRowColor = (rowIndex) => {
    const colors = ['#000000', '#2b3370', '#1c662a', '#6b2d2d', '#542451', '#911f41', '#8c3920', '#176e5f', '#6d7817'];
    return colors[rowIndex % colors.length];
  };

  const isLastMinute = (timestamp) => {
    const now = moment();
    const rowTime = moment(timestamp);
    return now.diff(rowTime, 'seconds') <= 40;
  };

  return (
    <div>
      <div
        className="p-2 p-md-4 rounded mb-4"
        style={{
          background: 'linear-gradient(135deg, #1C2541, #3A506B, #5BC0BE)',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgb(205, 219, 11)',
        }}
      >
        <Table className="overflow-x-auto mb-0" bordered responsive style={{ color: 'black' }}>
          <thead style={{color: '#7CCBE6'}}>
            <tr>
              <td style={{ width: '150px', whiteSpace: 'nowrap' }}>Action</td>
              <td style={{ width: '150px', whiteSpace: 'nowrap' }}>Token Symbol</td>
              <td style={{ width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>Amount of Token</td>
              <td style={{ width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>Amount of USDT</td>
              <td style={{ width: '200px', whiteSpace: 'nowrap' }}>Timestamp</td>
            </tr>
          </thead>
          <tbody className="text-white">
            {pastData?.map((item, index) => {
              const withinLastMinute = isLastMinute(item.createdAt);
              const rowColor = withinLastMinute ? getRowColor(index) : 'transparent';

              return (
                <tr style={{ color: 'white', backgroundColor: rowColor }} key={index}>
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
                  <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap' }}>{item.tokenSymbol}</td>
                  <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>{Number(item.amountToken).toFixed(6)}</td>
                  <td style={{ color: 'white', width: '200px', whiteSpace: 'nowrap', textAlign: 'right' }}>{Number(item.amountUSDT).toFixed(6)}</td>
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
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TokenTable;

