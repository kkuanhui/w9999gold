import React from 'react';
import { FaFacebook, FaInstagram, FaLine } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';
import icon from "./static/image/w9999gold-icon.png";


const Footer = () => {
    return (
        <div id="footer" 
          className="
          black-theme-block 
          p-5
          width-100 
          d-flex 
          flex-ai-start 
          flex-jc-center 
          flex-direction-column
          "
          style={{"gap": "5px"}}
        >

          <div className='width-80 mr-auto ml-auto font-color-white font-size-15'>
            <img src={icon} alt="icon" width="50" height="24.33"></img>
            仕彩金飾
          </div>

          <div className='width-80 mr-auto ml-auto'>
            <div className='font-color-white'>
              地址：台南市北區大興街 325 巷 34 號
            </div>
            <div className='font-color-white'>
              電話：06-2809988
            </div>
          </div>

          <div className='d-flex flex-ai-center flex-jc-around width-80 ml-auto mr-auto'> 
              <a href="https://www.facebook.com/w9999.cs" className="footer-icon-link font-size-20" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/w999.9_gold/" className="footer-icon-link font-size-20" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> 
              </a>
              <a href="https://lin.ee/AJet6ha" className="footer-icon-link font-size-20" target="_blank" rel="noopener noreferrer">
                <FaLine />
              </a>
              <a href="https://goo.gl/maps/wS8wKxipcb6jkEnD9" className="footer-icon-link font-size-20" target="_blank" rel="noopener noreferrer">
                <SiGooglemaps />
              </a>
          </div>

        </div>
    )
}

export default Footer;