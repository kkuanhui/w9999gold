import { useRef, useEffect } from "react";
import { useAppDispatch } from "../../Context";
import "../../static/css/studio.css";
import "../../static/css/custom-class.css";
import "../../static/css/general/events.css";

const Contextmenu = ({ onClose, position }) => {
  const component = useRef(null);
  const dispatch = useAppDispatch();
  
  const manualClose = () => {
    onClose();
    document.onmousedown = null
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
          dispatch({
            type: "contentPaste",
            position: position
          })
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>貼上(paste)</span>
        </div>
      </div>

      <div
        onClick={() => {
          dispatch({
            type: "contentAddNewWord",
            position: position
          })
          manualClose()
        }}
        className="hover-cursor-pointer hover-background-06f hover-color-fff p-3"
      >
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>新增文字(add text)</span>
        </div>
      </div>

      <label className="hover-background-06f hover-color-fff p-3 hover-cursor-pointer user-select-none width-100 d-flex flex-jc-between flex-ai-end">
        <input 
          type="file" 
          accept="image/jpeg, image/png" 
          style={{height: "100%", display: "none"}}
          onChange={(e) => {
            const fileList = e.target.files;
            console.log('addon new word block')
            dispatch({
              type: "contentAddNewImage",
              src: URL.createObjectURL(fileList[0]),
              position: position
            })
            manualClose()
          }}
        />
        新增圖片(add image)
      </label>

    </div>
  );
};

export default Contextmenu;