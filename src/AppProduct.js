import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductCards from "./ProductCards";
import ProductPlateDeities from "./ProductPlateDeities";
import ProductPlateCreativity from "./ProductPlateCreativity";
import ProductGoldfan from "./ProductGoldfan";
import ProductOmori from "./ProductOmori";

// 1.1 plate-deities 神明金牌
// 1.2 plate-regular 純金金牌
// 2.  omori 御守
// 3.  goldfan 黃金扇

const AppProduct = () => {
  return (
    <div>
      <Routes>
        {/* index and exception */}
        <Route index element={<ProductCards />}></Route>
        <Route path="*" element={<ProductCards />}></Route>

        <Route path="plate-deities" element={<ProductPlateDeities />}></Route>
        <Route
          path="plate-creativity"
          element={<ProductPlateCreativity />}
        ></Route>
        <Route path="goldfan" element={<ProductGoldfan />}></Route>
        <Route path="omori" element={<ProductOmori />}></Route>
      </Routes>
    </div>
  );
};

export default AppProduct;
