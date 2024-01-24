import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./Context";

import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";

const CoverPage = lazy(() => import("./CoverPage/CoverPage"));
const GoldPriceReport = lazy(() => import("./GoldPriceReport/GoldPriceReport"));
const Products = lazy(() => import("./Products/Products"));
const Cart = lazy(() => import("./Cart/Cart"));
const Member = lazy(() => import("./Member/Member"));
const Backstage = lazy(() => import("./Backstage/Backstage"));
const Studio = lazy(() => import("./Studio/Studio"));
const Error = lazy(() => import("./Error"));

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

const AppContent = () => {
  return (
    <Router>
      <NavBar></NavBar>

      <div
        style={{ minHeight: "calc(100vh - 50px)" }}
        // NavBar height 50px.
        // minHeight is not fixed height.
        // height percentage cannot applied in upcoming children
      >
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route index element={<CoverPage />}></Route>
            <Route
              path="/gold-price-report"
              element={<GoldPriceReport />}
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/products/*" element={<Products />}></Route>
            <Route path="/studio/*" element={<Studio />}></Route>
            <Route path="/member/*" element={<Member />}></Route>
            <Route path="/backstage/*" element={<Backstage />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Suspense>
      </div>

      <Footer></Footer>
    </Router>
  );
};

export default App;
