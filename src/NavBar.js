import icon from "./static/image/w9999gold-icon.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// navbar
import './static/css/navbar.css'

const NavBar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav
      id="navbar"
      className="width-100 d-flex flex-ai-center flex-jc-center"
    >
      <div className="d-flex flex-ai-center flex-jc-between pr-5 pl-5">
        <a href="/" className="d-flex">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          <span style={{ color: "#FFFFFF" }}>仕彩金飾</span>
        </a>

        <div>
          <label
            className="font-size-20"
            id="navbar-toggler-label"
            style={{ color: "#FFFFFF" }}
            htmlFor="navbar-toggler"
          >
            &#9776;
          </label>

          <input
            type="checkbox"
            id="navbar-toggler"
            checked={isChecked}
            onChange={toggleCheck}
          ></input>

          <div id="navbar-foldable">
            <div onClick={toggleCheck}></div>
            <ul>
              <li onClick={() => setIsChecked(false)}>
                <Link style={{ color: "#FFFFFF" }} to="/">
                  首頁
                </Link>
              </li>
              {/* <li onClick={toggleCheck}>
                <Link style={{color: "#FFFFFF"}} to="/about-us">關於我們</Link>
              </li> */}
              {/* <li onClick={toggleCheck}>
                <Link style={{color: "#FFFFFF"}} to="/market">黃金市價</Link>
              </li> */}
              <li onClick={() => setIsChecked(false)}>
                <Link style={{ color: "#FFFFFF" }} to="/product">
                  產品價格
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
