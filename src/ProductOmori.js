import axios from "axios"
import React, {useRef, useEffect, useState} from "react"

const ProductOmori = () => {

  const [goldPrice, setGoldPrice] = useState([])
  const [productList, setProductList] = useState([])

  let fifteenCheck = 0

  setInterval(() => {
    fifteenCheck++    
  }, 1000*60*7)

  useEffect(() => {
    axios.get(`/quote-gold-price`)
    .then((res) => {
      setGoldPrice(res.data)
    })
  }, fifteenCheck)

  useEffect(() => {
    axios.get(`get-detail/A04/P0401`)
    .then(res => {
      setProductList(res.data)
    })
  }, [])

  return (
    <div>
      <h1>
        黃金御守
      </h1>
      <div
        className="flex-center"
        style={{ margin: "10px", gap: "10px", flexDirection: "column" }}
      >
        <div id="product-options">
          <div className="product-attr-choice">
            <div>御守設計</div>
          </div>

          <div className="product-attr-choice">
            <div>
              <div>黃金重量</div>
              <div >0.1</div>
            </div>
            <div className="extend-text">
              <div>時價</div>
              <div>3,650</div>
            </div>
          </div>

          <div className="product-attr-choice">
            <div>增加文字</div>
            <input type="checkbox"></input>
          </div>

        </div>
      </div>

    </div>
  );
}


// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM

export default ProductOmori;