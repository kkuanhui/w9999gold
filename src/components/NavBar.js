import icon from "../static/image/w9999gold-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const NavBar = () => {
  const [isPopup, setIsPopup] = useState(false);

  return (
    <nav id="navbar" className="black-theme-block">
      <div className="navbar-block flex-start">
        <img src={icon} alt="icon" width="50" height="24.33"></img>
        <div>仕彩金飾</div>
      </div>
      <div className="navbar-block">
        <div id="navbar-hamburger">
          <button
            onClick={() => {
              setIsPopup(!isPopup);
            }}
          >
            <GiHamburgerMenu />
          </button>
        </div>

        <div
          id="navbar-collapse"
          onClick={() => {
            setIsPopup(!isPopup);
          }}
          style={{ display: isPopup ? "block" : "none" }}
        >
          <div>
            <ul id="navbar-link-list">
              <li>
                <a>產品價格</a>
              </li>
              <li>
                <a>黃金市價</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
