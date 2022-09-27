import React, {useRef, useEffect, useState} from "react"

const PlateDeities = () => {
  return(
      <div className="flex-center" style={{"margin": "10px", "gap": "10px", "flexDirection": "column"}}>
        <PlateOptions></PlateOptions>
        <PlateCanvas></PlateCanvas>
      </div>
  )
}

const PlateOptions = () => {
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

// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM
const PlateCanvas = () => {

  const canvasRef = useRef()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect()
    let isPainting = false
    const positionStart = (e) => {
      isPainting = true
      draw(e)
    }
    const positionFinish = () => {
      isPainting = false
      ctx.beginPath()
    }
    const draw = (e) => {
      if(!isPainting) return;
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      ctx.lineTo(
        (e.clientX - rect.left)/(rect.right - rect.left)* canvas.width, 
        (e.clientY - rect.top)/(rect.bottom - rect.top)* canvas.height
      )
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(
        (e.clientX - rect.left)/(rect.right - rect.left)* canvas.width, 
        (e.clientY - rect.top)/(rect.bottom - rect.top)* canvas.height
      )
    }
    canvas.addEventListener('mousedown', positionStart)
    canvas.addEventListener('mouseup', positionFinish)
    canvas.addEventListener('mousemove', draw)
    window.addEventListener('resize', setWindowWidth)
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

export default PlateDeities