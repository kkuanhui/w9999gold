import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "./Context";
import vector from "../static/image/Vector.png"

const Preview = ({content}) => {

  const products = useProducts();
  const params = useParams(); // url parameter
  const [type, setType] = useState({})
  useEffect(() => {
    if(products.types.length !== 0){
      const filteredType = products.types.filter(ele => ele.eName === params.productType)[0]
      setType(filteredType)
    }
  },
  [products])

  return(
    <div
      style={{
        position: "relative",
        width: "500px",
        height: "600px",
        borderRadius: "10px",
        backgroundColor: "#D9D9D9",
        backgroundImage: `url("${vector}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "500px auto",
        backgroundPosition: "0% 35%",
        fontFamily: "DFKai-sb",
      }}
    >
      <div style={{
        position: "absolute",
        left: "135px",
        top: "180px",
        border: "1px solid black",
        userSelect: "none",
        fontSize: "40px",
        minWidth: "160px",
        height: "42px",
        fontWeight: "bold"
        }}>
        {content.name}
      </div>
      <div style={{
        position: "absolute",
        left: "130px",
        top: "245px",
        border: "1px solid black",
        userSelect: "none",
        fontSize: "40px",
        minWidth: "200px",
        height: "42px",
        }}>
        {content.department}
      </div>
      <div style={{
        position: "absolute",
        left: "130px",
        top: "320px",
        border: "1px solid black",
        userSelect: "none",
        fontSize: "40px",
        minWidth: "240px",
        height: "42px",
        }}>
        {content.signature}
      </div>

      <button style={{
        position: "absolute",
        bottom: "5px",
        left: "50%",
        transform: "translate(-50%, 0)",
        fontFamily: "ariel",
        background: "#4287f5",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        color: "#fff",
        padding: "10px 20px"
      }}>
        <Link to={`/studio/${type.eName}`}
          style={{color: "#fff"}} 
        >
          使用進階編輯器
        </Link>
      </button>
    </div>
  )
}

export default Preview;