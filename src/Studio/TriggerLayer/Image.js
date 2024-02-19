import { useRef } from "react";
import "../../static/css/general/events.css";
import { useAppDispatch } from "../../Context";

const Image = ({idx, imageObj}) => {
  const component = useRef(null);
  const dispatch = useAppDispatch();
  const style = {
    "position": "absolute",
    "top": imageObj.style.top,
    "left": imageObj.style.left,
    "zIndex": imageObj.style.zIndex,
    "borderRadius": imageObj.style.borderRadius,
    "width": `${imageObj.style.width}px`,
    "height": `${imageObj.style.height}px`,
  }
  return(
    <img 
      tabIndex="0" 
      className="user-select-none"
      ref={component}
      style={style} 
      alt="user custom" 
      src={imageObj.src}
      onFocus={() => {
        dispatch({
          type: "studioMode", 
          mode: 'image'
        });
        dispatch({
          type: "studioActive",
          active: {
            id: idx,
            top: imageObj.style.top,
            left: imageObj.style.left,
            width: component.current.offsetWidth, 
            height: component.current.offsetHeight
          }
        })
        dispatch({
          type: "studioHover",
          hover: null
        })
      }}
      onMouseEnter={() => {
        dispatch({
          type: "studioHover",
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
          type: "studioHover",
          hover: null
        })
      }}
    />
  )
}

export default Image;