import { FaFacebook, FaInstagram, FaLine } from 'react-icons/fa';


const Footer = () => {
    return (
        <div id="footer" className="flex-center black-theme-block">
          <div style={{"width": "40%", "margin": "auto"}} className="flex-around">

              <div className="flex-icon-block">
                <a href="https://www.facebook.com/w9999.cs" className="footer-icon-link" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              </div>

              <div className="flex-icon-block">
                <a href="https://www.instagram.com/w999.9_gold/" className="footer-icon-link" target="_blank" rel="noopener noreferrer">
                 <FaInstagram /> 
                </a>
              </div>

              <div className="flex-icon-block">
                <a href="https://lin.ee/AJet6ha" className="footer-icon-link" target="_blank" rel="noopener noreferrer">
                  <FaLine />
                </a>
              </div>

          </div>
        </div>
    )
}

export default Footer;
