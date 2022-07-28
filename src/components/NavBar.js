import icon from "../static/image/w9999gold-icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <nav id="navbar" className="black-theme-block">
      <div className="navbar-block" style={{ display: "flex" }}>
        <img src={icon} alt="icon" width="50" height="24.33"></img>
        <div>仕彩金飾</div>
      </div>

      <div className="navbar-block">
        <label id="navbar-hamburger" for="navbar-toggler">
          &#9776;
        </label>
        <input
          type="checkbox"
          id="navbar-toggler"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        ></input>
        <div id="navbar-list">
          <div onClick={() => setIsChecked(!isChecked)}></div>
          <ul>
            <li onClick={() => setIsChecked(!isChecked)}>
              <Link to="/">首頁</Link>
            </li>
            <li onClick={() => setIsChecked(!isChecked)}>
              <Link to="/price">產品價格</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
