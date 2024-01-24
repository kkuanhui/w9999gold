import icon from "../static/image/w9999gold-icon.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart, CgProfile } from "react-icons/cg";
import { useApp } from "../Context";

import '../static/css/navbar.css'

const RegularNavBar = () => {
  
  const context = useApp();
  const member = context.member;
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  // RWD design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576 && isChecked) {
        setIsChecked(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // return function is withdrawal mechanism
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isChecked]);

  return (
    <nav
      id="navbar"
      className="width-100 d-flex flex-ai-center flex-jc-center"
    >
      <div className="d-flex flex-ai-center flex-jc-between pr-5 pl-5">
        <a href="/" className="d-flex flex-ai-center flex-jc-center">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          <span style={{color: "#FFFFFF"}}>仕彩金飾</span>
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

              <li onClick={toggleCheck}>
                <Link style={{color: "#FFFFFF"}} to="/gold-price-report">黃金市價</Link>
              </li>

              <li onClick={() => setIsChecked(false)}>
                <Link style={{ color: "#FFFFFF" }} to="/products">
                  客製產品
                </Link>
              </li>

              <li className="position-relative">
                <Link className="d-flex flex-ai-center flex-jc-center position-relative" 
                  style={{color: "#FFFFFF"}} to="/cart"
                >
                  <CgShoppingCart></CgShoppingCart>
                  購物車
                  <CartCount />
                </Link>
              </li>

              <li>
                <MemberIcon member={member}></MemberIcon>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MemberIcon = ({member}) => {
  return (
    <Link className="d-flex flex-ai-center flex-jc-center" 
      style={{color: "#FFF"}} to="/member"
    >
      <CgProfile />{(member.email)?member.name:"請登入"}
    </Link>
  )
}

const CartCount = () => {
  return (
    <span
      className="color-white font-bold d-flex flex-ai-center flex-jc-center"
      style={{
        width: "16px",
        height: "16px",
        fontSize: "10px",
        background: "#FF0000",
        borderRadius: "100px",
        fontFamily: "Tahoma",
      }}
    >
      0
    </span>
  );
};

export default RegularNavBar;