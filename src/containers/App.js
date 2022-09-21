import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AppProduct, {AppProductCalculater} from "../components/AppProduct.js";
import AboutUsBlock from "./AboutUsBlock";
import AppAboutUs from "./AppAboutUs.js"
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
            <Route path="/price" element={<AppProduct />}> </Route>
            <Route path="/about-us" element={<AppAboutUs/>}> </Route>
            <Route path="/relief-plate" element={<AppProductCalculater />}></Route>
            <Route path="/gold" element={<AppProductCalculater />}></Route>
            <Route path="/p3" element={<AppProductCalculater />}></Route>
            <Route path="/p4" element={<AppProductCalculater />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default App;