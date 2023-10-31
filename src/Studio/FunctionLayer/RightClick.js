import React, {useEffect, useRef} from "react";
import "../static/css/class-1.css";

const RightClick = (props) => {
  // ref ------------------------
  const component = useRef(null)

  useEffect(() => {
    const closeMenu = (e)=>{
      if(!component.current.contains(e.target)){
        props.onClose()
        document.removeEventListener('mousedown', closeMenu)
      }
    }
    document.addEventListener('mousedown', closeMenu)
  }, [])

  return (
    <div
      ref={component}
      style={{
        background: "#fff",
        position: "absolute",
        zIndex: "999",
        borderRadius: "0px 10px 10px 10px",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        left: props.position[0],
        top: props.position[1],
        overflow: "hidden",
        width: "200px",
      }}
    >

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div 
          className="width-100 d-flex flex-jc-between flex-ai-end"
          onClick={() => {
            console.log(props)
            props.onPIAdd('word', props.position[0], props.position[1], null)
          }}
        >
          <span>新增文字</span>
          <span className="font-size-smaller text-color-6d6d6d">t</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>新增圖片</span>
          <span className="font-size-smaller text-color-6d6d6d">p</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>複製(copy)</span>
          <span className="font-size-smaller text-color-6d6d6d">cmd+c</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>貼上(paste)</span>
          <span className="font-size-smaller text-color-6d6d6d">cmd+v</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>剪下(cut)</span>
          <span className="font-size-smaller text-color-6d6d6d">cmd+x</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>重複(duplicate)</span>
          <span className="font-size-smaller text-color-6d6d6d">cmd+d</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>往前(brign forward)</span>
          <span className="font-size-smaller text-color-6d6d6d">{"cmd+]"}</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>往後(brign backward)</span>
          <span className="font-size-smaller text-color-6d6d6d">{"cmd+["}</span>
        </div>
      </div>

      <div className="hover-pointer hover-background-06f hover-color-fff p-3">
        <div className="width-100 d-flex flex-jc-between flex-ai-end">
          <span>刪除(delete)</span>
          <span className="font-size-smaller text-color-6d6d6d">delete</span>
        </div>
      </div>

    </div>
  );
};

export default RightClick;
