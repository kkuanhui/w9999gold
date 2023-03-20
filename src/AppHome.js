import React, { Fragment } from "react";
import HomeJumbotron from "./HomeJumbotron.js";
import HomePriceBlock from "./HomePriceBlock.js";
import HomeAboutUsBlock from "./HomeAboutUsBlock.js";
import HomeIntro from "./HomeIntro.js";
import { Link } from "react-router-dom";

const AppHome = () => {
  return (
    <Fragment>
      <HomeJumbotron />
      <HomePriceBlock />
      <div className="ml-auto mr-auto width-50 d-flex flex-ai-center flex-jc-center p-5 " style={{"border": "3px solid #0da100", "borderRadius": "10px"}}>
        <Link to="/product">
          <div className="font-size-15 font-bold">
            看產品價格！
          </div>
        </Link>
      </div>
      <HomeAboutUsBlock />
      <HomeIntro />
    </Fragment>
  );
};

export default AppHome;
