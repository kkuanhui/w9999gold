import axios from "axios";
import React, { useRef, useEffect, useState } from "react";

const ProductOmori = () => {
  const [goldPrice, setGoldPrice] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isCustom, setIsCustom] = useState(false);
  const [productId, setProductId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const requestGoldPrice = () => {
    axios.get(`/get-gold-quote`).then((res) => {
      setGoldPrice(res.data[0]["price_value"]);
    });
    setTimeout(requestGoldPrice, 1000 * 60 * 5)
  }
  useEffect(requestGoldPrice, []);

  useEffect(() => {
    axios.get(`/list-products/A04`).then((res) => {
      setProductList(res.data);
    });
  }, []);

  useEffect(() => {
    const customFee = isCustom? productId["wage_text_custom"]: 0
    const goldFee = goldPrice * 0.1
    console.log(customFee, goldFee)
    setTotalPrice(goldFee + customFee)
  }, [isCustom, goldPrice, productId])


  const handleChange = (event) => {
    axios.get(`/get-detail/A04/${event.target.value}`).then((res) => {
      setProductId(res.data[0]);
      console.log(res.data[0])
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`/get-detail/A04/P0401`).then((res) => {
      setProductId(res.data[0]);
      console.log(res.data[0])
    })
  }, [])

  const handleChecked = () => {
    setIsCustom(!isCustom)
  }

  return (
    <div>
      <h1 className="width-70 text-center">OMORI</h1>

      <div
        className="d-grid grid-column-3 mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "3fr 2fr 1fr 1fr" }}
      >

        <div>御守設計</div>
        <div>
          <select onChange={handleChange}>
            {productList.map((ele) => {
              return (
                <option value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{ gridRow: "2" }}>黃金重量</div>
        <div style={{ gridRow: "2" }}>0.1 錢</div>
        <div style={{gridArea: "2/3"}}>時價</div>
        <div style={{ gridArea: "2/4" }} className="d-flex">
          <div>{Number(goldPrice * 0.1).toFixed()}</div>
        </div>

        <div style={{ gridRow: "3" }}>增加文字</div>
        <div style={{ gridRow: "3" }}>
          <input type="checkbox" onClick={handleChecked} checked={isCustom}></input>
        </div>

        <div style={{ gridArea: "4/1/5/5", borderTop: "1px solid #3f3f3f"}}></div>

        <div style={{ gridRow: "5" }}>總價</div>
        <div style={{ gridRow: "5" }}>$<span>{totalPrice.toFixed()}</span></div>

      </div>
    </div>
  );
};

export default ProductOmori;
