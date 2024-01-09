import React from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { Link } from "react-router-dom";
import "../static/css/product.css";
import ProductsProvider, { useProducts } from "./Context"
import { Route, Routes } from "react-router-dom";
import SingleType from "./SingleType"

const Products = () => {
  return (
    <ProductsProvider>
      <ProductsContent />
    </ProductsProvider>
  );
};

export default Products;

const ProductsContent = () => {
  return (
    <Routes>
      <Route index element={<Entry />}></Route>
      <Route path=":productType" element={<SingleType />}></Route>
    </Routes>
  );
};

const Entry = () => {
  const products = useProducts();
  const types = products.types;
  return(
    <div
      id="product-cards"
      className="d-grid"
      style={{
        width: "min(100%, 992px)",
        margin: "30px auto",
        columngap: "30px",
        rowgap: "30px",
      }}
    >
      {types.map((types, idx) => {
        return <Card key={idx} type={types} />;
      })}
    </div>
  )
}

const Card = ({ type }) => {
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

  return (
    <Link
      to={`${type.eName}`} 
      style={{
        overflow: "hidden",
        width: "90%",
        aspectRatio: "2/3",
        margin: "0px auto",
        cursor: "pointer",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
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
            style={{
              marginBottom: "5px",
              color: "black",
              fontSize: "clamp(16px, 2vw, 24px)",
            }}
          >
            {type.title}
          </div>
          <div style={{ color: "gray", fontSize: "clamp(8px, 1.5vw, 16px)" }}>
            {type.subtitle}
          </div>
          <div style={{ color: "gray", fontSize: "clamp(8px, 1.5vw, 16px)" }}>
            {`${type.shapes} 種款式`}
          </div>
          <div
            style={{
              marginTop: "5px",
              color: "black",
              fontSize: "clamp(10px, 1.8vw, 24px)",
            }}
          >
            {`$ ${type.priceStart} 元起`}
          </div>
        </div>
      </div>
    </Link>
  );
};