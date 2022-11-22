import axios from "axios";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import {filter, keyBy} from "lodash";

const PlateDeities = (props) => {
  // const APP_ID = props["appId"]
  const APP_ID = "A01";

  const [goldPrice, setGoldPrice] = useState([]);
  const [appProducts, setAppProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [appAddons, setAppAddons] = useState([]);
  const [addonDetails, setAddonDetails] = useState([]);

  const [userProduct, setUserProduct] = useState("");
  const [userDetail, setUserDetail] = useState([])
  const [userWeight, setUserWeight] = useState(0);
  const [userSize, setUserSize] = useState(0);
  const [userIsAddImage, setUserIsAddImage] = useState(false);
  const [userAddon, setUserAddon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // request API 
  useEffect(() => {
    axios
      .all([
        axios.get(`/get-gold-quote`),
        axios.get(`/list-products/${APP_ID}`),
        axios.get(`/list-addons/${APP_ID}`),
        axios.get(`/get-detail/${APP_ID}`),
        axios.get(`/get-detail-addons/${APP_ID}`),
      ])
      .then(
        axios.spread((...res) => {
          const defaultProduct = res[1].data[0]["product_id"]
          const defaultDetail = filter(res[3].data, {"product_id": defaultProduct})
          const defaultSize = defaultDetail[0]["size"]
          const defaultWeight = defaultDetail[0]["weight_min"]
          const defaultAddon = filter(res[4].data, {"product_id": defaultSize})

          setGoldPrice(res[0].data);

          setAppProducts(res[1].data);
          setAppAddons(res[2].data);
          setProductDetails(res[3].data);
          setAddonDetails(res[4].data);

          setUserProduct(defaultProduct)
          setUserDetail(defaultDetail)
          setUserWeight(defaultWeight)
          setUserSize(defaultSize)
          setUserAddon(defaultAddon)

        })
      )
      .catch((errors) => {
        console.log(errors);
      })
  }, []);

  useEffect(() => {

  })

  return (
    <div>
      <h1 className="width-70 text-center">神明金牌</h1>

      <div
        className="d-grid grid-column-3 mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "3fr 2fr 1fr 1fr" }}
      >
        <div>金牌設計</div>
        <div>
          <select onChange={(e) => {setUserProduct(e.target.value)}}>
            {appProducts.map((ele) => {
              return (
                <option value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{ gridRow: "2" }}>金牌尺寸</div>
        <div style={{ gridRow: "2" }}>
          <select onChange={(e) => {setUserSize(e.target.value)}}>
            {filter(productDetails, {"product_id": userProduct}).map((ele) => {
              return (
                <option value={ele["size"]}>{ele["size"]}</option>
              );
            })}
          </select>
        </div>

        <div style={{ gridRow: "3" }}>黃金重量</div>
        <div style={{ gridRow: "3" }}>
          <input
            style={{ border: "solid 1px #000000" }}
            type="number"
            min="10"
            max="100"
          ></input>
        </div>
        <div style={{ gridArea: "3/3" }}>時價</div>
        <div style={{ gridArea: "3/4" }} className="d-flex">
          <div>{Number(goldPrice * 0.1).toFixed()}</div>
        </div>

        <div style={{ gridRow: "4" }}>增加照片</div>
        <div style={{ gridRow: "4" }}>
          <input type="checkbox"></input>
        </div>

        <div style={{ gridRow: "5" }}>增加外框</div>
        <div style={{ gridRow: "5" }}>
          {" "}
          <select></select>
        </div>

        <div
          style={{
            gridRow: "6/7",
            gridColumn: "1/5",
            borderTop: "1px solid #3f3f3f",
          }}
        ></div>

        <div style={{ gridRow: "7" }}>總價</div>
        <div style={{ gridRow: "7" }}>
          $<span>{totalPrice.toFixed()}</span>
        </div>
      </div>
    </div>
  );
};

export default PlateDeities;
