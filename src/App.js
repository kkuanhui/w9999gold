import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

import AppHome from "./AppHome";
import AppMarket from "./AppMarket"
import AppAboutUs from "./AppAboutUs"
import AppProduct from './AppProduct'

const App = () => {
  return (
    <Fragment>
      <div id="main-content">
        <Router>
        <NavBar />
          <Routes>

            <Route exact path="/" element={<AppHome />}></Route>

            <Route path="/market" element={<AppMarket />}> </Route>

            <Route path="/about-us" element={<AppAboutUs/>}> </Route>

            <Route path="/product/*" element={<AppProduct />}> </Route>


          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default App;