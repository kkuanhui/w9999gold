import React, { useEffect, useRef, useState } from "react";

const AppProduct = () => {
  return (
    <div id="app-product">
      <div className="flex-center" style={{"margin": "10px", "gap": "10px", "flexDirection": "column"}}>
        <ProductOptions></ProductOptions>
        <ProductCanvas></ProductCanvas>
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
      <div className="flex-start">
        <div>金牌設計</div>
        <select>
          <option value="E3456">龍鳳龍鳳</option>
          <option value="E3456">雙龍搶珠</option>
        </select>
      </div>
      <div className="flex-start">
        <div>金牌尺寸</div>
        <select>
          <option value="E3456">2 寸</option>
          <option value="E3456">2 寸</option>
        </select>
      </div>
      <div className="flex-start">
        <div>黃金重量</div>
        <select>
          <option value="E3456">2 寸</option>
          <option value="E3456">2 寸</option>
        </select>
        <div>時價</div>
        <div>3,650</div>
      </div>
      <div className="flex-start">
        <div>增加照片</div>
        <input type="checkbox"></input>
      </div>
      <div className="flex-start">
        <div>增加外框</div>
          <select>
            <option value="E3456">龍鳳搶珠</option>
            <option value="E3456">雙龍雙龍</option>
          </select>
      </div>
    </div>
  )
}

const ProductCanvas = () => {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    const bw=300;
    const bh=300;
    const p=0;
    (function(){
      for (var x = 0; x <= bw; x += 10) {
          ctx.moveTo(0.5 + x + p, p);
          ctx.lineTo(0.5 + x + p, bh + p);
      }
      for (var x = 0; x <= bh; x += 10) {
          ctx.moveTo(p, 0.5 + x + p);
          ctx.lineTo(bw + p, 0.5 + x + p);
      }
      ctx.strokeStyle = "rgba(150, 150, 150, 0.3)";
      ctx.stroke();
    }())

  })
  return (
    <div id="product-canvas">
      <canvas
        id="myCanvas"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM

export default AppProduct;