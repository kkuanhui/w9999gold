import React, {lazy} from "react";
import { Routes, Route } from "react-router-dom";

// import ProductPlateDeities from "./ProductPlateDeities";
// import ProductPlateCreativity from "./ProductPlateCreativity";
// import ProductGoldfan from "./ProductGoldfan";
// import ProductOmori from "./ProductOmori";

// 1.1 plate_deities 神明金牌
// 1.2 plate_creativity 創意金牌
// 2.  omori 御守
// 3.  goldfan 黃金扇

const ProductCards = lazy(() => import('./ProductCards'));
const ProductPlate = lazy(() => import('./ProductPlate'));
const ProductOmori = lazy(() => import('./ProductOmori'));
const ProductGoldfan = lazy(() => import('./ProductGoldfan'));

const AppProduct = () => {
  return (
    <div>
      <Routes>
        {/* index and exception */}
        <Route index element={<ProductCards />}></Route>
        <Route path="*" element={<ProductCards />}></Route>
        <Route path="plate_deities" element={<ProductPlate appId="A01" name="神明金牌"/>}></Route>
        <Route
          path="plate_creativity"
          element={<ProductPlate appId="A02" name="創意金牌"/>}
        ></Route>
        <Route path="goldfan" element={<ProductGoldfan />}></Route>
        <Route path="omori" element={<ProductOmori />}></Route>
      </Routes>
    </div>
  );
};

export default AppProduct;