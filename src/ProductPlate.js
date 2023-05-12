import React, { useState } from "react";
import "./static/css/product-plate.css";
import CustomView from "./CustomView";

const ProductPlate = (props) => {
  const id = "product-plate";
  const [showOverlap, setIsShowOverlap] = useState(false);
  return (
    <div id={id} style={{ width: "min(100%, 992px)", margin: "0px auto" }}>
      <div>
        <CustomView></CustomView>
        <Product
          id={`${id}-product`}
          setIsShowOverlap={setIsShowOverlap}
        ></Product>
        {/* <PartCustomer></PartCustomer> */}
      </div>
      {showOverlap ? <OverLap setIsShowOverlap={setIsShowOverlap} /> : null}
    </div>
  );
};

const Product = (props) => {
  return (
    <div
      id={props.id}
      className="d-grid mb-3"
      style={{
        padding: "0px 10px",
        justifyItems: "center",
        gridColumnGap: "5px",
        gridRowGap: "10px",
      }}
    >
      {/* <CustomItem onClick={() => props.setIsShowOverlap(true)}>樣式</CustomItem>
      <CustomItem onClick={() => props.setIsShowOverlap(true)}>尺寸</CustomItem>
      <CustomItem onClick={() => props.setIsShowOverlap(true)}>加大</CustomItem>
      <CustomItem onClick={() => props.setIsShowOverlap(true)}>裝飾</CustomItem> */}
    </div>
  );
};

const CustomItem = (props) => {
  return (
    <div className="d-flex flex-ai-center" onClick={props.onClick}>
      <div
        className="d-inline-block"
        style={{
          width: "min(15vw, 100px)",
          aspectRatio: "1/1",
          border: "1px solid #3E3E3E",
          borderRadius: "5px",
          backgroundColor: "#5E5E5E",
        }}
      ></div>
      <div className="d-inline-block" style={{ fontSize: "min(5vw, 32px)" }}>
        {props.children}
      </div>
    </div>
  );
};

const PartCustomer = () => {
  return (
    <div style={{ padding: "0px 10px", backgroundColor: "#EEEEEE" }}>
      <div>報價諮詢</div>
      <div>姓名</div>
      <div>電話</div>
      <div>email</div>
    </div>
  );
};

const OverLap = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        top: "0px",
        width: "100vw",
        height: "100vh",
        zIndex: "999",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "#333333",
          opacity: "0.5",
        }}
        onClick={() => {
          props.setIsShowOverlap(false);
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          height: "80%",
          width: "100%",
          backgroundColor: "#FFFFFF",
        }}
      >
        content
      </div>
    </div>
  );
};

export default ProductPlate;
