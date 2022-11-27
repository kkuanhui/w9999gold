import React, { useEffect, useState } from "react";
import axios from "axios";
import {filter} from "lodash";

const ProductOmori = () => {
  const [goldPrice, setGoldPrice] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [products, setProducts] = useState([]);

  const [userProduct, setUserProduct] = useState("");
  const [userWeight, setUserWeight] = useState(0);
  const [isAddText, setIsAddText] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .all([
        axios.get(`/get-gold-quote`),
        axios.get(`/list-products/A04`),
        axios.get(`/get-detail/A04`),
      ])
      .then(
        axios.spread((...res) => {
          setGoldPrice(res[0].data);
          setProducts(res[1].data);
          setProductDetails(res[2].data);
          const firstDetail = res[2].data[1];
          setUserProduct(firstDetail["product_id"]);
          setUserWeight(firstDetail["weight"]);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const details = filter(productDetails, {
      "product_id": userProduct,
    });
  }, [userProduct])

  useEffect(() => {
    const quote = goldPrice[0]?.["price_value"];
    const partGold = quote * userWeight;
    const detail = filter(productDetails, {
      "product_id": userProduct,
    });
    const partCustom = isAddText ? detail[0]?.["wage_text_custom"] : 0;
    setTotalPrice(partGold + partCustom);
  }, [userProduct, userWeight, isAddText]);


  return (
    <div>
      <h1 className="width-70 text-center">黃金御守</h1>

      <div
        className="d-grid mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "2fr 3fr" }}
      >
        <div>產品設計</div>
        <select
          value={userProduct}
          onChange={(e) => {
            setUserProduct(e.target.value);
          }}
        >
          {products.map((ele) => {
            return (
              <option value={ele["product_id"]}>{ele["show_name"]}</option>
            );
          })}
        </select>

        <div style={{}}>黃金重量</div>
        <div style={{}}>{userWeight} 錢</div>
        <div style={{}}>時價</div>
        <div style={{}} className="d-flex">
          <div>{(goldPrice[0]?.["price_value"] * userWeight).toFixed()}元</div>
        </div>

        <div style={{}}>增加文字</div>
        <div style={{}}>
          <input
            type="checkbox"
            onClick={() => setIsAddText(!isAddText)}
            checked={isAddText}
          ></input>
        </div>

        <div style={{}}>總價</div>
        <div style={{}}>
          $<span>{totalPrice.toFixed()}元</span>
        </div>
      </div>
    </div>
  );
};

export default ProductOmori;
