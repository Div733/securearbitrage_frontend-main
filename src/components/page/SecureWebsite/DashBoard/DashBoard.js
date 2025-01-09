// import React from 'react';
// import PageTitle from '../Components/PageTitle';

// const DashBoard = () => {
//     return (
//         <section className='secure-body-background'>
//             <PageTitle title={'DASHBOARD'} />

//             <main className='container py-5'>
//                 <div className=''>
//                     <div className=''>
//                         <span>Wallet Address: </span> <br />
//                         <input
//                             type='text'
//                             readOnly
//                             value={'0x1234567890abcdef1234567890abcdef12345678'}
//                             className='py-2 px-2 rounded'
//                             style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                         />

//                     </div>

//                     <div className='mt-2'>
//                         <span>BNB Balance: </span> <br />
//                         <input
//                             type='text'
//                             readOnly
//                             value={'46536543.877435'}
//                             className='py-2 px-2 rounded'
//                             style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                         />

//                     </div>

//                     <div className='mt-2'>
//                         <span>USDT Balance: </span> <br />
//                         <input
//                             type='text'
//                             readOnly
//                             value={'45355.456790'}
//                             className='py-2 px-2 rounded'
//                             style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                         />

//                     </div>

//                     <div className='d-flex flex-column'>
//                         <label>Email:</label>
//                         <div style={{ position: 'relative' }}>
//                             <input
//                                 type='text'
//                                 defaultvalue={'securearbitrage@gmail.com'}
//                                 className='py-2 px-2 rounded'
//                                 style={{
//                                     background: '#D9D9D9', color: 'black', border: 'none', width: '100%'
//                                 }}
//                             />
//                             <button style={{ position: 'absolute', right: '0' }} className='btn btn-secondary py-2'>Send OTP</button>
//                         </div>
//                     </div>

//                     <div className='mt-2'>
//                         <span>Subscription:</span> <br />
//                         <div className='d-flex justify-content-between gap-2'>
//                             <div style={{ width: '50%' }}>
//                                 <span>Start</span>
//                                 <input
//                                     type='text'
//                                     readOnly
//                                     value={'11-12-2024'}
//                                     className='py-2 px-2 rounded'
//                                     style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                                 />
//                             </div>
//                             <div style={{ width: '50%' }}>
//                                 <span>End</span>
//                                 <input
//                                     type='text'
//                                     readOnly
//                                     value={'11-1-2025'}
//                                     className='py-2 px-2 rounded'
//                                     style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='d-flex justify-content-end'>
//                         <button className='btn btn-primary btn-sm mt-2'>Subcribe Now</button>
//                     </div>


//                     <div className='mt-2'>
//                         <span>Bot Status:</span> <br />
//                         <div className='d-flex justify-content-between gap-2'>
//                             <div style={{ width: '50%' }}>
//                                 <span>Start</span>
//                                 <input
//                                     type='text'
//                                     readOnly
//                                     value={'11-12-2024 12:40:20'}
//                                     className='py-2 px-2 rounded'
//                                     style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                                 />
//                             </div>
//                             <div style={{ width: '50%' }}>
//                                 <span>End</span>
//                                 <input
//                                     type='text'
//                                     readOnly
//                                     value={'11-1-2025 12:40:20'}
//                                     className='py-2 px-2 rounded'
//                                     style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                                 />
//                             </div>
//                         </div>
//                     </div>


//                     <div className='mt-2'>
//                         <span>Capital in contract (USDT): </span> <br />
//                         <div className='d-flex gap-1 align-items-center'>
//                             <input
//                                 type='text'
//                                 readOnly
//                                 value={'1000'}
//                                 className='py-2 px-2 rounded'
//                                 style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                             /> 
//                             {/* <span>USDT</span> */}
//                         </div>

//                     </div>
//                     <div className='mt-2'>
//                         <span>Bot Fees in contract(USDT): </span> <br />
//                         <div className='d-flex gap-1 align-items-center'>
//                             <input
//                                 type='text'
//                                 readOnly
//                                 value={'10'}
//                                 className='py-2 px-2 rounded'
//                                 style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
//                             /> 
//                             {/* <span>USDT</span> */}
//                         </div>

//                     </div>
//                 </div>

//                 <p className='mt-3'>Last Login: DDMMYYYY HHMMSS</p>
//                 <p style={{ color: 'red' }} className='mt-3'>We don’t monitor your earnings, so be sure to track them yourself.</p>
//             </main>

//         </section>
//     );
// };

// export default DashBoard;











import React, { useState } from 'react';
import PageTitle from '../Components/PageTitle';
import { useLocation } from 'react-router-dom';
import { useWallet } from '../Hooks/useConnectWallet';
import moment from 'moment';

