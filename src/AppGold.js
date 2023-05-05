import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const AppGold = () => {
  return (
    <Fragment>
      <PriceIntro />
      {/* <PriceChart></PriceChart> */}
      <h1 style={{width: "min(100%, 768px)"}}>仕彩黃金價格</h1>
      <div style={{width: "min(100%, 768px)"}}>
        <div>
          金牌、獎牌中黃金價格部分完全與市場連動，所以產品售出總價隨黃金市場價格浮動。 
        </div>
        <div>
          仕彩產品黃金皆可要求仕彩回收，回收價為黃金當下市價九折。
        </div>
        <div>
          舉例：王先生在購買產品時黃金市價 6000(錢)，後由仕彩回購時市價 5900(錢)，則以此價格九折進行回購。
        </div>
      </div>
    </Fragment>
  );
};

const PriceIntro = () => {
  const currencyFormat = (num) => {
    return `${num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  };

  const currentTime = () => {
    const dObj = new Date();
    const time = dObj.toLocaleString("zh-TW", { timezone: "Asia/Taipei" });
    return time;
  };

  const [futurePrice, setFuturePrice] = useState([]);

  useEffect(() => {
    axios
      .get("/get-gold-quote")
      .then((res) => {
        const resultText = currencyFormat(res.data[0]["price_value"]);
        setFuturePrice(resultText);
      })
      .catch((err) => console.log("Something goes wrong.\n", err));
  }, []);

  return (
    <div className="d-flex flex-direction-column flex-ai-center flex-jc-around" style={{
      "flex": "1 1 auto",
      "margin": "10px",
      "height": "200px",
    }}>

      <div id="price-intro-show-block">
        <div id="price-intro-title" className="width-100" style={{
        marginBottom: "10%"
        }}>
          即時黃金條塊價格
        </div>
        <div className="width-100">
          <span>{futurePrice}</span>
          <span className="">NTD/一錢</span>
          <div className="">臺灣時間：{currentTime()}</div>
        </div>
      </div>

    </div>
  );
};

// const PriceChart = () => {
//   return()
// }

export default AppGold;