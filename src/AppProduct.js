import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import imgPlaceholder from "./static/image/placeholder.jpeg";
import PlateDeities from "./PlateDeities";

const AppProduct = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Cards />}></Route>
        <Route
          path="plate-deities"
          element={<PlateDeities />}
        ></Route>
        <Route
          path="plate-regular"
          element={<P1 name="plate-regular" />}
        ></Route>
        <Route path="goldfan" element={<P1 name="goldfan" />}></Route>
        <Route path="omori" element={<P1 name="omori" />}></Route>
        <Route path="*" element={<P1 name="plate-god" />}></Route>
      </Routes>
    </div>
  );
};

const P1 = (props) => {
  return <div>這是 {props.name}</div>;
};

// 1. plate 金牌
// 2. omori 御守
// 3. goldfan 黃金扇

const Cards = (props) => {
  return (
    <div id="app-product">
      <Card
        linkTarget="plate-deities"
        name="神明金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="plate-regular"
        name="純金金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="goldfan"
        name="黃金扇"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="omori"
        name="純金御守"
        imgPlaceholder={imgPlaceholder}
      ></Card>
    </div>
  );
};

const Card = (props) => {
  return (
    <div>
      <Link to={props.linkTarget}>
        <img src={props.imgPlaceholder} width="250" height="200"></img>
        <div>{props.name}</div>
      </Link>
    </div>
  );
};

export default AppProduct;
