import { useRef } from "react";
import "../../static/css/general/events.css";
import stevejobs from "../../static/image/steve-jobs.png"
import { useAppDispatch } from "../Context";

const Image = ({idx, imageObj}) => {
  const component = useRef(null);
  const dispatch = useAppDispatch();
  const style = {
        "position": "absolute",
        "top": imageObj.style.top,
        "left": imageObj.style.left,
        "zIndex": imageObj.style.zIndex,
        "width": `${imageObj.style.width}px`,
        "height": `${imageObj.style.height}px`
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
            top: imageObj.style.top,
            left: imageObj.style.left,
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