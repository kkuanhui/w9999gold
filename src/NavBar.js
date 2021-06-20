
const NavBar = () => {
  return (
    <nav id="navbar" className="black-theme-block">
      {/* <img src="" alt="logo"></img> */}
      <div id="navbar-item-container" className="flex-around">

        <div className="navbar-item">
          <a href="/" className="navbar-item-link">
            黃金價格表
          </a>
        </div>

        <div className="navbar-item">
          <a href="/" className="navbar-item-link">
            聯絡我們
          </a>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
