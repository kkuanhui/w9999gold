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

export default PriceIntro;
