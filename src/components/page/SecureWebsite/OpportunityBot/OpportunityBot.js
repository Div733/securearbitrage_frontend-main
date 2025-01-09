import React from "react";
import PageTitle from "../Components/PageTitle";
import Oppertuinity from "../Home/Oppertuinity";
import Disclimer from "../Components/Disclimer";
import OppertuinityTest from "../Home/OppertunityTest";

const OpportunityBot = () => {
  return (
    <section className="secure-body-background">
      <PageTitle title={"OPPORTUNITY BOT"} />

      <main className="container pb-5">
        <OppertuinityTest />
        <Disclimer />
      </main>
    </section>
  );
};

export default OpportunityBot;
