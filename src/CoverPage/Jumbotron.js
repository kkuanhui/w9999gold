import React from "react";
import image from "../static/image/background-loop.png";
import instagrom from "../static/image/instagram.png";
import facebook from "../static/image/facebook.png";
import line from "../static/image/line.png";
import plateFrame from "../static/image/plate-frame.png";
// css -----
import '../static/css/jumbotron.css'

const Jumbotron = () => {

  return (

    <div
      id="jumbotron"
      className="mb-5"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div
        className="d-flex flex-ai-center flex-jc-around"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50px",
        }}
      >
        <div id="jumbotron-info">
          <h1>
            三十年老店，<br></br>最懂您
          </h1>
          <h2>
            純金回收保證，<br></br>最安心
          </h2>
          <div
            className="width-100 d-flex flex-jc-start flex-ai-center"
            style={{ gap: "10%" }}
          >
            <a
              href="https://google.com"
              target="blank"
              style={{ width: "10%" }}
            >
              <img
                alt="SNS icon"
                src={facebook}
                style={{ width: "100%" }}
              ></img>
            </a>
            <a
              href="https://google.com"
              target="blank"
              style={{ width: "10%" }}
            >
              <img
                alt="SNS icon"
                src={instagrom}
                style={{ width: "100%" }}
              ></img>
            </a>
            <a
              href="https://google.com"
              target="blank"
              style={{ width: "10%" }}
            >
              <img alt="SNS icon" src={line} style={{ width: "100%" }}></img>
            </a>
          </div>
          <div style={{ color: "rgb(30,30,30)" }}>電話：（06）2809988</div>
          <div style={{ color: "rgb(30,30,30)" }}>地址：台南市北區大興街 325 巷 34 號</div>
        </div>

        <div id="jumbotron-image">
          <img alt="product" src={plateFrame} style={{width: "100%"}}></img>
        </div>

      </div>

    </div>
  );
};

export default Jumbotron;