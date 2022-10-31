import React from "react"

const PlateDeities = () => {
  return(
      <div className="flex-center" style={{"margin": "10px", "gap": "10px", "flexDirection": "column"}}>
        <div id="product-options">

          <div className="product-attr-choice">
            <div>金牌設計</div>
            <select>
              <option value="E3456">龍鳳龍鳳</option>
              <option value="E3456">雙龍搶珠</option>
            </select>
          </div>

          <div className="product-attr-choice">
            <div>金牌尺寸</div>
            <select>
              <option value="E3456">2 寸</option>
              <option value="E3456">2 寸</option>
            </select>
          </div>

          <div className="product-attr-choice">
            <div>
              <div>黃金重量</div>
              <select>
                <option value="E3456">1 錢</option>
                <option value="E3456">2 錢</option>
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
  )
}

export default PlateDeities;