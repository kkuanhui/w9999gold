import { useState } from "react";
import {
  AiOutlineFileWord, 
  AiOutlineBold, 
  AiOutlineItalic, 
  AiOutlineUnderline, 
  AiOutlineVerticalAlignBottom,
} from 'react-icons/ai';
import {FiPlus, FiMinus} from 'react-icons/fi';
import { useStudio, useStudioDispatch } from "../StudioContext";
import { toolbarHtmlToObj } from "../utilities";

const Word = () => {

  return (
    <div
      className="d-flex flex-jc-start flex-ai-center"
      style={{
        gap: "10px",
        height: "100%",
        width: "100%",
        padding: "0px 20px",
        position: "relative",
      }}
    >
      <AiOutlineFileWord />
      <FontStyle />
      <FontSize />

      <FontButton>
        <AiOutlineBold />
      </FontButton>

      <FontButton>
        <AiOutlineItalic />
      </FontButton>

      <FontButton>
        <AiOutlineUnderline />
      </FontButton>

      <FontButton>
        <AiOutlineVerticalAlignBottom />
      </FontButton>

    </div>
  );
};

const FontSize = () => {
  const [size, setSize] = useState(16);
  const onSizeAdd = (delta) => {
    const s = (size + delta).toFixed(0);
    setSize(Number(s));
  };
  const onSizeChange = (v) => {
    setSize(Number(v))
  }
  return (
    <div 
      className="d-flex flex-ai-center" 
      style={{width: "100px", 
        borderRadius: "5px",
        border: "1px solid #C2C2C2"
        }}
      >
      <div className="width-20 d-flex flex-ai-center flex-jc-center">
        <button className="d-flex flex-ai-center flex-jc-center" onClick={() => onSizeAdd(-1)}>
          <FiMinus />
        </button>
      </div>
      <div className="width-60" style={{
        border: "1px solid #C2C2C2",
        borderStyle: "none solid",
      }}>
        <input className="width-100 text-center" value={size} type="number" onChange={(e) => {onSizeChange(e.target.value)}}></input>
      </div>
      <div className="width-20 d-flex flex-ai-center flex-jc-center">
        <button className="d-flex flex-ai-center flex-jc-center" onClick={() => onSizeAdd(1)}>
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

const FontStyle = () => {
  const [style, setStyle] = useState("標楷體");
  const onStyleChange = (name) => {
    setStyle(name)
  }
  return (
    <div 
      className="d-flex flex-ai-center" 
      style={{
        width: "100px", 
        borderRadius: "5px",
        border: "1px solid #C2C2C2",
        position: "relative"
        }}
      >
      <div className="width-100" style={{
        border: "1px solid #C2C2C2",
        borderStyle: "none solid",
      }}>
        <select className="width-100 text-center" 
          value={style} 
          type="number" 
          onChange={(e) => {onStyleChange(e.target.value)}}>
            <option value={'新細明體'}>{"新細明體"}</option>
            <option value={'微軟黑體'}>{"微軟黑體"}</option>
            <option value={'蘭陽明體'}>{"蘭陽明體"}</option>
        </select>
      </div>
    </div>
  );
}

const FontButton = ({children}) => {
  const dispatch = useStudioDispatch()
  const studio = useStudio()
  const activeItem = studio.json.children.filter(e => e.id === studio.meta.active?.id)[0]
  const [checked, setChecked] = useState(false);
  return (
    <div
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "5px",
        background: !checked ? "transparent" : "rgba(33, 129, 0, 0.46)",
      }}
    >
      <button
        className="width-100 height-100 d-flex flex-ai-center flex-jc-center"
        onMouseDown={(e) => {
          if(!activeItem){return false}
          e.preventDefault();
          const selection = window.getSelection();
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');
          span.style["fontWeight"] = 'bold';
          range.surroundContents(span);
          const newHTMLString = document.getElementById('editable').innerHTML
          dispatch({
            type: "update",
            id: activeItem.id,
            item: {...activeItem, children: toolbarHtmlToObj(newHTMLString)}
          })

        }}
      >
        {children}
      </button>
    </div>
  );
};

export default Word;

// <p data-reactroot="">
//   <span style="font-size:16px;font-weight:bold">
//     台<span style="font-weight: bold;">南</span> 
//   </span>
//   <span style="font-size:20px;font-weight:bold">大興宮</span>
// </p>

// <p data-reactroot="">
//   <span style="font-size:12px;font-weight:bold;font-style:italic">眾弟子 </span>
//   <span style="font-style:italic;font-size:12px">敬獻</span>
// </p>