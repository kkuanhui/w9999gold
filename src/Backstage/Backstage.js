import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import BackstageError from "./BackstagrError";

const GoldPriceReport = lazy(() => import("./GoldPriceReport"));
const Products = lazy(() => import("./Products"));
const Cart = lazy(() => import("./Cart"));
const Cover = lazy(() => import("./Cover"));

const Backstage = () => {
  return(
    <Routes>
      <Route index element={<BackstagePage />} ></Route>
      <Route path="cover/*" element={<Cover />}></Route>
      <Route path="gold-price-report/*" element={<GoldPriceReport />}></Route>
      <Route path="products/*" element={<Products />}></Route>
      <Route path="cart/*" element={<Cart />}></Route>
      <Route path="*" element={<BackstageError></BackstageError>}></Route>
    </Routes>
  )
}

const BackstagePage = () => {
  return(
    <div className="ml-auto mr-auto" style={{width: "50%"}}>
      <h1>
        仕彩同仁專用網頁後台
      </h1>
      <div>
        請使用自己的帳號操作後台的各個功能。
      </div>
    </div>
  )
}

export default Backstage;