import { Link } from "react-router-dom";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { useApp } from "../Context";
import "../static/css/products.css";

const Entry = () => {
  const context = useApp();
  const types = context.productTypes;
  return(
    <div id="entry">
      {
        types.map((types, idx) => {
          return <Card key={idx} type={types} />;
        })
      }
    </div>
  )
}

const Card = ({ type }) => {
  const imgRootDirectory = "w9999gold/product/";
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

  return (
    <Link
      to={`custom/${type.eName}`} 
      style={{
        overflow: "hidden",
        width: "90%",
        aspectRatio: "2/3",
        margin: "0px auto",
        cursor: "pointer",
      }}
    >
      <div className="card" style={{ width: "100%", height: "100%" }}>

        <div style={{ height: "70%", overflow: "hidden" }}>
          <AdvancedImage
            cldImg={imgs[type.eName]}
            alt="card img"
            className="img-fill"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        
        <div style={{ paddingTop: "5px", height: "30%" }}>
          <div
            className="title"
            style={{
              marginBottom: "5px",
              color: "black",
            }}
          >
            {type.title}
          </div>
          <div 
            className="subtitle"
            style={{ color: "gray"}}>
            {type.subtitle}
          </div>
          <div 
            className="subtitle"
            style={{ color: "gray"}}>
            {`${type.shapes} 種款式`}
          </div>
          <div
            className="price"
            style={{
              marginTop: "5px",
              color: "black",
            }}
          >
            {`$ ${type.priceMin} 元起`}
          </div>
        </div>

      </div>
    </Link>
  );
};

export default Entry;