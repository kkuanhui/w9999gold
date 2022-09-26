import PriceBlock from './PriceBlock.js'
import React, { Fragment } from "react";
import AboutUsBlock from './AboutUsBlock'

const AppHome = () => {
  return (
    <Fragment>
      <PriceBlock />
      <AboutUsBlock />
    </Fragment>
  );
};

export default AppHome