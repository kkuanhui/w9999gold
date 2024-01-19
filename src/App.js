import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProvider from "./Context";

import RegularNavBar from "./NavBar/RegularNavBar";
import StudioNavBar from "./NavBar/StudioNavBar";
import BackstageNavBar from "./NavBar/BackstageNavBar";
import Footer from "./Footer/Footer";
import NoFooter from "./Footer/NoFooter";
import Studio from "./Studio/Studio";

const MainPage = lazy(() => import("./MainPage/MainPage"));
const GoldPage = lazy(() => import("./GoldPage/GoldPage"));
const Products = lazy(() => import("./Products/Products"));
// member aspect
const Member = lazy(() => import("./Member/Member"));
const ShoppingCart = lazy(() => import("./ShoppingCart/ShoppingCart"))
// exclusive
const Backstage = lazy(() => import("./Backstage/Backstage"));
const BackstageMain = lazy(() => import("./Backstage/Main"));
const BackstageGold = lazy(() => import("./Backstage/Gold"));
const BackstageProducts = lazy(() => import("./Backstage/Products"));
const BackstageShoppingCart = lazy(() => import("./Backstage/ShoppingCart"));

const App = () => {
  return(
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
};

const AppContent = () => {
  const [footerHieght, setFooterHeight] = useState(150);
  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: `${footerHieght}px`,
      }}
    >
      <Router>
        <Routes>
          <Route path="*" element={<RegularNavBar />}></Route>
          <Route path="/studio/*" element={<StudioNavBar />}></Route>
          <Route path="/backstage/*" element={<BackstageNavBar />}></Route>
        </Routes>

        <Suspense fallback={<div>loading...</div>}>
          <Routes>

            <Route index element={<MainPage />}></Route>
            <Route path="/main/*" element={<MainPage />}></Route>
            <Route path="/gold/*" element={<GoldPage />}></Route>
            <Route path="/products/*" element={<Products />}></Route>
            <Route path="/studio/*" element={<Studio />}></Route>

            <Route path="/member/*" element={<Member />}></Route>
            <Route path="/shopping-cart/*" element={<ShoppingCart />}></Route>

            <Route path="/backstage/*" element={<Backstage />}></Route>
            <Route path="/backstage/main/*" element={<BackstageMain />}></Route>
            <Route path="/backstage/gold/*" element={<BackstageGold />}></Route>
            <Route path="/backstage/products/*" element={<BackstageProducts />}></Route>
            <Route path="/backstage/shopping-cart/*" element={<BackstageShoppingCart />}></Route>

          </Routes>
        </Suspense>

        <Routes>
          <Route
            path="*"
            element={
              <Footer
                setFooterHeight={(v) => {
                  setFooterHeight(v);
                }}
              ></Footer>
            }
          ></Route>
          <Route
            path="/studio/*"
            element={
              <NoFooter
                setFooterHeight={(v) => {
                  setFooterHeight(v);
                }}
              ></NoFooter>
            }
          ></Route>
        </Routes>

      </Router>
    </div>

  );
};

export default App;
