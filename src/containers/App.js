import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AboutUsBlock from "./AboutUsBlock";
import PriceBlock from "./PriceBlock.js";

const Home = () => {
  return (
    <Fragment>
      <PriceBlock />
      <AboutUsBlock />
    </Fragment>
  );
};

const App = () => {
  return (
    <Fragment>
      <div id="main-content">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default App;
