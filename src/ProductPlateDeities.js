import axios from "axios";
import React, {useEffect, useState, useSyncExternalStore} from "react";
import {keyBy, groupBy} from 'lodash'

const PlateDeities = (props) => {

  // const APP_ID = props["appId"]
  const APP_ID = 'A01'

  const [goldPrice, setGoldPrice] = useState({});
  const [appProducts, setAppProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [appAddons, setAppAddons] = useState([]);
  const [addonDetails, setAddonDetails] = useState([])

  const [userProduct, setUserProduct] = useState('P0101');
  const [userWeight, setUserWeight] = useState(0);
  const [userSize, setUserSize] = useState(0);
  const [userAddImage, setUserAddImage] = useState(false);
  const [userAddon, setUserAddon] = useState("")
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get(`/get-gold-quote`).then((res) => {
      setGoldPrice(res.data[0]);
    });
    axios.get(`/list-products/${APP_ID}`).then((res) => {
      setAppProducts(res.data);
    });
    axios.get(`/list-addons/${APP_ID}`).then((res) => {
      setAppAddons(res.data);
    });
    axios.get(`/get-detail/${APP_ID}`).then((res) => {
      setProductDetails(res.data)
    })
    axios.get(`/get-detail-addons/${APP_ID}`).then((res) => {
      setAddonDetails(res.data);
    });
  }, [])

  const onUserProductChange = (e) => {
    setUserProduct(e.target.value)
  }

  useEffect(() => {
    console.log(userProduct)
    const g = groupBy(productDetails, 'product_id')
    const a = g[userProduct]
    console.log(a)
    // const e = a.map(ele => {return ele["size"]})
    // console.log(e)
  }, [userProduct])

  return (
    <div>
      <h1 className="width-70 text-center">神明金牌</h1>

      <div
        className="d-grid grid-column-3 mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "3fr 2fr 1fr 1fr" }}
      >

        <div>金牌設計</div>
        <div>
          <select onChange={onUserProductChange}>
            {appProducts.map((ele) => {
              return (
                <option value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{gridRow: "2"}}>金牌尺寸</div>
        <div style={{gridRow: "2"}}>
          <select >
            {/* {productId.map((ele) => {
              return (
                <option value={ele["size"]}>{ele["size"]}</option>
              );
            })} */}
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
          <input type="checkbox"  ></input>
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
