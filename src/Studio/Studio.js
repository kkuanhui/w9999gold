import StudioProvider from "./StudioContext";
import Toolbar from "./Toolbar/Toolbar";
import FunctionLayer from "./FunctionLayer/FunctionLayer";
import TriggerLayer from "./TriggerLayer/TriggerLayer";
import { useStudio } from "./StudioContext";
import { useState } from "react";
import "../static/css/id.css"

const Studio = () => {
  return (
    <StudioProvider>
      <StudioContent />
    </StudioProvider>
  );
};

const StudioContent = () => {
  const studio = useStudio();
  if (studio.json === null) {
    return <div>loading......</div>;
  }
  return (
    <>
      <div
      style={{
        width: "100%",
        height: "50px",
        overflow: "hidden",
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

      <div className="d-flex"
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
          overflowX: "scroll",
          overflowY: "scroll",
        }}>
          <div id="canvas" style={{
            scale: "1",
            width: "501px",
            aspectRatio: "1 / 1",
            background: "#fff",
            border: "1px solid #FF9900"
          }}>
            {/* <TriggerLayer></TriggerLayer> */}
            {/* <FunctionLayer></FunctionLayer> */}
          </div>
        </div>


      </div>
    </>
  );
};

export default Studio;