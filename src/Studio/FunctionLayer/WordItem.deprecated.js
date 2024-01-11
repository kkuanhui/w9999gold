/**
 * a contenteditable component
 * this component realize "word block" in studio canvas
 * 
 * resource: 
 * https://www.smashingmagazine.com/2021/05/building-wysiwyg-editor-javascript-slatejs/
 */
import React, { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

const WordItem = (props) => {

  // props -----
  const { productInfo, onPIChange, onPIDelete, isActive, onActive} = props;
  // state -----
  const [focusItem, setFocusItem] = useState(document.activeElement);
  const [isEditing, setIsEditing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  // ref -----
  const component = useRef(null);
  // event handler -----
  const onMove = (e) => {
    // move component -----
    let pos11 = 0,
      pos12 = 0,
      pos21 = 0,
      pos22 = 0;
    pos11 = e.clientX;
    pos12 = e.clientY;

    document.onmousemove = (e) => {
      setIsMoving(true);
      if(!isActive){
        // force to become active item
        console.log('active made')
        onActive()
      }
      component.current.style.cursor = 'move'
      pos21 = e.clientX - pos11;
      pos22 = e.clientY - pos12;
      pos11 = e.clientX;
      pos12 = e.clientY;
      component.current.style.left = `${
        component.current.offsetLeft + pos21
      }px`;
      component.current.style.top = `${
        component.current.offsetTop + pos22
      }px`;
      document.onmouseup = (e) => {
        setIsMoving(false);
        component.current.style.cursor = 'default'
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };

    document.onmouseup = (e) => {
      setIsMoving(false);
      component.current.style.cursor = 'default'
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };

  // life cycle -----
  useEffect(() => {
    console.log(isEditing)
  }, [isEditing])
  const handleFocusIn = (e) => {
    setFocusItem(document.activeElement);
  }
  useEffect(() => {
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('focusin', handleFocusIn)
    };
  }, [])
  
  // ui -----
  return (
    <ContentEditable
      tagName="div" 
      html={`
        <p style="cursor: inherit;"}>
          功在蘋果
        </p>
        <p style="cursor:inherit;">
          眾弟子 <span style="cursor:inherit;font-weight: bold">敬獻</span>
        </p>`}
      innerRef={component}
      disabled={!isActive || isMoving} 
      className="custom-view-item"
      onMouseDown={(e) => {
        const check = (focusItem == component.current)
        if(!check){
          onMove(e);
        }else{
          console.log(`can't move`)
        }
      }}
      // onFocus={() => {
      //   setIsEditing(true)
      //   console.log('focusing ')
      // }}
      onBlur={() => {
        setIsEditing(false)
        console.log('blurring')
      }}
      onClick={() => {
        // lunched after onmousedown
        onActive();
      }}
      style={{
        cursor: (isEditing)?"auto":"default",
        userSelect: (isEditing)?"auto":"none",
        position: "absolute",
        padding: "3px",
        backgroundColor: "transparent",
        border: (isActive)?"3px solid green":"",
        // custom part -----
        zIndex: "10",
        fontSize: "24px",
        top: "100px",
        left: "100px",
      }}
    >
    </ContentEditable>
  );
};

export default WordItem;