import { Routes, Route } from "react-router-dom";
import Regular from "./Regular";

const Footer = () => {
  return (
    <Routes>
      <Route path="/*" element={<Regular></Regular>}></Route>
      <Route path="/studio/*" element={null}></Route>
    </Routes>
  );
};

export default Footer;
