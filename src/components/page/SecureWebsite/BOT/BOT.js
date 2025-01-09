import { useEffect, useState } from 'react';
import '../SecureWeb.css'
import { useNavigate } from 'react-router-dom';
import Drawer from '../Home/Drawer';
// import Arbitrage from '../../Arbitrage/Arbitrage';
import Arbitrage from '../Arbitrage/Arbitrage';
import PageTitle from '../Components/PageTitle';
import Disclimer from '../Components/Disclimer';

const BOT = () => {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    useEffect(()=>{
        window.scroll(0,0);
      } ,[])

    return (
        //         <section className='secure-body-background'>
        //         {/* <div className="secure-heading">
        //             <span className=''>BOT{" "}
        //               <i
        //                 className="ms-3 fas fa-bars"
        //                 onClick={() => setIsDrawerOpen(true)}
        //                 style={{ cursor: "pointer" }}
        //             ></i></span>
        //         </div> */}

        //  {/* Drawer */}
        //  {/* <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}

        //         <main className='container py-5'>

        //             {/* <div className=''>
        //                 <p className='mb-1'>Mission Statement:</p>
        //                 <p>Empowering crypto traders with cutting-edge technology to unlock the full potential of decentralized finance.</p>

        //                 <p className='mt-5 mb-1'>Team Section :</p>
        //                 <p>Our team comprises blockchain enthusiasts, developers, and traders committed to simplifying arbitrage for everyone.</p>


        //             </div> */}


        //         </main>


        //     </section>
        <section>
            <PageTitle title={'TOKEN BOT'}/>
            <Arbitrage/>
            
        </section>
    );
};

export default BOT;