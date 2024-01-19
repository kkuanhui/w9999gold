import icon from "../static/image/w9999gold-icon.png";
import React, { useEffect, useState } from "react";
import { Link, Navigate} from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useApp } from "../Context";

import '../static/css/navbar.css'

const RegularNavBar = () => {
  
  const context = useApp();
  const memberInfo = context.memberInfo;
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  // this is generated by ChatGPT
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 576 && isChecked) {
        setIsChecked(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isChecked]);

  return (
    <nav
      id="navbar"
      className="width-100 d-flex flex-ai-center flex-jc-center"
      style={{background: "#696969"}}
    >
      <div className="d-flex flex-ai-center flex-jc-between pr-5 pl-5">
        <Link to="/backstage" className="d-flex">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          <span style={{color: "#FFFFFF"}}>後台管理</span>
        </Link>

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
                <Link style={{ color: "#FFFFFF" }} to="/backstage/main">
                  首頁管理
                </Link>
              </li>

              <li onClick={toggleCheck}>
                <Link style={{color: "#FFFFFF"}} to="/backstage/gold">金價管理</Link>
              </li>

              <li onClick={() => setIsChecked(false)}>
                <Link style={{ color: "#FFFFFF" }} to="/backstage/products">
                  產品管理
                </Link>
              </li>

              <li onClick={() => setIsChecked(false)}>
                <Link style={{ color: "#FFFFFF" }} to="/backstage/shopping-cart">
                  訂單管理
                </Link>
              </li>

              <li>
                <MemberIcon memberInfo={memberInfo}></MemberIcon>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MemberIcon = ({memberInfo}) => {
  if(memberInfo.email){
    return (
      <Link style={{color: "#fff"}} to="/backstage">
        <CgProfile />{memberInfo.name}
      </Link>
    )
  }else{
    return (
      <Navigate to="/" replace={true} />
    )
  }
}

export default RegularNavBar;