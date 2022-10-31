import React from "react";
import { Routes, Route, Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div>
      <Link to={props.linkTarget}>
        <img src={"./djwoidjiwoe.png"} width="250" height="200"></img>
        <div>{props.name}</div>
      </Link>
    </div>
  );
};

const ProductCards = (props) => {
  return (
    <div id="app-product">
      <Card linkTarget="plate-deities" name="神明金牌"></Card>
      <Card linkTarget="plate-creativity" name="純金金牌"></Card>
      <Card linkTarget="goldfan" name="黃金扇"></Card>
      <Card linkTarget="omori" name="純金御守"></Card>
    </div>
  );
};

export default ProductCards;
