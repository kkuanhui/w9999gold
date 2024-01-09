import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RegularNavBar from "./NavBar/RegularNavBar";
import StudioNavBar from "./NavBar/StudioNavBar";
import Footer from "./Footer/Footer";
import NoFooter from "./Footer/NoFooter";
import Studio from "./Studio/Studio";

const MainPage = lazy(() => import("./MainPage/MainPage"));
const GoldPage = lazy(() => import("./GoldPage/GoldPage"));
const Products = lazy(() => import("./Products/Products"));
const ProductSingleType = lazy(() => import("./Products/SingleType"))

const App = () => {
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
        </Routes>

        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route index element={<MainPage />}></Route>
            <Route path="/gold/*" element={<GoldPage />}></Route>
            <Route path="/products/*" element={<Products />}></Route>
            <Route path="/studio/*" element={<Studio />}></Route>
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
