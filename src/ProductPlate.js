import React, { useState } from "react";
import "./static/css/product-plate.css";

const ProductPlate = (props) => {
  const id = "product-plate";
  const [showOverlap, setIsShowOverlap] = useState(true)

  return (
    <div id={id} style={{ width: "min(100%, 992px)", margin: "0px auto" }}>
      <div>
        <View></View>
        <Product id={`${id}-product`}></Product>
        {/* <PartCustomer></PartCustomer> */}
        {(showOverlap)?<OverLap />: null}
      </div>
    </div>
  );
};

const View = () => {
  return (
    <div
      className="mb-3"
      style={{
        width: "100%",
        height: "min(100vw, 500px)",
        backgroundColor: "#DDDDDD",
      }}
    ></div>
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
      <CustomItem>樣式</CustomItem>
      <CustomItem>尺寸</CustomItem>
      <CustomItem>加大</CustomItem>
      <CustomItem>裝飾</CustomItem>
    </div>
  );
};

const CustomItem = (props) => {
  return (
    <div className="d-flex flex-ai-center">
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
      <div className="d-inline-block" style={{ fontSize: "min(10vw, 32px)" }}>
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

const OverLap = () => {
  return (
      <div style={{position: "fixed", left: "0px", top: "0px", width: "100vw", height: "100vh"}}>
        <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "#333333", opacity: "0.5", zIndex: "1"}}></div>
        <div style={{position: "absolute", color: "orange", zIndex: "3"}}>fjwoiefjoiwfio</div>
      </div>
  )
}

export default ProductPlate;
