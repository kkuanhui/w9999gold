import axios from "axios";
import React, { useEffect, useState } from "react";
import { filter, uniqBy } from "lodash";

const PlateCreativity = (props) => {
  // const APP_ID = props["appId"]
  const APP_ID = "A02";

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
  const handleWeightChange = (e) => {
    const input = Number(e.target.value)
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
    <div>
      <h1 className="width-70 text-center">創意金牌</h1>

      <div
        className="d-grid grid-column-3 mr-auto ml-auto width-50"
        style={{ gridTemplateColumns: "3fr 2fr 1fr 1fr" }}
      >
        <div>金牌設計</div>
        <div>
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

        <div style={{ gridRow: "2" }}>金牌尺寸</div>
        <div style={{ gridRow: "2" }}>
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

        <div style={{ gridRow: "3" }}>黃金重量</div>
        <div style={{ gridRow: "3" }}>
          <input
            style={{ border: "solid 1px #000000" }}
            type="number"
            value={userWeight}
            min={weightInt[0]}
            max={weightInt[1]}
            onChange={(e) => handleWeightChange(e)}
          ></input>
        </div>
        <div style={{ gridArea: "3/3" }}>時價</div>
        <div style={{ gridArea: "3/4" }} className="d-flex">
          <div>
            {(
              Number(goldPrice["0"]?.["price_value"]) * Number(userWeight)
            ).toFixed()}
          </div>
        </div>

        <div style={{ gridRow: "4" }}>增加照片</div>
        <div style={{ gridRow: "4" }}>
          <input
            type="checkbox"
            checked={userIsAddImage}
            onClick={() => {
              setUserIsAddImage(!userIsAddImage);
            }}
          ></input>
        </div>

        <div style={{ gridRow: "5" }}>金喜加大</div>
        <div style={{ gridRow: "5" }}>
          <input
            type="checkbox"
            disabled={((userSize+2)>10)?true:false}
            checked={userIsAddon}
            onClick={onIsAddonClick}
          ></input>
        </div>
        {
          ((userSize+2)>10)?<div style={{gridRow:"5"}}>無法再加外框</div>:null
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

        <div style={{ gridRow: "10" }}>總價</div>
        <div style={{ gridRow: "10" }}>
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
    <div style={{ gridRow: "6" }}>
      <div style={{ gridRow: "6" }}>外框尺寸</div>
      <div style={{ gridRow: "6" }}>
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

      <div style={{ gridRow: "7" }}>外框設計</div>
      <div style={{ gridRow: "7" }}>
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

      <div style={{ gridRow: "8" }}>外框加圖</div>
      <div style={{ gridRow: "8" }}>
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

export default PlateCreativity;