import React, { useEffect, useRef, useState } from "react";

const AppProduct = () => {
  return (
    <div id="app-product">
      <div className="flex-center" style={{"margin": "10px", "gap": "10px", "flexDirection": "column"}}>
        <ProductOptions></ProductOptions>
        <ProducrCanvas></ProducrCanvas>
      </div>
      <ProductTotalPrice></ProductTotalPrice>
    </div>
  );
};

const ProductTotalPrice = () => {
  return (
    <div id="product-total-price">
      <div>總價</div>
      <div>$ 34,567</div>
    </div>
  )
}

const ProductOptions = () => {
  return (
    <div id="product-options">
      <ProductOption></ProductOption>
      <ProductOption></ProductOption>
      <ProductOption></ProductOption>
      <ProductOption></ProductOption>
    </div>
  )
}

const ProductOption = () => {
  return(
    <div>Option</div>
  )
}

const ProducrCanvas = () => {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 80, 80);
  })
  return (
    <div id="product-canvas">
      <canvas
        id="myCanvas"
        width="200"
        height="100"
        ref={canvasRef}
        style={{
          border: "1px solid #d3d3d3;",
          border: "solid 1px rgb(255, 30, 40)",
        }}
      ></canvas>
    </div>
  );
};

// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM

export default AppProduct;