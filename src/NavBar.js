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
        <div className="navbr-block">
          <label id="navbar-hamburger" htmlFor="navbar-toggler">
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

    </div>
  );
};

export default NavBar;
