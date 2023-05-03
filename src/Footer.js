import React from "react";
import { FaFacebook, FaInstagram, FaLine } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import icon from "./static/image/w9999gold-icon.png";
import './static/css/footer.css'

const Footer = () => {
  return (
    <div
      id="footer"
      className="p-5"
      style={{
        backgroundColor: "black",
        minHeight: "50px",
        marginTop: "-50px",
        width: "100vw",
      }}
    >

      <div style={{width: "min(100%, 992px)", marginInline: "auto"}}>
        <div id="footer-icon" className="mb-3 font-color-white font-size-15">
          <img src={icon} alt="icon" width="50" height="24.33"></img>
          仕彩金飾
        </div>

        <div id="footer-address" className="mb-3 font-color-white">
          地址：台南市北區大興街 325 巷 34 號
          <br></br>
          電話：06-2809988
        </div>

        <div id="footer-link-bar" className="d-flex mb-3 flex-jc-around">
          <a
            href="https://www.facebook.com/w9999.cs"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/w999.9_gold/"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://lin.ee/AJet6ha"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLine />
          </a>
          <a
            href="https://goo.gl/maps/wS8wKxipcb6jkEnD9"
            className="font-size-20 font-color-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGooglemaps />
          </a>
        </div>

      </div>

      <div className="font-color-white width-100 text-center" style={{fontSize: "smaller"}}>
        2023
      </div>

    </div>
  );
};

export default Footer;