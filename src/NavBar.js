import icon from "./static/image/w9999gold-icon.png";
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const NavBar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <nav id="navbar" className="black-theme-block">
        <a href="/" className="navbar-block" style={{ display: "flex" }}>
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          <div>仕彩金飾</div>
        </a>

        <div className="navbar-block">
          <label id="navbar-hamburger" for="navbar-toggler">
            &#9776;
          </label>
          <input
            type="checkbox"
            id="navbar-toggler"
            checked={isChecked}
            onChange={toggleCheck}
          ></input>
          <div id="navbar-list">
            <div onClick={toggleCheck}></div>
            <ul>
              <li onClick={toggleCheck}>
                <Link to="/">首頁</Link>
              </li>
              <li onClick={toggleCheck}>
                <Link to="/about-us">關於我們</Link>
              </li>
              <li onClick={toggleCheck}>
                <Link to="/market">黃金市價</Link>
              </li>
              <li onClick={toggleCheck}>
                <Link to="/product">產品價格</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/product/*" element={<ProductPriceSummary></ProductPriceSummary>}></Route>
        </Routes>
      </div>

    </div>
  );
};

const ProductPriceSummary = () => {
  return (
    <Routes>
      <Route index></Route>
      <Route path="*" element={<div style={{ width: "100%", height: "30px", backgroundColor:"#3e4a2d"}}>summary</div>}></Route>
    </Routes>

  )
};

export default NavBar;
