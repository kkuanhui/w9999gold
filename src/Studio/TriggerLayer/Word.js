import { useRef } from "react";
import "../../static/css/general/events.css";

const Word = (props) => {
  // props -----
  const {wordObj, onChangeAct, onChangeMode, onChangeHov} = props
  // ref -----
  const component = useRef(null);

  const style = {
    position: "absolute",
    zIndex: wordObj.zIndex,
    top: wordObj.top,
    left: wordObj.left
  }
  return(
    <div 
      ref={component}
      tabIndex="0" 
      className="user-select-none"
      style={style} 
      onFocus={() => {
        onChangeMode('word'); 
        onChangeAct({
          ...wordObj, 
          width: component.current.offsetWidth, 
          height: component.current.offsetHeight
        });
        onChangeHov(null);
      }}
      // onBlur ={() => {onChangeMode('normal'); onChangeAct(null)}}
      onMouseEnter={() => {
        onChangeHov({
          top: wordObj.top,
          left: wordObj.left,
          width: component.current.offsetWidth,
          height: component.current.offsetHeight,
        })}
      }
      onMouseLeave={() => {onChangeHov(null)}}
    >
      {wordObj.children.map((pObj, key) => {
        return <Paragraph pObj={pObj} key={key}></Paragraph>
      })}
    </div>
  )
}

const Paragraph = (props) => {
  const {pObj} = props
  return(
    <p>
      {pObj.children.map((spanObj, key) => {
        return <Span spanObj={spanObj} key={key}></Span>
      })}
    </p>
  )
}

const Span = (props) => {
  const {spanObj} = props
  const style = {
    fontSize: `${spanObj.fontSize}px`,
    fontFamily: spanObj.fontFamily,
    fontStyle: spanObj.italic ? "italic" : "normal",
    textDecoration: spanObj.underline ? "underline" : "none",
    fontWeight: spanObj.bold ? "bold" : "normal",
  };
  return <span style={style}>{spanObj.children}</span>;
};

export default Word;