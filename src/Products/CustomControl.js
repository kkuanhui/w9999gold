import { useParams } from "react-router-dom";
import { useApp, useAppDispatch } from "../Context";
import "../static/css/custom-class.css";
import "../static/css/products.css";
import "../static/css/general/events.css";
import { useEffect, useState } from "react";

const CustomControl = ({scale, onScaleChange}) => {
  return (
    <div id="control">
      <Title />
      <NameInput />
      <DepartmentInput />
      <SignatureInput />
      <Style />
      <Weight />
      <Size />
      <Scale scale={scale} onScaleChange={onScaleChange}/>
      <Price />
      <AddToCartButton />
    </div>
  );
};

const Title = () => {
  const params = useParams(); // url parameter
  const context = useApp();
  const types = context.productTypes;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if(types.length !== 0){
      const type = types.filter(ele => ele.eName === params.productType)[0]
      setTitle(type.title)
      setSubtitle(type.subtitle)
    }
  }, [types])

  return (
    <div id="title">
      <h1 className="font-size-25">{title}</h1>
      <h4>{subtitle}</h4>
    </div>
  );
};

const NameInput = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="font-bold mb-1">神明名稱</div>
      <input
        className="width-100 border-d4d4d4"
        id="name"
        type="text"
        placeholder="例如：玉皇大帝"
        style={{
          background: "#fafafa",
          padding: "1px 5px",
          borderRadius: "5px",
          height: "30px",
        }}
        onInput={(e) => {
          dispatch({
            type: "textUpdate",
            id: 1,
            text: e.target.value,
          })
        }}
      />
    </div>
  );
};

const DepartmentInput = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="font-bold mb-1">單位</div>
      <input
        className="width-100 border-d4d4d4"
        id="department"
        type="text"
        placeholder="例如：ＸＸ宮"
        style={{
          background: "#fafafa",
          padding: "1px 5px",
          borderRadius: "5px",
          height: "30px",
        }}
        onInput={(e) => {
          dispatch({
            type: "textUpdate",
            id: 2,
            text: e.target.value,
          })
        }}
      />
    </div>
  );
};

const SignatureInput = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="font-bold mb-1">敬獻詞</div>
      <input
        className="width-100 border-d4d4d4"
        id="signature"
        type="text"
        placeholder="例如：敬獻"
        style={{
          background: "#fafafa",
          padding: "1px 5px",
          borderRadius: "5px",
          height: "30px",
        }}
        onInput={(e) => {
          dispatch({
            type: "textUpdate",
            id: 3,
            text: e.target.value,
          })
        }}
      />
    </div>
  );
};

const Style = () => {
  const dispatch = useAppDispatch();
  const context = useApp();
  const productMeta = context.productMeta;
  const style = productMeta.style;
  return (
    <div>
      <div className="font-bold">款式</div>
      <div className="options-holder">
        {[
          "龍鳳搶珠",
          "雙龍搶珠",
          "桃形",
          "書卷",
          "財源滾滾",
          "廣澤尊王",
          "山水景",
          "雙虎底",
        ].map((ele, idx) => {
          return (
            <div
              style={(ele===style)
                ?{background: "#198964", color: "#fff", border: "1px solid #2e2e2e"}
                :null
              }
              className="options hover-border-2e2e2e hover-cursor-pointer hover-cursor-pointer"
              key={idx}
              onClick={() => {
                dispatch({
                  type: "productMetaUpdate",
                  update: {
                    style: ele
                  }
                })
              }}
            >
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Weight = () => {
  const dispatch = useAppDispatch();
  const context = useApp();
  const productMeta = context.productMeta;
  const weight = productMeta.weight;
  return (
    <div>
      <div className="font-bold">重量</div>
      <div className="options-holder">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, idx) => {
          return (
            <div
              style={(ele===weight)
                ?{background: "#198964", color: "#fff", border: "1px solid #2e2e2e"}
                :null
              }
              className="options hover-border-2e2e2e hover-border-2e2e2e hover-cursor-pointer"
              key={idx}
              onClick={() => {
                dispatch({
                  type: "productMetaUpdate",
                  update: {
                    weight: ele
                  }
                })
              }}
            >
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Size = () => {
  const dispatch = useAppDispatch();
  const context = useApp();
  const productMeta = context.productMeta;
  const size = productMeta.size;
  return (
    <div>
      <div className="font-bold">尺寸</div>
      <div className="options-holder">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele, idx) => {
          return (
            <div
              style={(ele===size)
                ?{background: "#198964", color: "#fff", border: "1px solid #2e2e2e"}
                :null
              }
              className="options hover-border-2e2e2e hover-border-2e2e2e hover-cursor-pointer"
              key={idx}
              onClick={() => {
                dispatch({
                  type: "productMetaUpdate",
                  update: {
                    size: ele
                  }
                })
              }}
            >
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Scale = ({scale, onScaleChange}) => {
  return (
    <div>
      <div className="font-bold">顯示神尊尺寸</div>
      <div className="options-holder">
        {["不顯示", 1, 2, 3, 4, 5].map((ele, idx) => {
          return (
            <div
              style={(ele===scale)
                ?{background: "#198964", color: "#fff", border: "1px solid #2e2e2e"}
                :null
              }
              className="options hover-border-2e2e2e hover-border-2e2e2e hover-cursor-pointer"
              key={idx}
              onClick={() => {
                onScaleChange(ele)
              }}
            >
              {ele}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Price = () => {
  return (
    <div style={{ marginTop: "15px" }}>
      <div className="font-bold">總價</div>
      <div className="font-size-15 font-bold" style={{ color: "#026f02" }}>
        56,343
      </div>
    </div>
  );
};

const AddToCartButton = () => {
  return (
    <div>
      <button
        style={{
          width: "100%",
          height: "50px",
          color: "#fff",
          background: "#000",
          borderRadius: "20px",
        }}
        onClick={() => {
          alert("加入購物車");
        }}
      >
        加入購物車
      </button>
    </div>
  );
};
export default CustomControl;
