import { useNavigate } from 'react-router-dom';
import '../SecureWeb.css'
import Drawer from '../Home/Drawer';
import { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import BottomMessage from '../Components/BottomMessage';
import Disclimer from '../Components/Disclimer';

const Pricing = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
     useEffect(()=>{
        window.scroll(0,0);
      } ,[])

    return (
        <section className='secure-body-background'>
        {/* <div className="secure-heading">
            <span className=''>
              PRICING{" "}
              <i
                className="ms-3 fas fa-bars"
                onClick={() => setIsDrawerOpen(true)}
                style={{ cursor: "pointer" }}
            ></i>
            </span>
        </div>


   
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
      <PageTitle title={'PRICING'}/>

        <main className='container py-5'>

            <div className=''>
                <button className='mb-2 btn btn-success'>Subscription:</button>
                <li>USD 100.00 per month (payable in BNB). <span style={{color: 'orange'}}>1,000 transactions per month.</span></li> <br/>
                <li>USD 1,000.00 per annum (payable in BNB). <span style={{color: 'orange'}}>20,000 transactions per year.</span></li>
                <p className='mb-0 pb-0'>Enjoy a 1-month free trial with our annual package!</p>

                <br/>
                <p className=' mb-2 btn btn-success'>Bot Service Charge:</p>
                <li>A non-refundable fee of USD 1.00 (payable in BNB) for all successful trades.</li>

                <br/>
                <p className=' mb-2 btn btn-success'>Loan Fees (if applicable):</p>
                <li>A 0.5% fee applies to all approved loans.</li>
            </div>

            <br/>
            <div className=''>
                <button
                    onClick={() => {
                        navigate('/token-bot')
                    }}
                    style={{ background: 'red', color: 'white' }}
                    className='btn'>Discover Arbitrage Opportunities</button>
            </div>

            {/* <p className='mt-5'></p>
                <BottomMessage/> */}
                <Disclimer/>
        </main>


    </section>
    );
};

export default Pricing;