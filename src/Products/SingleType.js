import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preview from "./Preview";
import { useApp } from "../Context";
import "../static/css/custom-class.css"

const SingleType = () => {

  const params = useParams(); // url parameter
  const context = useApp();
  const customizedMeta = context.customizedMeta;
  const productTypes = context.productTypes;

  const [type, setType] = useState({});
  const [main, setMain] = useState({});
  const [shape, setShape] = useState("雙龍搶珠");
  const [size, setSize] = useState(6);
  const [weight, setWeight] = useState(5);
  const [content, setContent] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const calculate = size*1000 + weight*3000
    setPrice(calculate)
  }, 
  [size, weight]);

  useEffect(() => {
    if(productTypes.length !== 0){
      const filteredType = productTypes.filter(ele => ele.eName === params.productType)[0]
      setType(filteredType)
    }
    // if(Object.values(products.main).length !== 0){
    //   setMain(products.main)
    // }
  },
  [productTypes])

  return (
    <div>
      <div className="d-flex flex-jc-around" style={{ margin: "15px 0px" }}>

        <Preview content={content}></Preview>

        <div>

          <div 
          className="d-flex flex-jc-between flex-ai-end"
          style={{ 
            marginTop: "15px",
            borderBottom: "1px solid #D4D4D4"
            }}
          >
            <div>
              <h1 className="font-size-25" >
                {type.title}
              </h1>
            </div>

            <div>
              <div style={{fontSize: "16px", color: "rgb(58 58 58)"}}>
                {type.subtitle}
              </div>
            </div>
          </div>


          <div style={{ marginTop: "15px" }}>

            <div style={{marginBottom: "5px"}}>
              <label htmlFor="name">神明名稱: </label>
              <input id="name" type="text" placeholder="名稱" 
                style={{background: "#dadada", padding: "1px 3px", borderRadius: "5px"}}
                onInput={(e) => {
                  setContent({...content, name: e.target.value})
                }} />
            </div>

            <div style={{marginBottom: "5px"}}>
              <label htmlFor="department">敬獻單位: </label>
              <input id="department" type="text" placeholder="單位" 
                style={{background: "#dadada", padding: "1px 3px", borderRadius: "5px"}}
                onInput={(e) => {
                  setContent({...content, department: e.target.value})
                }}  
              />
            </div>

            <div style={{marginBottom: "5px"}}>
              <label htmlFor="signature">敬獻詞: </label>
              <input id="signature" type="text" placeholder="敬獻辭" 
                style={{background: "#dadada", padding: "1px 3px", borderRadius: "5px"}}
                onInput={(e) => {
                  setContent({...content, signature: e.target.value})
                }}
              />
            </div>

          </div>

          <div>
            <div>款式</div>
            <div className="d-grid grid-column-4">
                {
                ["龍鳳搶珠", "雙龍搶珠", "桃形", 
                  "書卷", "財源滾滾", "廣澤尊王", 
                  "山水景", "雙虎底"].map(ele => {
                    return <div
                    className="d-flex flex-ai-center flex-jc-center hover-border-2e2e2e border-d4d4d4 hover-cursor-pointer" 
                    onClick={() => {setShape(ele)}}
                    style={{
                      width: "80px", 
                      height: "50px", 
                      borderRadius: "5px", 
                      userSelect: "none",
                      background: (ele === shape)?"#e3e3e3":"transparent"
                    }}>
                    {ele}
                    </div>
                  })
                }
            </div>
          </div>

          <div>
            <div>重量</div>
            <div className="d-grid grid-column-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(ele => {
                  return <div 
                    className="d-flex flex-ai-center flex-jc-center hover-border-2e2e2e border-d4d4d4 hover-cursor-pointer" 
                    onClick={() => {setWeight(ele)}}
                    style={{
                      width: "80px", 
                      height: "50px", 
                      borderRadius: "5px", 
                      userSelect: "none",
                      background: (ele === weight)?"#e3e3e3":"transparent"
                    }}>
                    {ele}錢
                  </div>
                })}
            </div>
          </div>

          <div>
            <div>尺寸</div>
            <div className="d-grid grid-column-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(ele => {
                  return <div 
                    className="d-flex flex-ai-center flex-jc-center hover-border-2e2e2e border-d4d4d4 hover-cursor-pointer" 
                    onClick={() => {setSize(ele)}}
                    style={{
                      width: "80px", 
                      height: "50px", 
                      borderRadius: "5px", 
                      userSelect: "none",
                      background: (ele === size)?"#e3e3e3":"transparent"
                    }}>
                    {ele}吋
                  </div>
                })}
            </div>
          </div>

          <label htmlFor="statue">
            顯示神尊尺寸
          </label>
          <select id="statue">
            <option>無</option>
            <option>兩尺</option>
            <option>三尺</option>
            <option>四尺</option>
            <option>五尺</option>
          </select>

          <div style={{ marginTop: "15px" }}>
            <div>總價: <span style={{color: "#026f02"}}>{price}</span></div>
            <button style={{
                width: "100%", 
                height: "50px", 
                color: "#fff", 
                background: "#000", 
                borderRadius: "20px"
              }}
              onClick={() => {
                alert('加入購物車')
              }}
            >
              加入購物車
            </button>
          </div>

        </div>

      </div>

      <div>

        <div className="width-50 mt-3 mb-3 mr-auto ml-auto pl-5 pr-5" style={{}}>
          <h2>訂購須知</h2>
          <ol>
            <li>1. 工作天</li>
            <li>2. 專人接洽</li>
            <li>3. 寄送服務</li>
          </ol>
        </div>

        <div className="width-50 mt-3 mb-3 mr-auto ml-auto pl-5 pr-5" style={{}}>
          <h2>售後服務</h2>
          <ol>
            <li>1. 產品維修</li>
            <li>2. 黃金保證</li>
          </ol>
        </div>

      </div>

    </div>
  );
};

export default SingleType;