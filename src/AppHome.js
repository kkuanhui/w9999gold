import PriceBlock from './PriceBlock.js'
import React, { Fragment } from "react";
import AboutUsBlock from './AboutUsBlock'
import HomeJumbotron from './HomeJumbotron.js';

const AppHome = () => {
  return (
    <Fragment>
      <HomeJumbotron />
      <PriceBlock />
      <AboutUsBlock />
    </Fragment>
  );
};

export default AppHome