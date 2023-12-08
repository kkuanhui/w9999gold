import { useRef, useEffect } from "react";
import { useStudioDispatch } from "../StudioContext";
import "../../static/css/custom-class.css";
import "../../static/css/general/events.css";

const Contextmenu = ({ onClose, position }) => {
  const component = useRef(null);
  const dispatch = useStudioDispatch();
  
  const manualClose = () => {
    document.onmousedown = null
    onClose();
  }
  
  useEffect(() => {
    const closeMenu = (e) => {
      if (!component.current.contains(e.target)) {
        document.onmousedown = null
        onClose();
      }
    };
    document.onmousedown = closeMenu
  }, []);

  return (
    <div
      ref={component}
      className="user-select-none"
      style={{
        background: "#fff",
        position: "absolute",
        zIndex: "999",
        borderRadius: "0px 10px 10px 10px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        left: position[0],
        top: position[1],
        overflow: "hidden",
        width: "200px",
      }}
    >

      <div
        onClick={() => {
          dispatch({type: "copy"})
          dispatch({type: "active", active: null})
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>複製(copy)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "cut"})
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>剪下(cut)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "sort",order: 'forward',})
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>往前(brign forward)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "sort",order: 'backward',})
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>往後(brign backward)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "sort",order: 'head',})
          dispatch({type: "active", active: null})
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>置前(send to front)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "sort",order: 'bottom'})
          dispatch({type: "active", active: null})
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>置後(send to back)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({type: "delete"})
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>刪除(delete)</span>
        </div>
      </div>

    </div>
  );
};

export default Contextmenu;