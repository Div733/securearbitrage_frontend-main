import { useEffect, useState } from 'react';
import '../SecureWeb.css';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import Drawer from '../Home/Drawer';
import PageTitle from '../Components/PageTitle';
import BottomMessage from '../Components/BottomMessage';
import Disclimer from '../Components/Disclimer';

// const faqData = [
//     {
//         question: "What is a flash loan?",
//         answer: "A flash loan is a type of loan executed and repaid within a single blockchain transaction, requiring no collateral."
//     },
//     {
//         question: "Is arbitrage risk-free?",
//         answer: "While arbitrage minimizes risks, profits depend on market conditions, fees, and transaction speed."
//     },
//     {
//         question: "Do I need coding skills to use this bot?",
//         answer: "No! Our platform is user-friendly and requires no technical expertise."
//     }
// ];
  
const faqData = [
    {
        question: "What is a flash loan?",
        answer: "A flash loan is a type of loan executed and repaid within a single blockchain transaction, requiring no collateral."
    },
    {
        question: "Is arbitrage risk-free?",
        answer: "While arbitrage minimizes risks, profits depend on market conditions, fees, and transaction speed."
    },
    {
        question: "Do I need coding skills to use this bot?",
        answer: "No! Our platform is user-friendly and requires no technical expertise."
    },
    {
        question: "What is arbitrage in the context of DEXs?",
        answer: "Arbitrage is the practice of exploiting price differences for the same asset across different decentralized exchanges to generate a profit by buying low on one exchange and selling high on another."
    },
    {
        question: "Why do price differences occur between DEXs?",
        answer: "Price differences arise due to varying liquidity pools, trading volumes, fees, and the time it takes for prices to adjust on different DEXs."
    },
    {
        question: "What are the primary types of arbitrage opportunities in DEXs?",
        answer: "Spatial arbitrage: Exploiting price differences across different DEXs. Triangular arbitrage: Exploiting price inefficiencies within a single DEX across three or more trading pairs."
    },
    {
        question: "Is arbitrage risk-free in DEXs?",
        answer: "While arbitrage aims to minimize risks, it is not entirely risk-free due to factors like slippage, transaction delays, and fluctuating gas fees."
    },
    {
        question: "What is slippage, and how does it affect arbitrage?",
        answer: "Slippage is the difference between the expected price of a trade and the actual executed price. High slippage can reduce or even negate arbitrage profits."
    },
    {
        question: "What tools can help identify arbitrage opportunities in DEXs?",
        answer: "Tools like bots, APIs (e.g., Uniswap or PancakeSwap APIs), and platforms such as 1inch or DEX aggregators can help monitor and identify arbitrage opportunities in real-time."
    },
    {
        question: "How do arbitrage bots work in DEXs?",
        answer: "Arbitrage bots scan multiple DEXs for price differences, calculate potential profits (considering fees and slippage), and execute trades automatically when profitable opportunities are detected."
    },
    {
        question: "What is flash arbitrage, and how is it executed?",
        answer: "Flash arbitrage uses flash loans to borrow funds, perform arbitrage trades, and repay the loan in the same transaction, eliminating the need for upfront capital."
    },
    {
        question: "How can liquidity pools impact arbitrage opportunities?",
        answer: "Liquidity pools with high trading volumes often have smaller price discrepancies, while low-liquidity pools are more likely to have arbitrage opportunities due to larger price deviations."
    },
    {
        question: "What role do decentralized oracles play in arbitrage?",
        answer: "Oracles provide accurate price data, helping traders assess whether arbitrage opportunities are genuine or based on temporary inaccuracies in the DEX’s pricing mechanisms."
    },
    {
        question: "What is frontrunning in arbitrage, and why is it a problem?",
        answer: "Frontrunning occurs when other traders or bots detect your arbitrage trade and execute their trades first, reducing or eliminating your profits."
    },
    {
        question: "How do gas fees impact arbitrage profitability?",
        answer: "High gas fees can make small arbitrage opportunities unprofitable, especially on blockchains like Ethereum during network congestion."
    },
    {
        question: "What is impermanent loss, and does it affect arbitrage?",
        answer: "Impermanent loss affects liquidity providers rather than arbitrage traders, but large price movements due to arbitrage can indirectly impact pool stability."
    },
    {
        question: "How does transaction speed influence arbitrage success?",
        answer: "In arbitrage, execution speed is critical because price discrepancies are quickly corrected by other traders or bots."
    },
    {
        question: "How do network-specific features impact arbitrage?",
        answer: "Networks with fast transaction times and low fees (e.g., Solana, Polygon) are often more favorable for arbitrage compared to slower, more expensive networks."
    },
    {
        question: "What is triangular arbitrage in DEXs?",
        answer: "Triangular arbitrage involves exploiting price inefficiencies within a single DEX by trading across three different pairs, such as ETH/USDT, BTC/ETH, and BTC/USDT."
    },
    {
        question: "How do stablecoins affect arbitrage?",
        answer: "Stablecoins provide a reliable base currency for arbitrage, reducing exposure to price volatility when switching between trading pairs."
    },
    {
        question: "Can arbitrage lead to market inefficiencies?",
        answer: "On the contrary, arbitrage helps reduce market inefficiencies by balancing prices across different platforms or trading pairs."
    },
    {
        question: "How do Layer-2 solutions affect arbitrage?",
        answer: "Layer-2 solutions like Arbitrum and Optimism reduce gas fees and transaction times, making arbitrage more accessible and profitable."
    },
    {
        question: "What is MEV (Miner Extractable Value), and how does it relate to arbitrage?",
        answer: "MEV refers to the profit miners or validators can extract by reordering transactions in a block. In DEX arbitrage, this can result in miners prioritizing or front-running profitable arbitrage trades."
    }
];
  
const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
     useEffect(()=>{
        window.scroll(0,0);
      } ,[])

    return (
        <section className='secure-body-background'>
            <PageTitle title={'FAQs'} />
            <main className='container py-5'>
                <div className="accordion" id="faqAccordion">
                    {faqData.map((item, index) => (
                       <div key={index} className="accordion-item mb-2">
                       <h2 className="accordion-header" id={`heading${index}`}>
                           <button
                               className={`accordion-button ${activeIndex === index ? 'text-white' : 'collapsed'}`}
                               type="button"
                               onClick={() => handleToggle(index)}
                           >
                               <span>{index + 1}. {item.question}</span>
                           </button>
                       </h2>
                       <div 
                           className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                           id={`collapse${index}`}
                       >
                           <div className="accordion-body">
                               {item.answer}
                           </div>
                       </div>
                   </div>
                    ))}
                </div>
                {/* <p className='mt-5'>

                </p>
                <BottomMessage/> */}
                <Disclimer/>
            </main>
        </section>
    );
};

export default FAQs;
