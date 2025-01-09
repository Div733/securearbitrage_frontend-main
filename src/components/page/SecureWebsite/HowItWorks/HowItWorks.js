import { useNavigate } from 'react-router-dom';
import '../SecureWeb.css'
import Drawer from '../Home/Drawer';
import { useEffect, useState } from 'react';
import PageTitle from '../Components/PageTitle';
import BottomMessage from '../Components/BottomMessage';
import Disclimer from '../Components/Disclimer';

const processSteps = [
    {
        step: 1,
        title: "Identify Arbitrage Opportunity",
        description: "The system continuously monitors multiple decentralized exchanges (DEXs) to detect real-time price discrepancies."
    },
    {
        step: 2,
        title: "Secure Funding",
        description: [
            "Using Own Funds: Allocate the necessary capital from your wallet to fund the trade.",
            "Using a Loan: Access a temporary loan (such as a flash loan) to finance the trade, ensuring repayment is completed within the same transaction."
        ]
    },
    {
        step: 3,
        title: "Trade Execution",
        description: "Capitalize on the price difference by purchasing the asset at a lower price on one exchange and selling it at a higher price on another—all in a single transaction."
    },
    {
        step: 4,
        title: "Profit Capture",
        description: "Once the trade is complete, deduct any loan repayment (if applicable), and the remaining profits are credited directly to your wallet."
    }
];


const HowItWorks = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
     useEffect(()=>{
        window.scroll(0,0);
      } ,[])

    return (
        <section className='secure-body-background'>
            <PageTitle title={'HOW IT WORKS'}/>
            {/* Drawer */}
            {/* <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
            <main className='container py-2 pb-5'>

                <div className='mt-5'>
                    <button className='btn btn-success mb-2'>Step-by-Step Process for Using Own Funds or a Loan:</button>
                    <div>
                        <ul className="custom-list">
                            {processSteps?.map((item, i) => (
                                <li key={i}>
                                    <p style={{color: '#F0A500'}}>{item?.step}. {item?.title}:</p>
                                    {Array.isArray(item?.description) ? (
                                        <ul>
                                            {item?.description.map((desc, j) => (
                                                <li key={j}>{desc}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span> {item?.description}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='mt-5'>
                    <button
                        onClick={() => {
                            navigate('/token-bot')
                        }}
                        style={{ background: 'red', color: 'white' }}
                        className='btn'>Learn More About Arbitrage</button>
                </div>
            
                {/* <p className='mt-5'></p>
                <BottomMessage/> */}
                <Disclimer/>
            </main>


        </section>
    );
};

export default HowItWorks;