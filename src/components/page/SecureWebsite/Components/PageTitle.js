import React from 'react';

const PageTitle = ({ title }) => {
    return (
        <div className="container container-bot">
            <p className="secure-arbitrage">
                <span className='fw-bold'>{title}</span>
            </p>
        </div>
    );
};

export default PageTitle;