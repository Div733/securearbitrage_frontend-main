import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
// import Arbitrage from '../../Arbitrage/Arbitrage';
import About from '../AbotUs/AboutUs';
import ContactUs from '../ContactUs/ContactUs';
import Home from '../Home/Home';
import BOT from '../BOT/BOT';
import Pricing from '../Pricing/Pricing';
import HowItWorks from '../HowItWorks/HowItWorks';
import FAQs from '../FAQs/FAQs';
import AppNavbar from '../Components/Navbar';
import PastOppertunities from '../PastOppertunities/PastOppertunities';
// import PastOpportunitiesBsc from '../PastOpportunitiesBsc/PastOpportunitiesBsc';
import PastOpportunitiesBsc from '../PastOppertunitiesBsc/PastOppertunitiesBsc';
import AutoBOT from '../AutoBOT/AutoBOT';
// import SignIn from '../SignIn/SignIn';
// import BottomMessage from '../Components/BottomMessage';
import TokenPairChecker from '../Components/TokenPairChecker';
import DashBoard from '../DashBoard/DashBoard';
import OpportunityBot from '../OpportunityBot/OpportunityBot';
import OpportunityBotTest from '../OpportunityBotTest/OpportunityBotTest';
import Footer from '../Components/Footer';

// import Navbar from '../Components/Navbar';

const SecureLayout = () => {
    return (
        <div>
            <AppNavbar/>
            <div className='secureArbitrage-font' style={{}}>
            <Outlet />
            </div>
            

            <Routes>
                {/* <Route path='arbii' element={<Arbitrage />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/token-bot" element={<BOT />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/past-opportunities" element={<PastOppertunities />} />
                <Route path="/usdtswapsonbsc" element={<PastOpportunitiesBsc/>} />
                <Route path="/auto-bot" element={<AutoBOT />} />
                {/* <Route path="/wallet-login" element={<SignIn />} /> */}
                <Route path="/demo-pair" element={<TokenPairChecker />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/opportunity-bot" element={<OpportunityBot/>} />
                <Route path="/opportunity-bot-test" element={<OpportunityBotTest/>} />
            </Routes>

            <Footer/>
        </div>
    );
};

export default SecureLayout;