import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../Context";
import vector from "../static/image/Vector.png";
import "../static/css/products.css"

const Preview = ({ content }) => {
  content = {
    name: "天上聖母",
    department: "北港朝天宮",
    signature: "眾爐下 敬獻",
  };
  const context = useApp();
  const productTypes = context.productTypes;
  const params = useParams(); // url parameter
  const [type, setType] = useState({});

  useEffect(() => {
    if (productTypes.length !== 0) {
      const filteredType = productTypes.filter(
        (ele) => ele.eName === params.productType
      )[0];
      setType(filteredType);
    }
  }, [productTypes]);

  return (
    <div>
      <div id="preview"
        style={{
          position: "relative",
          aspectRatio: "1/1",
          borderRadius: "10px",
          backgroundColor: "#D9D9D9",
          backgroundImage: `url("${vector}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "90%",
          backgroundPosition: "center",
          fontFamily: "DFKai-sb",
        }}
      >
        <div className="preview-item" style={{left: "50%",top: "35%"}}>
          {content.name}
        </div>
        <div className="preview-item" style={{left: "50%",top: "50%"}}>
          {content.department}
        </div>
        <div className="preview-item" style={{left: "50%",top: "65%"}}>
          {content.signature}
        </div>

        <Link className="pl-3 pr-3" to={`/studio/${type.eName}`} style={{ color: "#fff" }}>
          使用進階編輯器
        </Link>
      </div>
    </div>
  );
};

export default Preview;
