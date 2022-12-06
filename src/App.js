import React, { Suspense, lazy  } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Footer from "./Footer";

const AppHome = lazy(() => import('./AppHome'));
const AppProduct = lazy(() => import('./AppProduct'));


const App = () => {
  return (
    <>
      <div id="main-content">
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
      <Footer></Footer>
    </>
  );
};

export default App;
