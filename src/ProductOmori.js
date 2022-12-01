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
    <div className="p-5 mr-auto ml-auto" style={{"width": "clamp(0px, 100%, 600px"}}>
      <h1 className="width-70 text-center font-size-30">黃金御守</h1>

      <div className="product-green-border p-5 mb-3">

        <h1 className="font-size-20">御守本體規格</h1>

        <div className="d-flex flex-ai-center flex-jc-between width-80 ml-auto mr-auto">
          <div className="font-bold font-size-15">御守設計</div>
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
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 mr-auto ml-auto flex-wrap">
          <div className="font-bold font-size-15" style={{"flex": "1 1 50%"}}>黃金重量</div>
          <div style={{"flex": "1 1 50%"}}>{userWeight} 錢</div>
          <div style={{"flex": "1 1 50%"}}>時價</div>
          <div style={{"flex": "1 1 50%"}} className="d-flex">
            <div>{(goldPrice[0]?.["price_value"] * userWeight).toFixed()}元</div>
          </div>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 mr-auto ml-auto">
          <div className="font-bold font-size-15">增加文字</div>
          <input
            type="checkbox"
            onClick={() => setIsAddText(!isAddText)}
            checked={isAddText}
          ></input>
        </div>

      </div>
        

        <div className="mb-3">
          <div className="seperate-line width-100"></div>
          <div className="d-flex flex-ai-center flex-jc-between mr-auto ml-auto width-70">
            <div className="font-size-20 font-bold">總價</div>
            <div className="font-size-20 font-bold">
              $<span>{totalPrice.toFixed()}元</span>
            </div>
          </div>
        </div>

    </div>
  );
};

export default ProductOmori;
