import React, {useRef, useEffect} from "react"

// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM
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

export default ProductCanvas;