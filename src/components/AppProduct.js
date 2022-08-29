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
        <select style={{"backgroundColor":"#CCC888"}}>
          <option value="E3456">雙龍搶珠</option>
        </select>
      </div>
      <div className="flex-center">
        <div>金牌尺寸</div>
        <select style={{"backgroundColor":"#CCC888"}}>
          <option value="3">3寸</option>
        </select>
      </div>
      <div className="flex-center">
        <div>黃金重量</div>
        <select style={{"backgroundColor":"#CCC888"}}>
          <option value="3">3寸</option>
        </select>
        <div>時價</div>
        <div>＄3,650</div>
      </div>
      <div className="flex-center">
        <label>增加照片</label>
        <input type="checkbox"></input>
      </div>
      <div className="flex-center">
        <div>增加外框</div>
        <select style={{"backgroundColor": "#CCC999"}}><option value="34">心型</option></select>
      </div>
    </div>
  )
}

const ProductCanvas = () => {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(10, 50, 80, 30);
    const bw=400;
    const bh=400;
    const p=10;
    function drawBoardGrid(){
      for (var x = 0; x <= bw; x += 40) {
          ctx.moveTo(0.5 + x + p, p);
          ctx.lineTo(0.5 + x + p, bh + p);
      }
  
      for (var x = 0; x <= bh; x += 40) {
          ctx.moveTo(p, 0.5 + x + p);
          ctx.lineTo(bw + p, 0.5 + x + p);
      }
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
    drawBoardGrid()

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