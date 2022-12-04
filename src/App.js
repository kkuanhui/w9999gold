import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

import AppHome from "./AppHome";
import AppAbout from "./AppAbout";
import AppProduct from "./AppProduct";

const App = () => {
  return (
    <Fragment>
      <div id="main-content">
        <Router>
          <NavBar />
          <Routes>
            <Route index element={<AppHome />}></Route>
            <Route path="/about-us" element={<AppAbout />}></Route>
            <Route path="/product/*" element={<AppProduct />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default App;
