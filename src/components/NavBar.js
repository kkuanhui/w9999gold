import icon from "../static/image/w9999gold-icon.png";

const NavBar = () => {
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
        <input type="checkbox" id="navbar-toggler"></input>
        <div id="navbar-list">
          <ul>
            <li>
              <a href="/price">產品價格</a>
            </li>
            <li>
              <a href="/market">黃金市價</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
