import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../Context";
import vector from "../static/image/Vector.png";
import "../static/css/products.css";
import { renderWordObject } from "./utilities";

const Preview = ({ scale }) => {

  const context = useApp();
  const paramProductType = useParams().productType;
  const productContent = context.productContent;

  const [name, setName] = useState({});
  const [department, setDepartment] = useState({});
  const [signature, setSignature] = useState({});

  useEffect(() => {
    if(productContent.children.length !== 0){
      const name = productContent.children[0]
      setName(name)
      const department = productContent.children[1]
      setDepartment(department)
      const signature = productContent.children[2]
      setSignature(signature)
    }
  }, [productContent])

  return (
    <div>
      <div
        id="preview"
        style={{
          position: "relative",
          aspectRatio: "1 / 1",
          borderRadius: "10px",
          backgroundColor: "#D9D9D9",
          backgroundImage: `url("${vector}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "90%",
          backgroundPosition: "center",
        }}
      >
        <div className="preview-item" style={{ left: "50%", top: "35%" }}>
          {renderWordObject(name)}
        </div>
        <div className="preview-item" style={{ left: "50%", top: "50%" }}>
          {renderWordObject(department)}
        </div>
        <div className="preview-item" style={{ left: "50%", top: "65%" }}>
          {renderWordObject(signature)}
        </div>

        <Link
          className="pl-3 pr-3"
          to={`/studio/${paramProductType}`}
          style={{ color: "#fff" }}
        >
          使用進階編輯器{scale}
        </Link>
      </div>
    </div>
  );
};

export default Preview;
