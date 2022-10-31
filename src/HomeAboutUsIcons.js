import React from "react";

const AboutUsIcons = () => {
  return (
    <div id="about-us-icons" className="flex-around">
      <AboutUsIcon
        pageUrl="https://www.facebook.com/w9999.cs"
        brickName="facebook"
        iconUrl="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
      ></AboutUsIcon>

      <AboutUsIcon
        pageUrl="https://www.instagram.com/w999.9_gold/"
        brickName="instagram"
        iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
      ></AboutUsIcon>

      <AboutUsIcon
        pageUrl="https://lin.ee/AJet6ha"
        brickName="line"
        iconUrl="https://www.newsmarket.com.tw/herbcides/files/2017/05/line-icon.png"
      ></AboutUsIcon>
    </div>
  );
};

const AboutUsIcon = (props) => {
  const { brickName, iconUrl, pageUrl } = props;
  return (
    <div className="about-us-icon flex-center">
      <button>
        <a
          href={pageUrl}
          className="footer-icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={iconUrl} alt={brickName} width="100" height="100"></img>
        </a>
      </button>
    </div>
  );
};

export default AboutUsIcons;
