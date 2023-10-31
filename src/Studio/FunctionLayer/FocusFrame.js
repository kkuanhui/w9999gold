import "../../static/css/custom-class.css";
import EditFrame from "./EditFrame";

import {useEffect, useRef, useState} from "react";
/*
  Moving
  image resizing
  wait to get into editmode
*/
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
  const [isEditable, setIsEditable] = useState(false)
  // ref -----
  const component = useRef(null)

  // life cycle -----
  useEffect(() => {
    component.current.focus()
  }, [])

  useEffect(() => {
    console.log('was dragged', wasDragged)
  }, [wasDragged])

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
      onDrop={() => {
        setWasDragged(false)
      }}
      onClick ={(e) => {
        console.log('clicked')
        if(wasDragged){
          setWasDragged(false)
          setIsEditable(false)
        }else{
          console.log('focus frame clicked')
          setIsEditable(true)
          // console.log(e.clientX, e.clientY)
          const clickE = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: e.clientX,
            clientY: e.clientY,
          });
          // document.elementFromPoint(e.clientX, e.clientY).dispatchEvent(clickE);
        }
      }}
      onMouseDown = {() => {onSetIsEditing()}}
    >
      {/* <EditFrame
        activeItem={activeItem}
        isEditing={isEditing}
        onRemoveAct={onRemoveAct}
        onChangeMode={onChangeMode}
        onSetIsEditing={onSetIsEditing}
        onSetNotEditing={onSetNotEditing}
        isEditable={isEditable}
      ></EditFrame> */}
    </div>
  )
}

export default FocusFrame;