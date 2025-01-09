import { useNavigate } from 'react-router-dom';
import '../SecureWeb.css'
import { useEffect, useState } from 'react';
import Drawer from '../Home/Drawer';
import PageTitle from '../Components/PageTitle';
import BottomMessage from '../Components/BottomMessage';
import TokenPairChecker from '../Components/TokenPairChecker';
import Disclimer from '../Components/Disclimer';

const AboutUs = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
     useEffect(()=>{
        window.scroll(0,0);
      } ,[])

    return (
        <section className='secure-body-background'>
        {/* <div className="secure-heading">
            <span className=''>ABOUT US{" "}
              <i
                className="ms-3 fas fa-bars"
                onClick={() => setIsDrawerOpen(true)}
                style={{ cursor: "pointer" }}
            ></i></span>
        </div> */}
        <PageTitle title={'ABOUT US'}/>

        {/* Drawer */}
        {/* <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
        <main className='container py-5'>

            <div className=''>
                <button className='btn btn-success mb-2'>Mission Statement:</button>
                <p>Empowering crypto traders with cutting-edge technology to unlock the full potential of decentralized finance.</p>
                 <br/>
                <button className=' btn btn-success mb-2'>Team Section :</button>
                <p>Our team comprises blockchain enthusiasts, developers, and traders committed to simplifying arbitrage for everyone.</p>

                
            </div>

            {/* <TokenPairChecker/> */}

            {/* <div className='mt-5'>
                <button
                    style={{ background: 'red', color: 'white' }}
                    className='btn'>Discover Arbitrage Opportunities</button>
            </div> */}
            {/* <p className='mt-5'></p>
            <BottomMessage/> */}
            <Disclimer/>
        </main>


    </section>
    );
};

export default AboutUs;