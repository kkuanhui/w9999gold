import React from "react";
import {Link} from "react-router-dom";
import imgPlaceholder from '../static/image/placeholder.jpeg'

const ProductCate = (props) => {
  return (
    <div className="flex-around">
    <div className="product-cate-block" style={{"backgroundColor": "green"}}>
      <Link to="/relief-plate">
        <img src={imgPlaceholder} width='50' height="50"></img>
      </Link>
    </div>
    <div className="product-cate-block" style={{"backgroundColor": "black"}}>
      <Link to="/gold">
        <img src={imgPlaceholder} width='50' height="50"></img>
      </Link>
    </div>
    <div className="product-cate-block" style={{"backgroundColor": "black"}}>
      <Link to="/p3">
        <img src={imgPlaceholder} width='50' height="50"></img>
      </Link>
    </div>
    <div className="product-cate-block" style={{"backgroundColor": "black"}}>
      <Link to="/p4">
        <img src={imgPlaceholder} width='50' height="50"></img>
      </Link>
    </div>

    </div>
  )
}


export default ProductCate