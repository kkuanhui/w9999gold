import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Preview from "./Preview";
import { useProducts, useProductsDispatch } from "./Context";
import "../static/css/custom-class.css"

const SingleType = () => {

  const params = useParams(); // url parameter
  const products = useProducts();
  const [type, setType] = useState({})
  const [product, setProduct] = useState({})
  const [size, setSize] = useState(6)
  const [weight, setWeight] = useState(5)
  useEffect(() => {
    if(products.types.length !== 0){
      const filteredType = products.types.filter(ele => ele.eName === params.productType)[0]
      setType(filteredType)
    }
    if(Object.values(products.main).length !== 0){
      setProduct(products.main)
    }
  },
  [products])

  return (
    <div>
      <div className="d-flex flex-jc-around" style={{ margin: "15px 0px" }}>

        <Preview></Preview>

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
              {/* <button>
                <Link to={`/studio/${type.eName}`}>
                  使用進階編輯器
                </Link>
              </button> */}
            </div>
          </div>


          <div style={{ marginTop: "15px" }}>

            <div>
              <label htmlFor="name">神明名稱: </label>
              <input id="name" type="text" placeholder="名稱" />
            </div>

            <div>
              <label htmlFor="department">敬獻單位: </label>
              <input id="department" type="text" placeholder="單位" />
            </div>
            <div>
              <label htmlFor="signature">敬獻詞: </label>
              <input id="signature" type="text" placeholder="敬獻辭" />
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
            <div>總價: {product.price}</div>
            {/* <div> */}
              <button style={{
                width: "100%", 
                height: "50px", 
                color: "#fff", 
                background: "#000", 
                borderRadius: "20px"
              }}>
                加入購物車
              </button>
            {/* </div> */}
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