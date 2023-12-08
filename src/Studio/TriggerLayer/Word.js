import { useRef } from "react";
import { useStudioDispatch} from "../StudioContext";
import "../../static/css/general/events.css";

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
        zIndex: wordObj.zIndex,
        top: wordObj.top,
        left: wordObj.left
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
      // onBlur ={() => {onChangeMode('normal'); onChangeAct(null)}}
      onMouseEnter={() => {
        dispatch({
          type: "hover",
          hover: {
            top: wordObj.top,
            left: wordObj.left,
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
      {WObj(wordObj)}
    </div>
  )
}

const WObj = (wordObj) => {
  const children = wordObj.children
  return children.map((item, key) => {
    const dom = item.dom
    if(dom === "p"){
      return <p key={key}>{WObj(item)}</p>
    }else if(dom === "span"){
      return (
        <span 
          key={key} 
          style={{
            fontSize: `${item.fontSize}px`,
            fontFamily: item.fontFamily,
            fontStyle: item.italic,
            fontWeight: item.bold,
            textDecoration: item.underline
          }}
        >
          {WObj(item)}
        </span>
      )
    }else{
      return item.children
    }
  })
} 

export default Word;