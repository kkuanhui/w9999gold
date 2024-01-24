import React from "react";
import Jumbotron from "./Jumbotron.js";
import GoogleMap from "./GoogleMap.js";
import Feature from "./Feature.js";

const CoverPage = () => {
  return (
    <>
      <Jumbotron />
      <Feature />
      <GoogleMap />
    </>
  );
};

export default CoverPage;