import ProductCanvas from './ProductCanvas'
import React, {useRef, useEffect} from "react"

const PlateGod = () => {
  return(
    <div id="app-product">
      <div className="flex-center" style={{"margin": "10px", "gap": "10px", "flexDirection": "column"}}>
        <ProductOptions></ProductOptions>
        <ProductCanvas></ProductCanvas>
      </div>
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

export default PlateGod