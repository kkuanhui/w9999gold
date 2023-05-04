import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// cloudinary related package
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";

const ProductCards = (props) => {
  const [apps, setApps] = useState([]);
  const imgRootDirectory = "w9999gold/product/";
  // w9999gold/product/goldfan/image03_er5qne.png
  const imgs = {
    plate_creativity: new CloudinaryImage(
      `${imgRootDirectory}plate_creativity/image13_itgglb`,
      { cloudName: "hbehita9k" }
    ),
    plate_deities: new CloudinaryImage(
      `${imgRootDirectory}plate_deities/image08_bsdav1`,
      { cloudName: "hbehita9k" }
    ),
    goldfan: new CloudinaryImage(`${imgRootDirectory}/goldfan/image03_er5qne`, {
      cloudName: "hbehita9k",
    }),
    omori: new CloudinaryImage(`${imgRootDirectory}/omori/image01_uvmf2a`, {
      cloudName: "hbehita9k",
    }),
  };

  useEffect(() => {
    axios.get(`/list-apps`).then((res) => {
      setApps(res.data);
    });
  }, []);

  return (
    <div
      className="d-flex flex-jc-around flex-ai-center flex-wrap"
      style={{ width: "min(100%, 992px)", margin: "30px auto" }}
    >
      {apps.map((ele, idx) => {
        return (
          <Card
            key={idx}
            linkTarget={ele["english_name"]}
            name={ele["show_name"]}
            img={imgs[ele["english_name"]]}
          ></Card>
        );
      })}
      <div style={{ visiablity: "hidden" }}></div>
      <div style={{ visiablity: "hidden" }}></div>
      <div style={{ visiablity: "hidden" }}></div>
    </div>
  );
};

const Card = (props) => {
  return (
    <div
      style={{
        borderRadius: "30px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid rgb(200, 200, 200)",
        overflow: "hidden",
        height: "300px",
        width: "200px",
        cursor: "pointer",
        flex: "0 0 auto"
      }}
    >
      <Link to={props.linkTarget} style={{ width: "100%", height: "100%" }}>
        <div
          className=""
          style={{
            height: "60%",
            overflow: "hidden",
          }}
        >
          {/* <AdvancedImage
            cldImg={props.img}
            alt="card img"
            className="img-cover"
            style={{ width: "100%" }}
          ></AdvancedImage> */}
        </div>
        <div style={{ color: "black", fontSize: "clamp(16px, 3vw, 32px)", height: "40%" }}>
          {props.name}
        </div>
      </Link>
    </div>
  );
};

export default ProductCards;
