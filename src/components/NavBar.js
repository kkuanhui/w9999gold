import icon from "../static/image/w9999gold-icon.png";

const NavBar = () => {
  return (
    <nav id="navbar" className="black-theme-block">

      <div id="navbar-items-start" className="flex-start">
        <div className="navbar-item">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
        </div>
        <div className="navbar-item">
          <div className="navbar-item-link">仕彩金飾</div>
        </div>
      </div>

      <div id="navbar-items-second">
        <div className="navbar-item">
          <div className="navbar-item-link">
            <button onClick={() => {console.log('click')}}>icon</button>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default NavBar;
