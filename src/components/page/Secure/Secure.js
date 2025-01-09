import React from 'react';
import { Link } from 'react-router-dom';

const Secure = () => {
    return (
        <section style={{minHeight: '100vh', color: 'black', background: '#F8F9FA'}}>
            <div className='d-flex gap-4 justify-content-center text-decoration-none' style={{textDecoration: 'none', color: 'black', paddingTop: '40px'}}>
                <Link style={{textDecoration: 'none', color: 'black'}} 
                to='/secure/arbitrage'>Arbitrage   </Link>
                <Link style={{textDecoration: 'none', color: 'black'}} to='/secure/opportunities'>Opportunities</Link>
            </div>
        </section>
    );
};

export default Secure;