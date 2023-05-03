import React, { Fragment } from "react";
import HomeJumbotron from "./HomeJumbotron.js";
import HomeMap from "./HomeMap.js";
import HomeFeature from "./HomeFeature.js";
// import { Link } from "react-router-dom";

const AppHome = () => {
  return (
    <Fragment>
      <HomeJumbotron />
      {/* <HomePriceBlock /> */}
      {/* <div className="ml-auto mr-auto width-50 d-flex flex-ai-center flex-jc-center p-5 " style={{"border": "3px solid #0da100", "borderRadius": "10px"}}>
        <Link to="/product">
          <div className="font-size-15 font-bold">
            看產品價格！
          </div>
        </Link>
      </div> */}
      <HomeFeature />
      <HomeMap />
    </Fragment>
  );
};

export default AppHome;
