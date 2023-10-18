import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Toolbar from "./Toolbar/Toolbar";
import _ from "lodash";

// mock json -----
import jsonProductMeta from "./product-meta.json";
import jsonProductItems from "./product-items.json"

const Studio = () => {
  const [operateMode, setOperateMode] = useState("normal");
  // modes -> normal, word, photo
  const [productMeta, setProductMeta] = useState({});
  // notice: productMeta is an object
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    // import json
    setProductMeta(jsonProductMeta);
    setProductItems(jsonProductItems);
  }, []);

  const testShowProductMeta = () => {
    console.log(productMeta)
  }

  const testShowProductItems = () => {
    console.log(productItems)
  }

  const onPMChange = (key, value) => {
    // on product mode change
    const data = productMeta;
    data[key] = value;
    setProductMeta(data);
  };

  const onPIAdd = (type, pX, pY, photoName) => {
    // on product item add
    const plusOne = _.max(productItems.map(ele => ele["id"])) + 1
    console.log(plusOne)
    const zIndex = _.map(productItems.map(ele => ele["zIndex"])) + 1
    const empty = (type === "word")
    ?{
      "id": plusOne,
      "type": "word",
      "content": "",
      "fontFamily": "BK Font",
      "fontSize": 12,
      "textAlign": "center",
      "fontWeight": false,
      "fontStyle": 'normal',
      "textDecoration": '',
      "curveParameters": null,
      "zIndex": zIndex,
      "positionX": pX,
      "positionY": pY
    }
    :{
      "id": plusOne,
      "type": "photo",
      "url": `/root/${photoName}`,
      "width": "",
      "height": "",
      "radius": [0, 0, 0, 0],
      "zIndex": zIndex,
      "positionX": pX,
      "positionY": pY
    }
    const data = productItems
    data.push(empty)
    setProductItems(data)
  };

  const onPIChange = (id, key, value) => {
    // on product item change
    const data = productItems
    data.filter(ele => ele.id === id)['0'][key] = value
    setProductItems(data)
    if(data.filter(ele => ele.id === id)['0']['content'].length === 0){
      onPIDelete(id)
    }
  }

  const onPIDelete = (id) => {
    // on product item delete
    const data = productItems.filter(ele => ele.id !== id)
    setProductItems(data)
  }

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
        <Toolbar
          operateMode={operateMode}
          productMeta={productMeta}
          onMetaDataChange = {onPMChange}
          testShowProductItems={testShowProductItems}
          testShowProductMeta={testShowProductMeta}
        />
      </div>
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          height: "100%",
        }}
      >
        <Canvas 
          setOperateMode={setOperateMode} 
          onPMChange={onPIChange} 
          onPIAdd={onPIAdd} 
          onPIDelete={onPIDelete}
          onPIChange={onPIChange}
          productItems={productItems}
        />
      </div>
    </div>
  );

};

export default Studio;
