import axios from "axios";
import React, { useEffect, useState } from "react";

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
        console.log(res.data[0]["price_value"])
        const resultText = currencyFormat(res.data[0]["price_value"]);
        setFuturePrice(resultText);
      })
      .catch((err) => console.log("Something goes wrong.\n", err));
  }, []);

  return (
    <div id="price-intro">

      <div id="price-intro-show-block">
        <div id="price-intro-title">
          即時黃金條塊價格
        </div>
        <div id="gold-show-section">
          <span id="gold-future-price">{futurePrice}</span>
          <span className="gold-future-price-text">NTD/一錢</span>
          <div className="gold-future-price-text">臺灣時間：{currentTime()}</div>
        </div>
      </div>

    </div>
  );
};

export default PriceIntro;
