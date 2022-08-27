import React from "react";
import Banner from "../components/Banner";
import CoinsTable from "../../app/components/CoinsTable";

const Homepage = () => {
  return (
    <React.Fragment>
      <Banner />
      <CoinsTable />
    </React.Fragment>
  );
};

export default Homepage;
