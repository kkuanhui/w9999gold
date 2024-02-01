import React from "react";
import Entry from "./Entry";
import Custom from "./Custom";
import { Route, Routes } from "react-router-dom";
import "../static/css/products.css";
import Warning from "./Warning";

const Products = () => {
  return (
    <>
      <Routes>
        <Route index element={<Entry />}></Route>
        <Route path="custom/:productType" element={<Custom />}></Route>
      </Routes>
      {/* <Routes>
        <Route index element={null}></Route>
        <Route path="custom/:productType" element={<Warning />}></Route>
      </Routes> */}
    </>
  );
};

export default Products;
