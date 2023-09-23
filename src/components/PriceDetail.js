import React, { useState, useEffect } from "react";
import Flickity from "react-flickity-component";
import "../static/css/flickity.css";
import PriceTable from "./PriceTable";
import axios from "axios";

// import axios from 'axios';

const PriceDetail = () => {
  const flickityOptions = {
    initialIndex: 0,
    wrapAround: true,
    pageDots: false,
  };


  let oData = [
    {
      futurePrice: 0,
      initialWeight: 0.2,
      maxWeight: 5,
      sizeCM: "6 × 4.8",
      sizeTraditional: "2寸",
      wage: 2400,
    },
    {
      futurePrice: 0,
      initialWeight: 0.25,
      maxWeight: 5,
      sizeCM: "8 × 6.5",
      sizeTraditional: "2.65寸",
      wage: 2650,
    },
    {
      futurePrice: 0,
      initialWeight: 0.3,
      maxWeight: "Infinity",
      sizeCM: "9 × 7",
      sizeTraditional: "3寸",
      wage: 3000,
    },
    {
      futurePrice: 0,
      initialWeight: 0.8,
      maxWeight: "Infinity",
      sizeCM: "12 × 9.5",
      sizeTraditional: "4寸",
      wage: 4000,
    },
    {
      futurePrice: 0,
      initialWeight: 1.5,
      maxWeight: "Infinity",
      sizeCM: "15 × 12",
      sizeTraditional: "5寸",
      wage: 5400,
    },
    {
      futurePrice: 0,
      initialWeight: 2.5,
      maxWeight: "Infinity",
      sizeCM: "18 × 13.5",
      sizeTraditional: "6寸",
      wage: 7200,
    },
    {
      futurePrice: 0,
      initialWeight: 4,
      maxWeight: "Infinity",
      sizeCM: "21 × 17",
      sizeTraditional: "7寸",
      wage: 9900,
    },
    {
      futurePrice: 0,
      initialWeight: 5,
      maxWeight: "Infinity",
      sizeCM: "24.5 × 19.5",
      sizeTraditional: "8寸",
      wage: 13200,
    },
    {
      futurePrice: 0,
      initialWeight: 6,
      maxWeight: "Infinity",
      sizeCM: "27 × 21.5",
      sizeTraditional: "9寸",
      wage: 16000,
    },
    {
      futurePrice: 0,
      initialWeight: 8,
      maxWeight: "Infinity",
      sizeCM: "30 × 24",
      sizeTraditional: "1尺",
      wage: 20200,
    },
    {
      futurePrice: 0,
      initialWeight: 15,
      maxWeight: "Infinity",
      sizeCM: "33 × 27",
      sizeTraditional: "1.1尺",
      wage: 25900,
    },
    {
      futurePrice: 0,
      initialWeight: 20,
      maxWeight: "Infinity",
      sizeCM: "37 × 29",
      sizeTraditional: "1.2尺",
      wage: 31600,
    },
    {
      futurePrice: 0,
      initialWeight: 25,
      maxWeight: "Infinity",
      sizeCM: "39 × 30",
      sizeTraditional: "1.3尺",
      wage: 37300,
    },
    {
      futurePrice: 0,
      initialWeight: 30,
      maxWeight: "Infinity",
      sizeCM: "42 × 30",
      sizeTraditional: "1.4尺",
      wage: 41200,
    },
    {
      futurePrice: 0,
      initialWeight: 35,
      maxWeight: "Infinity",
      sizeCM: "45 × 30",
      sizeTraditional: "1.5尺",
      wage: 44900,
    },
  ];

  const [future, setFuture] = useState(0)

  useEffect(() => {
    axios
      .get("https://express-psql-backend.herokuapp.com/get-gold-quote")
      .then((res) => {
        const p = res.data[0]["price_value"]
        setFuture(p)
      })
      .catch((err) => console.log("Something goes wrong.\n", err));
  }, []);

  return (
    <div id="price-detail">
      <Flickity
        id={""}
        className={"price-detail-element"} // default ''
        style={{}}
        elementType={"div"} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {
          // React require loop item must contains key. So I have to add index on each one.
          oData.map((item, idx) => {
            return (
              <PriceTable
                key={idx}
                futurePrice={future}
                sizeTraditional={item.sizeTraditional}
                sizeCM={item.sizeCM}
                initialWeight={Number(item.initialWeight)}
                maxWeight={item.maxWeight}
                wage={item.wage}
              />
            );
          })
        }
      </Flickity>

      <div id="price-detail-info" className="price-detail-element">
        <p>以上表格僅顯示常規產品參考價格，更大尺寸歡迎詢問。</p>
        <p>部分尺寸或重量會增加少許工錢。</p>
        <p>最終售價以本公司專員報價為準。</p>
      </div>
    </div>
  );
};

export default PriceDetail;
