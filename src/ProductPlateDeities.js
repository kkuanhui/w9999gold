import axios from "axios";
import React, { useEffect, useState } from "react";
import { filter, uniqBy } from "lodash";

const PlateDeities = (props) => {
  // const APP_ID = props["appId"]
  const APP_ID = "A01";

  const [goldPrice, setGoldPrice] = useState([]);
  const [appProducts, setAppProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [addonDetails, setAddonDetais] = useState([])

  const [userProduct, setUserProduct] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [userWeight, setUserWeight] = useState(0);
  const [weightInt, setWeightInt] = useState([]);
  const [userSize, setUserSize] = useState(0);
  const [userIsAddImage, setUserIsAddImage] = useState(false);
  const [userIsAddon, setUserIsAddon] = useState(false);

  const [addonPartWage, setAddonPartWage] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0);

  // request API
  useEffect(() => {
    axios
      .all([
        axios.get(`/get-gold-quote`),
        axios.get(`/list-products/${APP_ID}`),
        axios.get(`/get-detail/${APP_ID}`),
        axios.get(`/get-detail-addons/${APP_ID}`)
      ])
      .then(
        axios.spread((...res) => {
          setGoldPrice(res[0].data);
          setAppProducts(res[1].data);
          setProductDetails(res[2].data);
          setAddonDetais(res[3].data)

          const defaultProduct = res[1].data[0]["product_id"];
          const defaultDetail = filter(res[2].data, {
            product_id: defaultProduct,
          });
          const defaultSize = defaultDetail[0]["size"];
          const defaultWeight = defaultDetail[0]["weight_min"];

          setUserProduct(defaultProduct);
          setUserDetail(defaultDetail);
          setUserWeight(defaultWeight);
          setUserSize(defaultSize);
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  // when product is chenged
  useEffect(() => {
    const detail = filter(productDetails, { product_id: userProduct });
    setUserDetail(detail);
    const weightMin = detail["0"]?.["weight_min"];
    const weightMax = detail["0"]?.["weight_max"];
    setUserWeight(weightMin);
    setWeightInt([weightMin, weightMax]);
    const sizeMin = detail["0"]?.["size"];
    // This is relative new syntax called option chaining.
    setUserSize(sizeMin);
    setUserIsAddImage(false);
  }, [userProduct, productDetails]);

  // when plate size(userSize) is changed
  useEffect(() => {
    const detail = filter(userDetail, { size: Number(userSize) });
    const weightMin = detail["0"]?.["weight_min"];
    const weightMax = detail["0"]?.["weight_max"];
    setUserWeight(weightMin);
    setWeightInt([weightMin, weightMax]);
    setUserIsAddImage(false);
    if((userSize+2)>10){setUserIsAddon(false)}
  }, [userSize]);

  // check is weight in interval
  const handleWeightChange = (v) => {
    const input = Number(v)
    const min = weightInt[0]
    const max = (!weightInt[1])?Infinity:weightInt[1]
    if(input < min){
      setUserWeight(min)
    }else if(input > max){
      setUserWeight(max)
    }else{
      setUserWeight(input)
    }
  }

  // set total price when anything is chenged
  useEffect(() => {
    // main part
    const goldValue = userWeight * goldPrice["0"]?.["price_value"];
    const wageBasic = filter(userDetail, { size: userSize })["0"]?.[
      "wage_basic"
    ];
    const wageImage = filter(userDetail, { size: userSize })["0"]?.[
      "wage_image"
    ];
    const addImageWage = userIsAddImage ? Number(wageImage) : 0;
    const mainPart = goldValue + wageBasic + addImageWage;
    setTotalPrice(mainPart+addonPartWage);
  }, [
    goldPrice,
    userDetail,
    userProduct,
    userSize,
    userWeight,
    userIsAddImage,
    userIsAddon,
    addonPartWage,
  ]);

  const onIsAddonClick = () => {
    setUserIsAddon(!userIsAddon)
    if(!userIsAddon === false){setAddonPartWage(0)}
  }

  return (
    <div className="p-5">
      <h1 className="width-70 text-center font-size-30">神明金牌</h1>

      <div className="product-green-border p-5">

        <h1 className="font-size-20">金牌本體的規格</h1>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3">
          <div className="font-bold font-size-15">金牌設計</div>
          <select
            onChange={(e) => {
              setUserProduct(e.target.value);
            }}
          >
            {appProducts.map((ele) => {
              return (
                <option value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3">
          <div className="font-bold font-size-15">金牌尺寸</div>
          <select
            value={userSize}
            onChange={(e) => {
              setUserSize(Number(e.target.value));
            }}
          >
            {userDetail.map((ele) => {
              return <option value={ele["size"]}>{ele["size"]}</option>;
            })}
          </select>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 flex-wrap">
          <div className="font-bold font-size-15" style={{"flex": "1 1 50%"}}>黃金重量</div>
          <div className="d-flex flex-direction-row" style={{"border": "1px solid black", "borderRadius": "10px"}}>
            <button className="pl-3 pr-3" onClick={() => handleWeightChange((userWeight-0.1).toFixed(2))}>-</button>
            <div className="d-flex flex-ai-center flex-jc-center" style={{"border": "1px solid black", "borderStyle": "none solid"}}>
              <input
                className="width-100 height-100 text-center"
                type="number"
                value={userWeight}
                min={weightInt[0]}
                max={weightInt[1]}
                onChange={(e) => handleWeightChange(e.target.value)}
              ></input>
            </div>
            <button className="pl-3 pr-3" onClick={() => handleWeightChange((userWeight+0.1).toFixed(2))}>+</button>
          </div>
          <div style={{"flex": "1 1 50%"}}>時價</div>
          <div style={{"flex": "1 1 50%"}}>
            {(
              Number(goldPrice["0"]?.["price_value"]) * Number(userWeight)
            ).toFixed()}
          </div>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3">
          <div className="font-size-15 font-bold">增加照片</div>
          <input
            className="font-bold font-size-15"
            type="checkbox"
            checked={userIsAddImage}
            onClick={() => {
              setUserIsAddImage(!userIsAddImage);
            }}
          ></input>
        </div>

      </div>

      <div className="product-golden-border p-5">
        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3">
          <div className="font-size-15 font-bold">金喜加大</div>
          <input
            type="checkbox"
            disabled={((userSize+2)>10)?true:false}
            checked={userIsAddon}
            onClick={onIsAddonClick}
          ></input>
        </div>

        {
          ((userSize+2)>10)?<div style={{"color": "red"}}>無法再加外框</div>:null
        }

        {
          (userIsAddon)?
            <AddonPart 
              addonDetails={addonDetails} 
              plateSize={userSize} 
              setAddonPartWage={setAddonPartWage}>
            </AddonPart>
          :null
        }
      </div>

      <div>
        <div className="seperate-line width-100"></div>
        <div>總價</div>
        <div>
          $<span>{totalPrice.toFixed()}</span>
        </div>
      </div>



    </div>
  );
};

const AddonPart = (props) => {
  const { plateSize, setAddonPartWage, addonDetails} = props;

  const [userAddonSize, setUserAddonSize] = useState(0);
  const [userAddon, setUserAddon] = useState("");
  const [userAddonIsAddImage, setUserAddonIsAddImage] = useState(false);

  useEffect(() => {
    const detailUnderSize = filter(addonDetails, function(e){return e["size"] >= plateSize + 2})
    setUserAddonSize(detailUnderSize[0]?.["size"])
    setUserAddon(detailUnderSize[0]?.["addon_id"])
  }, []);

  useEffect(() => {
    const detail = filter(addonDetails, {"addon_id": userAddon, "size": userAddonSize})
    const wageImage = (userAddonIsAddImage)?detail[0]?.["wage_image"]:0
    const wageBasic = detail[0]?.["wage_basic"]
    setAddonPartWage(wageImage+wageBasic)
  }, 
  [
    userAddonSize, 
    userAddon, 
    userAddonIsAddImage
  ]);

  return (
    <div>
      <div>外框尺寸</div>
      <div>
        <select
          onChange={(e) => setUserAddonSize(Number(e.target.value))}
          value={userAddonSize}
        >
          {uniqBy(
            filter(addonDetails, function (e) {
              return e["size"] >= plateSize + 2;
            }),
            "size"
          ).map((ele) => (
            <option value={ele["size"]}>{ele["size"]}</option>
          ))}
        </select>
      </div>

      <div>外框設計</div>
      <div>
        <select
          value={userAddon}
          onChange={(e) => {
            setUserAddon(e.target.value);
          }}
        >
          {uniqBy(
            filter(addonDetails, { size: userAddonSize }),
            "addon_id"
          ).map((ele) => (
            <option value={ele["addon_id"]}>{ele["show_name"]}</option>
          ))}
        </select>
      </div>

      <div>外框加圖</div>
      <div>
        <input
          type="checkbox"
          checked={userAddonIsAddImage}
          onClick={() => {
            setUserAddonIsAddImage(!userAddonIsAddImage);
          }}
        ></input>
      </div>
    </div>
  );
};

export default PlateDeities;