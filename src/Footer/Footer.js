import { Routes, Route } from "react-router-dom";
import Regular from "./Regular";

const Footer = () => {
  return (
    <div
      className="pl-5 pr-5 pt-5"
      style={{
        background: "linear-gradient(180deg, #00290A 56.04%, #003D06 93.4%)",
        color: "#FFF",
      }}
    >
      <Routes>
        <Route path="/*" element={<Regular></Regular>}></Route>
        <Route path="/studio/*" element={null}></Route>
      </Routes>
    </div>
  );
};

export default Footer;
