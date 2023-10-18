import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// cloudinary related package
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import "./static/css/product-cards.css"

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
      id="product-cards"
      className="d-grid"
      style={{ 
        width: "min(100%, 992px)", 
        margin: "30px auto",
        columnGap: "30px",
        rowGap: "30px",
      }}
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
    </div>
  );
};

const Card = (props) => {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "90%",
        aspectRatio: "2/3",
        margin: "0px auto",
        cursor: "pointer",
      }}
    >
      <Link to={props.linkTarget} style={{ width: "100%", height: "100%" }}>
        <div style={{ height: "70%", overflow: "hidden" }}>
          <AdvancedImage
            cldImg={props.img}
            alt="card img"
            className="img-fill"
            style={{ width: "100%", height: "100%"}}
          ></AdvancedImage>
        </div>
        <div style={{ paddingTop: "5px", height: "30%"}}>
          <div style={{ marginBottom: "5px", color: "black", fontSize: "clamp(16px, 2vw, 24px)"}}>
            {props.name}
          </div>
          <div style={{ color: "gray", fontSize: "clamp(8px, 1.5vw, 16px)"}}>
            {"酬神適用"}
          </div>
          <div style={{ color: "gray", fontSize: "clamp(8px, 1.5vw, 16px)"}}>
            {"12 種款式"}
          </div>
          <div style={{ marginTop: "5px", color: "black", fontSize: "clamp(10px, 1.8vw, 24px)"}}>
            {"$ 3,222 元起"}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCards;
