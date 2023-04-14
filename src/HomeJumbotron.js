import React from "react";
import image from './static/image/background-loop.png'
import instagrom from './static/image/instagram.png'
import facebook from './static/image/facebook.png'
import line from './static/image/line.png'
import plateFrame from './static/image/plate-frame.png'


const HomeJumbotron = (props) => {
  return (
    <div className="width-100" style={{paddingTop: "50%", position: "relative", backgroundImage: `url(${image})`}}>
      <div className="width-80 p-5 height-70 d-flex flex-ai-center flex-jc-center" style={{backgroundColor: "rgba(255, 255, 255, 0.7)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: "50px", gap: "50px"}}>
        <div>
          <h1 className="font-size-30">三十年老店，<br></br>最懂您</h1>
          <div>純金回收保證，<br></br>最安心</div>
          <div className="d-flex flex-jc-start flex-ai-center" style={{gap: "10px"}}>
            <a href="https://google.com" target="blank"><img alt="SNS icon" src={facebook} width="30" height="30"></img></a>
            <a href="https://google.com" target="blank"><img alt="SNS icon" src={instagrom} width="30" height="30"></img></a>
            <a href="https://google.com" target="blank"><img alt="SNS icon" src={line} width="30" height="30"></img></a>
          </div>
          <div className="" style={{color: "#595959"}}>電話：（06）2809988</div>
          <div className="" style={{color: "#595959"}}>地址：台南市北區大興街 325 巷 34 號</div>
        </div>
        <div>
          <img alt="product" src={plateFrame} width={300} height={300}></img>
        </div>
      </div>

    </div>
  );
};

export default HomeJumbotron;