const DashBoard = () => {
    const [formData, setFormData] = useState({
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        bnbBalance: '46536543.877435',
        usdtBalance: '45355.456790',
        email: 'securearbitrage@gmail.com',
        subscriptionStart: '00-00-0000',
        subscriptionEnd: '00-00-0000',
        numberOfTransactions: 0,
        botStart: '00-00-0000 00:00:00',
        botEnd: '00-00-0000 00:00:00',
        capitalInContract: '0.000000',
        botFeesInContract: '0.000000',
        lastLogin: 'DDMMYYYY 14:34:55'
    });
    const location = useLocation();

    // const { walletAddress, ethBalance, ethBalanceUsdt } = location.state || {};
    const { walletAddress, ethBalance, user, ethBalanceUsdt, connectWallet, logout } = useWallet();

    console.log('user datataaaaaaaaaaaaaaaaaaaaaaaaaaaaa -====> ', user.walletAddress, user)


    const convertToLocalTime = (gmtTimeString) => {
            return moment(gmtTimeString).tz('Asia/Singapore').format('DD-MM-YYYY HH:mm:ss'); 
    };
    return (
        <section className='secure-body-background'>
            <PageTitle title={'DASHBOARD'} />

            <main className='container py-5'>
                <form>
                    {/* Wallet Address */}
                    <div className='mt-2'>
                        <label>Wallet Address:</label>
                        <input
                            type='text'
                            readOnly
                            value={user?.walletAddress}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* BNB Balance */}
                    <div className='mt-2'>
                        <label>BNB Balance:</label>
                        <input
                            type='text'
                            readOnly
                            value={ethBalance ? parseFloat(ethBalance).toFixed(6) : ''}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* USDT Balance */}
                    <div className='mt-2'>
                        <label>USDT Balance:</label>
                        <input
                            type='text'
                            readOnly
                            value={ethBalanceUsdt ? parseFloat(ethBalanceUsdt).toFixed(6) : ''}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* Email */}
                    <div className='mt-2'>
                        <label>Email:</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type='text'
                                // defaultValue={formData.email}
                                placeholder='Please enter your email'
                                className='py-2 px-2 rounded'
                                style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                            />
                            <button
                                type='button'
                                style={{ position: 'absolute', right: '0' }}
                                className='btn btn-secondary py-2'
                            >
                                Send OTP
                            </button>
                        </div>
                    </div>

                    {/* Subscription */}
                    <div className='mt-2'>
                        <label>Subscription: <span style={{color: '#31D2F2'}}>Trial / Monthly / Yearly</span></label>
                        <div className='d-flex justify-content-between gap-2'>
                            <div style={{ width: '50%' }}>
                                <label style={{color: 'orange'}}>Start</label>
                                <input
                                    type='text'
                                    readOnly
                                    value={formData.subscriptionStart}
                                    className='py-2 px-2 rounded'
                                    style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                                />
                            </div>
                            <div style={{ width: '50%' }}>
                                <label style={{color: 'orange'}}>End</label>
                                <input
                                    type='text'
                                    readOnly
                                    value={formData.subscriptionEnd}
                                    className='py-2 px-2 rounded'
                                    style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <button className='btn btn-info btn-sm mt-2'>Start 3 days Trial.</button>
                        <button className='btn btn-primary btn-sm mt-2'>Subscribe Now</button>
                    </div>


                    <div className='mt-2'>
                        <label>Number of Transactions allowed for your subscription:</label>
                        <input
                            type='number'
                            // readOnly
                            defaultValue={formData.numberOfTransactions}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* Bot Status */}
                    <div className='mt-2'>
                        <label>Bot Status:</label>
                        <div className='d-flex justify-content-between gap-2'>
                            <div style={{ width: '50%' }}>
                                <label style={{color: 'orange'}}>Start</label>
                                <input
                                    type='text'
                                    readOnly
                                    value={formData.botStart}
                                    className='py-2 px-2 rounded'
                                    style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                                />
                            </div>
                            <div style={{ width: '50%' }}>
                                <label style={{color: 'orange'}}>End</label>
                                <input
                                    type='text'
                                    readOnly
                                    value={formData.botEnd}
                                    className='py-2 px-2 rounded'
                                    style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Capital in Contract */}
                    <div className='mt-2'>
                        <label>Capital in Contract (USDT):</label>
                        <input
                            type='text'
                            readOnly
                            value={formData.capitalInContract}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* Bot Fees in Contract */}
                    <div className='mt-2'>
                        <label>Bot Fees in Contract (USDT):</label>
                        <input
                            type='text'
                            readOnly
                            value={formData.botFeesInContract}
                            className='py-2 px-2 rounded'
                            style={{ background: '#D9D9D9', color: 'black', border: 'none', width: '100%' }}
                        />
                    </div>

                    {/* Last Login */}
                    <div className='d-flex align-items-center justify-content-between'>
                    <p className='mt-3'>Last Login: {convertToLocalTime(user?.updatedAt)} (Singapore)</p>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                    </div>
                </form>



                <p style={{ color: 'yellow' }} className='mt-3'>We don’t monitor your earnings, so be sure to track them yourself.</p>
            </main>
        </section>
    );
};

export default DashBoard;
