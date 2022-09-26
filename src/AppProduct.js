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
        <Route path="medal" element={<P1 name="medal" />}></Route>
        <Route path="gold" element={<P1 name="gold" />}></Route>
        <Route path="*" element={<P1 name="plate-god" />}></Route>
      </Routes>
    </div>
  );
};

const P1 = (props) => {
  return <div>這是 {props.name}</div>;
};

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
        linkTarget="medal"
        name="純金獎牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="gold"
        name="純金金幣"
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
