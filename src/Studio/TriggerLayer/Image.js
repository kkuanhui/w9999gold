import { useRef } from "react";
import "../../static/css/general/events.css";
import stevejobs from "../../static/image/steve-jobs.png"
import { useStudioDispatch } from "../StudioContext";

const Image = ({idx, imageObj}) => {
  const component = useRef(null);
  const dispatch = useStudioDispatch();
  const style = {
        "position": "absolute",
        "top": imageObj.top,
        "left": imageObj.left,
        "zIndex": imageObj.zIndex,
        "width": `${imageObj.width}px`,
        "height": `${imageObj.height}px`
  }
  return(
    <img 
      tabIndex="0" 
      className="user-select-none"
      ref={component}
      style={style} 
      alt="user custom" 
      src={stevejobs}
      onFocus={() => {
        dispatch({
          type: "mode", 
          mode: 'image'
        });
        dispatch({
          type: "active",
          active: {
            id: idx,
            width: component.current.offsetWidth, 
            height: component.current.offsetHeight
          }
        })
        dispatch({
          type: "hover",
          hover: null
        })
      }}
      onMouseEnter={() => {
        dispatch({
          type: "hover",
          hover: {
            top: imageObj.top,
            left: imageObj.left,
            width: component.current.offsetWidth,
            height: component.current.offsetHeight,
          }
        })
      }}
      onMouseLeave={() => {
        dispatch({
          type: "hover",
          hover: null
        })
      }}
    />
  )
}

export default Image;