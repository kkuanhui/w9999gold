import React from "react";
import {Link} from "react-router-dom";
import imgPlaceholder from '../static/image/placeholder.jpeg'

const ProductCate = (props) => {
  return (
    <div id="product-cate">
      <Card
        linkTarget="/p1"
        append="123 123 123"
        name="浮字金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="/p2"
        append="123 123 123"
        name="一般金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="/p3"
        append="123 123 123"
        name="神明金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="/p4"
        append="123 123 123"
        name="金片"
        imgPlaceholder={imgPlaceholder}
      ></Card>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="product-cate">
      <Link to={props.linkTarget}>
        <h1>{props.name}</h1>
        <img src={props.imgPlaceholder} width="300" height="300"></img>
        <p>{props.append}</p>
      </Link>
    </div>
  );
};

export default ProductCate;