import { useRef } from "react";
import { useStudioDispatch} from "../Context";
import "../../static/css/general/events.css";
import { renderWordObject } from "../utilities";

const Word = ({idx, wordObj}) => {
  const dispatch = useStudioDispatch();
  const component = useRef(null);
  return(
    <div 
      ref={component}
      tabIndex="0" 
      className="user-select-none"
      style={{
        position: "absolute",
        writingMode: wordObj.style.writingMode,
        fontFamily: wordObj.style.fontFamily,
        fontSize: wordObj.style.fontSize,
        zIndex: wordObj.style.zIndex,
        top: wordObj.style.top,
        left: wordObj.style.left
      }} 
      onFocus={() => {
        dispatch({
          type: "mode", 
          mode: 'word'
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
            top: wordObj.style.top,
            left: wordObj.style.left,
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
    >
      {renderWordObject(wordObj)}
    </div>
  )
}

export default Word;