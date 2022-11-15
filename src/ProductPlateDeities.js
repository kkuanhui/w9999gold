import axios from "axios";
import React, {useEffect, useState} from "react";
import {keyBy} from 'lodash'

const PlateDeities = () => {

  const [goldPrice, setGoldPrice] = useState([]);
  const [productList, setProductList] = useState([]);
  const [size, setSize] = useState('2')
  const [isCustom, setIsCustom] = useState(false);
  const [productId, setProductId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [wageBasic, setWageBasic] = useState(0);

  const requestGoldPrice = () => {
    axios.get(`/get-gold-quote`).then((res) => {
      setGoldPrice(res.data[0]["price_value"]);
    });
    setTimeout(requestGoldPrice, 1000 * 60 * 5)
  }
  useEffect(requestGoldPrice, []);

  const handelSizeChange = (event) => {
    setSize(event.target.value)
    const keyBySize = keyBy(productId, 'size')
    setWageBasic(keyBySize[event.target.value]["wage_basic"])
  }

  useEffect(() => {
    axios.get(`/list-products/A01`).then((res) => {
      setProductList(res.data);
    });
  }, []);

  useEffect(() => {
    const keyBySize = keyBy(productId, "size")
    const customFee = isCustom? keyBySize[size]["wage_image"]: 0
    const goldFee = goldPrice * 0.1
    setTotalPrice(goldFee + customFee + wageBasic)
  }, [isCustom, goldPrice, productId, size])


  const handleChange = (event) => {
    axios.get(`/get-detail/A01/${event.target.value}`).then((res) => {
      setProductId(res.data);
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`/get-detail/A01/P0102`).then((res) => {
      setProductId(res.data);
      console.log(res.data)
    })
  }, [])

  const handleChecked = () => {
    setIsCustom(!isCustom)
  }

  return (

    <div>
      <h1 className="width-70 text-center">神明金牌</h1>

      <div
        className="d-grid grid-column-3 mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "3fr 2fr 1fr 1fr" }}
      >

        <div>金牌設計</div>
        <div>
          <select onChange={handleChange}>
            {productList.map((ele) => {
              return (
                <option value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{gridRow: "2"}}>金牌尺寸</div>
        <div style={{gridRow: "2"}}>
          <select onChange={handelSizeChange}>
            {productId.map((ele) => {
              return (
                <option value={ele["size"]}>{ele["size"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{ gridRow: "3" }}>黃金重量</div>
        <div style={{ gridRow: "3" }}>0.1 錢</div>
        <div style={{gridArea: "3/3"}}>時價</div>
        <div style={{ gridArea: "3/4" }} className="d-flex">
          <div>{Number(goldPrice * 0.1).toFixed()}</div>
        </div>


        <div style={{ gridRow: "4" }}>增加照片</div>
        <div style={{ gridRow: "4" }}>
          <input type="checkbox" onClick={handleChecked} checked={isCustom}></input>
        </div>

        <div style={{ gridRow: "5" }}>增加外框</div>
        <div style={{ gridRow: "5" }}> <select></select>
        </div>

        <div style={{ gridRow: "6/7", gridColumn: "1/5", borderTop: "1px solid #3f3f3f"}}></div>

        <div style={{ gridRow: "7" }}>總價</div>
        <div style={{ gridRow: "7" }}>$<span>{totalPrice.toFixed()}</span></div>

      </div>
    </div>

  );
};

export default PlateDeities;
