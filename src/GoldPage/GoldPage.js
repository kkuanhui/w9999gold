import React, { useEffect, useState } from "react";
import axios from "axios";

const GoldPage = () => {
  return (
    <div id="app-gold" style={{}}>
      <div>
        <PriceIntro></PriceIntro>
        {/* <PriceChart></PriceChart> */}
      </div>
      <div className="p-5" style={{width: "min(100%, 768px)", margin: "0px auto"}}>
        <h1 className="mb-2" style={{fontSize: "max(24px, 2vw)"}}>仕彩黃金價格</h1>
        <div>
          <div className="mb-2">
            金牌、獎牌中黃金價格部分完全與市場連動，所以產品售出總價隨黃金市場價格浮動。 
          </div>
          <div className="mb-2">
            仕彩產品黃金皆可要求仕彩回收，回收價為黃金當下市價九折。
          </div>
          <div className="mb-2">
            舉例：王先生在購買產品時黃金市價 6000(錢)，後由仕彩回購時市價 5900(錢)，則以此價格九折進行回購。
          </div>
        </div>
      </div>
    </div>
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
    <div className="width-100" style={{backgroundColor: "#EEEEEE"}}>
      <div className="p-5" style={{width: "min(100%, 768px)", margin: "0px auto" }}>
        <h1 style={{fontSize: "max(32px, 3vw)"}}>即時金價</h1>
        <div>
          <div style={{fontSize: "max(24px, 2vw)"}}><span className="font-bold" style={{color: "#009b2e"}}>{futurePrice} </span><span className="font-size-smaller">NTD/一錢</span></div>
          <div style={{fontSize: "smaller"}}>臺灣時間：{currentTime()}</div>
        </div>
      </div>
    </div>
  );
};

export default GoldPage;