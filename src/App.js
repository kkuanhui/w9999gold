import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

const AppHome = lazy(() => import("./AppHome"));
const AppProduct = lazy(() => import("./AppProduct"));

const App = () => {
  const [footerHieght, setFooterHeight] = useState(0)
  return (
    <>

      <div
        id="main"
        style={{
          minHeight: "100vh",
          paddingBottom: `${footerHieght}px`,
        }}
      >

        <Router>
          <NavBar />
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route index element={<AppHome />}></Route>
              <Route path="/product/*" element={<AppProduct />}></Route>
            </Routes>
          </Suspense>
        </Router>

      </div>

      <Footer setFooterHeight={setFooterHeight}></Footer>

    </>
  );
};

export default App;
