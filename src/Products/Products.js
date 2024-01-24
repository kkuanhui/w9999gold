import React from "react";
import Entry from "./Entry";
import SingleType from "./SingleType"
import { Route, Routes } from "react-router-dom";
import "../static/css/product.css";

const Products = () => {
  return (
    <Routes>
      <Route index element={<Entry />}></Route>
      <Route path=":productType" element={<SingleType />}></Route>
    </Routes>
  );
};

export default Products;