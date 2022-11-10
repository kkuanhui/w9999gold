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
    axios.get(``)
  }, [])

  return (
    <div
      className="flex-center"
      style={{ margin: "10px", gap: "10px", flexDirection: "column" }}
    >
      <div id="product-options">
        <div className="product-attr-choice">
          <div>金牌設計</div>
          <select>
          </select>
        </div>

        <div className="product-attr-choice">
          <div>金牌尺寸</div>
          <select>
          </select>
        </div>

        <div className="product-attr-choice">
          <div>
            <div>黃金重量</div>
            <select>
              {dataProductDetail.map((ele) => {
                return (
                  <option value={ele.weight_min}>{ele.weight_min} 錢</option>
                );
              })}
            </select>
          </div>
          <div className="extend-text">
            <div>時價</div>
            <div>3,650</div>
          </div>
        </div>

        <div className="product-attr-choice">
          <div>增加照片</div>
          <input type="checkbox"></input>
        </div>

        <div className="product-attr-choice">
          <div>增加外框</div>
          <select>
            <option value="E3456">龍鳳搶珠</option>
            <option value="E3456">雙龍雙龍</option>
          </select>
        </div>
      </div>
    </div>
  );
}


// We are using useRef to manipulate <canvas> in React.js.
// 我只要先宣告一個空的 useRef()，然後當成 dom 上 ref attribute 的值，這時候再元件任何地方印出 canvasRef.current 就會是這個 DOM

export default ProductOmori;