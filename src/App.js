import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";
import AppProduct, {AppProductCalculater} from "./AppProduct.js";
import AppAboutUs from "./AppAboutUs.js"
import AppHome from "./AppHome";


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

            <Route path="/prodcut" element={<AppProduct />}> </Route>
            <Route path="/plate-god" element={<AppProductCalculater />}></Route>
            <Route path="/plate-regular" element={<AppProductCalculater />}></Route>
            <Route path="/medal" element={<AppProductCalculater />}></Route>
            <Route path="/gold" element={<AppProductCalculater />}></Route>



          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default App;