import "../static/css/studio.css";
import FunctionLayer from "./FunctionLayer/FunctionLayer";
import TriggerLayer from "./TriggerLayer/TriggerLayer";
import { useApp } from "../Context";

const Content = () => {
  const context = useApp();
  return (
    <div id="content">
      <div
        id="content-canvas"
        style={{
          scale: `${context.studioMeta.scale}`,
          width: "500px",
          boxSizing: "content-box",
          aspectRatio: "1 / 1",
          background: "#fff",
          border: "1px solid #FF9900",
        }}
      >
        <TriggerLayer></TriggerLayer>
        <FunctionLayer></FunctionLayer>
      </div>
    </div>
  );
};
export default Content;
