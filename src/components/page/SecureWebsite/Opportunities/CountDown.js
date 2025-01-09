// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Opportunities.css'

// const CountDown = ({ price, alertShow, setAlertShow, isOthers }) => {
//     const [countdown, setCountdown] = useState(10);
//     const [currentPrice, setCurrentPrice] = useState(price);

//     useEffect(() => {
//         const countdownInterval = setInterval(() => {
//             setCountdown((prev) => (prev > 1 ? prev - 1 : 10));

//             if (countdown === 2) {
//                 setCurrentPrice(price);
//             }
//             if(countdown === 1){
//                 toast(`You just missed the chance to earn ${currentPrice} USDT. Better luck next time!`, {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     className: "custom-toast",
//                     onClose: () => setAlertShow(false),
//                     });
//             }
//         }, 1000);

//         return () => {
//             clearInterval(countdownInterval)
//         };
//     }, [countdown, price, currentPrice]);

//     return (
//         <div>
//             {
//                 isOthers === 1 ? 
//                 <span className='text-center'><span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} seconds</span> 
//             </span> 
//             :
//             (
//                 isOthers === 2 ? 
//                 <p className='text-center my-0 py-2'>
//                 Secure the Opportunity Now! <span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} seconds</span> 
//             </p>
//             : 
//             <p className='text-center'>
//                 You’re about to miss out on earning <span className='text-decoration-underline fw-bold'>{price}</span> USDT
//                 in the next <span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} seconds</span> .
//             </p>
//             )
//            }
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//                 />
//             {/* Same as */}
//             <ToastContainer />
//         </div>
//     );
// };

// export default CountDown;

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Opportunities.css';

let hasToastBeenShown = false; // Flag to track if the toast has been shown

const CountDown = ({ price, alertShow, setAlertShow, isOthers, isStartPopUp, isStartPay, againPlay }) => {
  const [countdown, setCountdown] = useState(againPlay || 10);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [time, setTime] = useState(1000);
  // if(againPlay) setCountdown(10)
  // console.log('from===>>>', countdown, againPlay);
  useEffect(() => {
    let countdownInterval;

    if (isStartPay) clearInterval(countdownInterval);
    if (!isStartPopUp && !isStartPay && price > 0) {
      // setCountdown(10);
      hasToastBeenShown = false;
      countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 10));
        if (countdown === 2) {
          setCurrentPrice(price);
        }
        if (countdown === 1 && !hasToastBeenShown) {
          toast.dismiss();

          toast(<div>
            You just missed the chance to earn{" "}
            <span style={{ color: "yellow", }}>
              {currentPrice} USDT.
            </span> Better luck next time!
          </div>, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "custom-toast",
            onClose: () => setAlertShow(false),
          });

          // Set the flag to true to ensure the toast is not shown again
          hasToastBeenShown = true;
        }
      }, time);
    }

    // Cleanup function to clear the interval and reset the toast flag
    return () => {
      clearInterval(countdownInterval);
      hasToastBeenShown = false; // Reset for the next interval
    };
  }, [isStartPopUp, isStartPay, countdown, price, currentPrice]);


  return (
    <div>
      {
        isOthers === 1 ?
          <span className='text-center'>
            <span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
          </span>
          :
          (isOthers === 2 ?
            (
              price > 0 ?
                <p className='text-center justify-content-center d-flex flex-column flex-sm-row gap-1 my-0 py-2'>
                  Secure the Opportunity Now! <span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
                </p>
                :

                // <p className='text-center justify-content-center d-flex flex-column flex-sm-row gap-1 my-0 py-2'>
                //   No opportunity at the moment.  <span style={{fontSize: '16px', height: '16px'}}>Please stand by.</span> 
                // </p>
                <div className="text-center justify-content-center d-flex flex-column flex-sm-row gap-1 my-0 ">
                  {/* Processing Spinner */}
                  <div style={{height: '16px'}} className="d-flex justify-content-center py-2">
                    <div className="spinner-border text-primary mt-1" role="status" style={{ width: '16px', height: '16px' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>

                  {/* Message Text */}
                  <p className='py-2'>
                    No opportunity at the moment.
                    <span style={{ fontSize: '16px', height: '16px' }}> Please stand by.</span>
                  </p>
                </div>


            )
            :
            (price > 0 ?
              <p className='text-center countDown-text'>
                You’re about to miss out on earning <br className="d-sm-block d-md-none" />
                <span className='text-decoration-underline fw-bold'>{isNaN(price) ? 0 : price}</span> USDT
                in the next <span style={{ color: 'yellow', fontWeight: 'bold' }}>{countdown} {countdown === 1 ? 'second' : 'seconds'}</span>
              </p>

              :
              <p className='countDown-text'>

              </p>
            )
          )
      }

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CountDown;



