import { useRef } from "react";
import "../../static/css/general/events.css";
import stevejobs from "../../static/image/steve-jobs.png"

const Image = (props) => {
  const component = useRef(null);
  const {imageObj, onChangeAct, onChangeMode, onChangeHov} = props;
  const style = {
        "position": "absolute",
        "top": imageObj.top,
        "left": imageObj.left,
        "zIndex": imageObj.zIndex,
        "width": `${imageObj.width}px`,
        "height": `${imageObj.height}px`
  }
  return(
    <img tabIndex="0" 
      className="user-select-none"
      ref={component}
      style={style} 
      alt="user custom" 
      src={stevejobs}
      onFocus={() => {
        onChangeMode('photo'); 
        onChangeAct({
          ...imageObj,
          width: component.current.offsetWidth,
          height: component.current.offsetHeight,
        });
        onChangeHov(null);
      }}
      onMouseEnter={() => {
        onChangeHov({
          top: imageObj.top,
          left: imageObj.left,
          width: component.current.offsetWidth,
          height: component.current.offsetHeight,
        })}
      }
      onMouseLeave={() => {onChangeHov(null)}}
    />
  )
}

export default Image;