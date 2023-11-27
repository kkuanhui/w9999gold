import {useRef, useState} from "react";
import EditFrame from "./EditFrame";
import "../../static/css/custom-class.css";

const FocusFrame = (props) => {
  // props -----
  const {
    activeItem, 
    onChangeMode, 
    onRemoveAct, 
    isEditing,
    onSetIsEditing,
    onSetNotEditing
  } = props;

  // state -----
  const [wasDragged, setWasDragged] = useState(false)
  // ref -----
  const component = useRef(null)

  // life cycle -----
  // useEffect(() => {
  //   component.current.focus()
  // }, [])

  return(
    <div 
      ref={component}
      // tabIndex={0} // make it enable to receive focus
      style={{
        position: "absolute",
        zIndex: "1",
        top: `${activeItem.top-2}px`,
        left: `${activeItem.left-2}px`,
        width: `${activeItem.width+4}px`,
        height: `${activeItem.height+4}px`,
        border: "1px solid purple",
        padding: "1px",
        cursor: (wasDragged)?"move":"auto"
      }}
      draggable={true} 
      onDrag={() => {
        component.current.focus()
        setWasDragged(true)
      }}
      onDragEnd={() => {
        setWasDragged(false)
      }}
    >
      <EditFrame
        activeItem={activeItem}
        isEditing={isEditing}
        onRemoveAct={onRemoveAct}
        onChangeMode={onChangeMode}
        onSetIsEditing={onSetIsEditing}
        onSetNotEditing={onSetNotEditing}
      ></EditFrame>
    </div>
  )
}

export default FocusFrame;