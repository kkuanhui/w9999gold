import React, { useRef, useEffect, useState } from "react";

const ProductPlateRegular = () => {
  return (
    <div>
      <h1>創意金牌</h1>
      <div
        className="flex-center"
        style={{ margin: "10px", gap: "10px", flexDirection: "column" }}
      >
      </div>
    </div>
  );
};

// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM

export default ProductPlateRegular;
