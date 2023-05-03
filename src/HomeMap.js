import React from "react";
// import "./static/css/home-map.css";

const HomeMap = () => {
  return (
    <div
      className="mb-5"
      style={{
        width: "min(100vw, 992px)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.38639307441!2d120.18426621496748!3d23.009580884959604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e7770ccc851f9%3A0x4f069bca9cd9a8e2!2z5LuV5b2pdzk5OS4557SU6YeR56We5piO6YeR54mM!5e0!3m2!1sen!2stw!4v1639315427849!5m2!1sen!2stw"
        className="width-100"
        style={{height: "min(100vw, 300px)"}}
        // allowFullScreen={true}
        loading="lazy"
        title="shop-google-map"
      ></iframe>

      <div style={{fontSize: "clamp(16px, 5vw, 32px)"}}>
        臺南市北區大興街 325 巷 34 號 <br></br>
        營業時間：平日 9:00～19:00 <br></br>
        晚上其他時間可預約 <br></br>
        電話：062587755 <br></br>
        手機：0916968547 <br></br>
      </div>
    </div>
  );
};

export default HomeMap;