import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar/Toolbar";

// mock json -----
import mockJson from "./mock-json.json"

const Studio = () => {
  const [jsonRequesting, setJsonRequesting] = useState(true);
  const [operateMode, setOperateMode] = useState("normal");
  // modes -> normal, word, photo
  const [json, setJson] = useState({});
  // notice: productMeta is an object

  // function -----
  const onChangeMode = (mode) => {
    setOperateMode(mode)
  }

  // life cycle -----
  useEffect(() => {
    setInterval(() => {
      setJson(mockJson);
      setJsonRequesting(false)
    }, 500);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: "#E6E6E6" }}>

      <div
        style={{
          width: "100%",
          height: "30px",
          position: "fixed",
          top: "50px",
          zIndex: "1",
        }}
      >
        <Toolbar operateMode={operateMode}/>
      </div>

      <div
        style={{
          marginTop: "30px",
          width: "100%",
          height: "100%",
        }}
      >
        {
          (!jsonRequesting)
          ?<Canvas onChangeMode={onChangeMode} json={json}/>
          :<div>Requesting</div>
        }
      </div>

    </div>
  );

};

export default Studio;
