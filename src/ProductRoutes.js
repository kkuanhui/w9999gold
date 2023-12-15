import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 1.1 plate_deities 神明金牌
// 1.2 plate_creativity 創意金牌
// 2.  omori 御守
// 3.  goldfan 黃金扇

const PlateStudio = lazy(() => import("./Studio/Studio"));

const ProductCards = lazy(() => import("./ProductCards"));
const ProductGoldfan = lazy(() => import("./ProductGoldfan"));
const ProductOmori = lazy(() => import("./ProductOmori"));

const ProductRoutes = () => {

  return (
      <Routes>
        <Route index element={<ProductCards />}></Route>
        <Route path="*" element={<ProductCards />}></Route>
        <Route
          path="plate_deities"
          element={<PlateStudio appId="A01" name="神明金牌" />}
        ></Route>
        <Route
          path="plate_creativity"
          element={<PlateStudio appId="A02" name="創意金牌" />}
        ></Route>
        <Route path="goldfan" element={<ProductGoldfan />}></Route>
        <Route path="omori" element={<ProductOmori />}></Route>
      </Routes>
  );

};

export default ProductRoutes;
