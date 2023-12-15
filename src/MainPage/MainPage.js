import React from "react";
import Jumbotron from "./Jumbotron.js";
import GoogleMap from "./GoogleMap.js";
import Feature from "./Feature.js";

const MainPage = () => {
  return (
    <>
      <Jumbotron />
      <Feature />
      <GoogleMap />
    </>
  );
};

export default MainPage;