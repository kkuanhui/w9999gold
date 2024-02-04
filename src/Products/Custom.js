import CustomPreview from "./CustomPreview";
import CustomControl from "./CustomControl";
import "../static/css/products.css";
import { useState } from "react";

const Custom = () => {
  const [scale, setScale] = useState("不顯示");
  return (
    <div id="custom">
      <CustomPreview scale={scale}></CustomPreview>
      <CustomControl
        scale={scale}
        onScaleChange={(s) => setScale(s)}
      ></CustomControl>
    </div>
  );
};

export default Custom;
