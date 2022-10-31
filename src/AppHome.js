import React, { Fragment } from "react";
import HomeJumbotron from './HomeJumbotron.js';
import HomePriceBlock from './HomePriceBlock.js'
import HomeAboutUsBlock from './HomeAboutUsBlock.js'

const AppHome = () => {
  return (
    <Fragment>
      <HomeJumbotron />
      <HomePriceBlock />
      <HomeAboutUsBlock />
    </Fragment>
  );
};

export default AppHome