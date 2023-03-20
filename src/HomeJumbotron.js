import React from "react";
// import image from './static/image/j-1.jpg'


const HomeJumbotron = (props) => {
  return (
    <div className="width-100" style={{paddingTop: "50%", position: "relative", backgroundColor: "#F9F9F9"}}>
      <div className="p-5" style={{backgroundColor: "#E9E9E9", position: "absolute", top: "10%", left: "10%"}}>
        <h1>三十年老店，<br></br>最懂您</h1>
        <div>純金回收保證，<br></br>最安心</div>
        <div className="d-flex flex-jc-around flex-ai-center">
          <div><img alt="SNS icon" width="30" height="30"></img></div>
          <div><img alt="SNS icon" width="30" height="30"></img></div>
          <div><img alt="SNS icon" width="30" height="30"></img></div>
        </div>
        <div className="" style={{fontSize: "0.7em", color: "#595959"}}>jqwoifjoijwqfo</div>
        <div className="" style={{fontSize: "0.7em", color: "#595959"}}>wiofjowejfoiwjeo</div>
      </div>

    </div>
  );
};

export default HomeJumbotron;
