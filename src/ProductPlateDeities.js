import React from "react";

const dataProducts = [
  { name: "金鎖", id: "1" },
  { name: "金鎖壽框", id: "2" },
  { name: "金吉祥", id: "3" },
  { name: "金書卷", id: "4" },
  { name: "金元寶", id: "5" },
  { name: "金方圓", id: "6" },
  { name: "金三角", id: "7" },
  { name: "金獅", id: "8" },
  { name: "金桃喜", id: "9" }
];

const dataProductDetail = [
  {
    product_name: "金鎖",
    size: 2,
    weight_min: 0.2,
    weight_max: null,
    wage_basic: 2400,
    wage_image: 200
  },
  {
    product_name: "金鎖",
    size: 2.65,
    weight_min: 0.25,
    weight_max: null,
    wage_basic: 2650,
    wage_image: 200
  }
];

const PlateDeities = () => {
  return (
    <div
      className="flex-center"
      style={{ margin: "10px", gap: "10px", flexDirection: "column" }}
    >
      <div id="product-options">
        <div className="product-attr-choice">
          <div>金牌設計</div>
          <select>
            {dataProducts.map((ele) => {
              return <option value={ele.id}>{ele.name}</option>;
            })}
          </select>
        </div>

        <div className="product-attr-choice">
          <div>金牌尺寸</div>
          <select>
            {dataProductDetail.map((ele) => {
              return <option value={ele.size}>{ele.size} 寸</option>;
            })}
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
};

export default PlateDeities;
