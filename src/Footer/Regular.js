import React from "react";
import icon from "../static/image/w9999gold-icon.png";
import googleMap from "../static/image/google.png";
import facebook from "../static/image/facebook.png";
import line from "../static/image/line.png";
import instagram from "../static/image/instagram.png";
import '../static/css/footer.css'

const Regular = () => {

  return (
    <div className="width-100" style={{ minHeight: "150px" }}>

      <div style={{width: "min(100%, 992px)", marginInline: "auto"}}>

        <div className="mb-3 font-color-white font-size-15">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          仕彩金飾
        </div>

        <div className="mb-3 font-color-white width-60 mr-auto ml-auto">
          地址：台南市北區大興街 325 巷 34 號
          <br></br>
          電話：06-2809988
        </div>

        <div className="d-flex mb-3 flex-jc-around width-60 mr-auto ml-auto" style={{gap: "5px"}}>
          <a
            href="https://www.facebook.com/w9999.cs"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="facebook icon"/>
          </a>
          <a
            href="https://www.instagram.com/w999.9_gold/"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="instagram icon"/>
          </a>
          <a
            href="https://lin.ee/AJet6ha"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={line} alt="line icon"/>
          </a>
          <a
            href="https://goo.gl/maps/wS8wKxipcb6jkEnD9"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={googleMap} alt="google maps icon"/>
          </a>

        </div>

      </div>

      <div className="font-color-white width-100 text-center mt-5 pb-1" 
        style={{fontSize: "smaller"}}
      >
        仕彩金飾 2024
      </div>

    </div>
  );
};

export default Regular;