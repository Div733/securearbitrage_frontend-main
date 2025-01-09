import React from 'react';
import PageTitle from '../Components/PageTitle';
import Disclimer from '../Components/Disclimer';
import OppertuinityTest from '../Home/OppertunityTest';

const OpportunityBotTest = () => {
    return (
        <section className='secure-body-background'>
            <PageTitle title={'OPPORTUNITY BOT TEST'} />

            <main className='container pb-5'>
                <OppertuinityTest/>
                <Disclimer/>
            </main>
        </section>
    );
};

export default OpportunityBotTest;