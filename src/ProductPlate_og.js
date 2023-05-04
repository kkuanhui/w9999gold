import axios from "axios";
import React, { useEffect, useState } from "react";
import { filter, uniqBy } from "lodash";
import Carousel, { CarouselChild } from "./Carousel/Carousel";

import myImg from './static/image/product-goldfan.jpg'
import myImg2 from './static/image/product-omori.jpg'
import myImg3 from './static/image/product-plate-creativity.jpg'
import myImg4 from './static/image/product-plate-deities.jpg'

const ProductPlate = (props) => {
  const APP_ID = props["appId"]

  const [goldPrice, setGoldPrice] = useState([]);
  const [appProducts, setAppProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [addonDetails, setAddonDetais] = useState([])

  const [userProduct, setUserProduct] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [userWeight, setUserWeight] = useState(0);
  const [weightInt, setWeightInt] = useState([-1, 1]);
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
    if(userProduct.length && productDetails.length){
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
    }
  }, [userProduct, productDetails]);

  // when plate size(userSize) is changed
  useEffect(() => {
    if(userDetail.length || userSize){
      const detail = filter(userDetail, { size: Number(userSize) });
      const weightMin = detail["0"]?.["weight_min"];
      const weightMax = detail["0"]?.["weight_max"];
      setUserWeight(weightMin);
      setWeightInt([weightMin, weightMax]);
      setUserIsAddImage(false);
      if((userSize+2)>10){setUserIsAddon(false)}
    }
  }, [userSize, userDetail]);

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
    <div className="p-5 mr-auto ml-auto" style={{"width": "clamp(0px, 100%, 600px)"}}>
      <h1 className="width-70 text-center font-size-30">{props["name"]}</h1>

      <div className="product-green-border p-5 mb-3">

        <h1 className="font-size-20">金牌本體的規格</h1>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 ml-auto mr-auto">
          <div className="font-bold font-size-15">金牌設計</div>
          <select
            onChange={(e) => {
              setUserProduct(e.target.value);
            }}
          >
            {appProducts.map((ele, idx) => {
              return (
                <option key={idx} value={ele["product_id"]}>{ele["show_name"]}</option>
              );
            })}
          </select>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 mr-auto ml-auto flex-wrap">
          <div style={{"flex": "1 1 50%"}} className="font-bold font-size-15">金牌尺寸</div>
          <div style={{"flex": "1 1 50%"}}>
            <select
              value={userSize}
              onChange={(e) => {
                setUserSize(Number(e.target.value));
              }}
            >
              {userDetail.map((ele, idx) => {
                return <option key={idx} value={ele["size"]}>{ele["size"]}</option>;
              })}
            </select>
          </div>
          <div style={{"flex": "1 1 50%"}}>工資</div>
          <div style={{"flex": "1 1 50%"}}>
            {filter(userDetail, { size: userSize })["0"]?.["wage_basic"]}
          </div>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 flex-wrap ml-auto mr-auto">
          <div className="font-bold font-size-15" style={{"flex": "1 1 50%"}}>黃金重量</div>
          <div className="d-flex flex-direction-row" style={{"flex": "1 1 50%", "border": "1px solid black", "borderRadius": "10px"}}>

            <button 
              style={{"flex": "1 1 auto"}}
              className="pl-3 pr-3" 
              onClick={() => handleWeightChange((userWeight-0.1).toFixed(2))}>
              -
            </button>
            <div 
              className="d-flex flex-ai-center flex-jc-center" 
              style={{"flex": "1 1 auto", "border": "1px solid black", "borderStyle": "none solid"}}
            >
              <input
                className="width-100 height-100 text-center"
                type="number"
                value={userWeight}
                min={weightInt[0]}
                max={weightInt[1]}
                onChange={(e) => {
                  handleWeightChange(e.target.value)}
                }
              ></input>

            </div>
            <button 
              style={{"flex": "1 1 auto"}}
              className="pl-3 pr-3" 
              onClick={() => handleWeightChange((userWeight+0.1).toFixed(2))}>
              +
            </button>

          </div>
          <div style={{"flex": "1 1 50%"}}>時價</div>
          <div style={{"flex": "1 1 50%"}}>
            {(
              (goldPrice["0"]?.["price_value"]) * userWeight
            ).toFixed()}
          </div>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 ml-auto mr-auto">
          <div className="font-size-15 font-bold">增加照片</div>
          <input
            className="font-bold font-size-15"
            type="checkbox"
            checked={userIsAddImage}
            onChange={() => {
              setUserIsAddImage(!userIsAddImage);
            }}
          ></input>
        </div>

      </div>

      <div className="product-golden-border p-5 mb-3">

        <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 mb-3 mr-auto ml-auto">
          <div className="font-size-15 font-bold">藝術框</div>
          <input
            type="checkbox"
            disabled={((userSize+2)>10)?true:false}
            checked={userIsAddon}
            onChange={onIsAddonClick}
          ></input>
        </div>

        {
          ((userSize+2)>10)
          ?<div className="mb-3" style={{"color": "gray"}}>無法再加外框</div>
          :<div className="mb-3">部份尺寸可以增加加大背板，視覺效果更加分</div>

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

      <div className="mb-3">
        <div className="seperate-line width-100"></div>
        <div className="d-flex flex-ai-center flex-jc-between mr-auto ml-auto width-70">
          <div className="font-size-20 font-bold">總價</div>
          <div className="font-size-20 font-bold">
            $<span>{totalPrice.toFixed()}</span>
          </div>
        </div>
      </div>

      <GalleryPart></GalleryPart>


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
    <>
      <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 mr-auto ml-auto">
        <div className="font-bold font-size-15">外框尺寸</div>
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
            ).map((ele, idx) => (
              <option key={idx} value={ele["size"]}>{ele["size"]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 mr-auto ml-auto">
        <div className="font-bold font-size-15">外框設計</div>
        <select
          value={userAddon}
          onChange={(e) => {
            setUserAddon(e.target.value);
          }}
        >
          {uniqBy(
            filter(addonDetails, { size: userAddonSize }),
            "addon_id"
          ).map((ele, idx) => (
            <option key={idx} value={ele["addon_id"]}>{ele["show_name"]}</option>
          ))}
        </select>
      </div>


      <div className="d-flex flex-ai-center flex-jc-between width-80 pl-3 mr-auto ml-auto">
        <div className="font-bold font-size-15">外框加圖</div>
        <input
          type="checkbox"
          checked={userAddonIsAddImage}
          onChange={() => {
            setUserAddonIsAddImage(!userAddonIsAddImage);
          }}
        ></input>
      </div>

    </>
  );
};


const GalleryPart = () => {

  const [showIdx, setShowIdx] = useState(0)

  return(
      <>
        <div className="d-flex flex-direction-column">
          <h1>產品圖庫</h1>
          <Carousel className="d-flex flex-ai-center width-100" style={{height: "300px"}} toStep={showIdx}>
            <CarouselChild className="d-flex flex-ai-center flex-direction-column">
              <img src={myImg}  alt="img" style={{"width": "80%"}}></img>
              <div className="font-size-15">黃金扇</div>
            </CarouselChild>
            <CarouselChild className="d-flex flex-ai-center flex-direction-column">
              <img src={myImg2}  alt="img" style={{"width": "80%", "margin": "0px auto"}}></img>
              <div className="font-size-15">御守</div>
            </CarouselChild>
          </Carousel>        
        </div>

        <div className="d-flex flex-wrap mt-3" style={{gap: '5px'}}>
          <img src={myImg}  alt="img" width="50" onClick={() => {setShowIdx(0)}}style={{cursor: "pointer", flex: '0 1 auto'}}></img>
          <img src={myImg2} alt="img" width="50" onClick={() => {setShowIdx(1)}}style={{cursor: "pointer", flex: '0 1 auto'}}></img>
        </div>
      </>
  )
}


export default ProductPlate;