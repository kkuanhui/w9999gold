import React from "react";
import {Link} from "react-router-dom";
import imgPlaceholder from './static/image/placeholder.jpeg'

const AppProduct = () => {
  return (
    <div id="app-product">
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
        <img src={props.imgPlaceholder} width="300" height="300"></img>
        <div>{props.name}</div>
      </Link>
    </div>
  );
};

export default AppProduct;