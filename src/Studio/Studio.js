import Toolbar from "./Toolbar/Toolbar";
import FunctionLayer from "./FunctionLayer/FunctionLayer";
import TriggerLayer from "./TriggerLayer/TriggerLayer";
import { useApp } from "../Context";
import {Routes, Route} from "react-router-dom"

const Studio = () => {
  return(
    <Routes>
      <Route index element={<StudioPage />}></Route>
      <Route path="*" element={<StudioPage />}></Route>
    </Routes>
  )
}

const StudioPage = () => {
  const context = useApp(); 
  return (
    <>
      <div name="toolbar"
      style={{
        width: "100%",
        height: "50px",
        borderBottom: "1px solid #434343",
        background: "#FFFDF7",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.25)",
        color: "#000000",
        zIndex: 1,
        position: "relative",
      }}
      >
        <Toolbar />
      </div>

      <div name="studio-content" 
        className="d-flex"
        style={{ 
          width: "100%", 
          height: "calc(100vh - 150px)"
      }}>
        <div style={{
          flex: "0 0 auto",
          borderRight: "1px solid #434343",
          background: "#FFFDF7",
          boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.25)",
          width: "80px",
          height: "100%",
          position: "relative",
          zIndex: "1",
        }}>
        </div>

        <div style={{
          flex: "1 0 auto",
          height: "100%",
          background: "#FFFDF7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
        }}>
          <div style={{
            scale: `${context.studioMeta.scale}`,
            width: "500px",
            boxSizing: "content-box",
            aspectRatio: "1 / 1",
            background: "#fff",
            border: "1px solid #FF9900"
          }}>
            <TriggerLayer></TriggerLayer>
            <FunctionLayer></FunctionLayer>
          </div>
        </div>


      </div>
    </>
  );
};

export default Studio;