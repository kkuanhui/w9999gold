import { useEffect, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import { renderToString } from 'react-dom/server'
import { useApp, useAppDispatch } from "../../Context"
import { setCursorAtPosition, renderWordObject, genChildrenArr, cssTextToObj} from "../utilities"

const WordEditor = ({onEditing}) => {
  // context -----
  const context = useApp();
  const dispatch = useAppDispatch();
  const active = context.studioMeta.active // there must be an item being activtive
  const activeItem = context.productContent.children.filter(e => e.id === active.id)[0]
  // ref -----
  const component = useRef(null)
  // state -----
  const [isDisabled, setIsDisabled] = useState(true);
  const [cursorPos, setCursorPos] = useState([0, 0]);
  const madeHtml = renderToString(renderWordObject(activeItem)) 

  // function -----
  const itemStyleStatus = (itemObj) => {
    let protoStyle = {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "textDecoration": "underline",
      "writingMode": "vertical-rl",
      "fontSize": "12px",
      "fontFamily": "arial"
    }
    const checkStyle = (itemObj) => {
      if(itemObj.type){
      // if current layer is root
        protoStyle = {
          ...protoStyle, 
          "writingMode": itemObj.style.writingMode,
          "fontSize": itemObj.style.fontSize,
          "fontFamily": itemObj.style.fontFamily,
        }
      }
      itemObj.children.forEach(child => {
        if(
          protoStyle.fontWeight === 'normal' && 
          protoStyle.fontStyle === 'normal' &&
          protoStyle.textDecoration === 'none'
        ){
          return;
        }
        if(child.dom === "#text"){
          return;
        }else{
          if(child.style.fontWeight !== "bold")protoStyle = {...protoStyle, fontWeight: "normal"}
          if(child.style.fontStyle !== "italic") protoStyle = {...protoStyle, fontStyle: "normal"}
          if(child.style.textDecoration !== "underline") protoStyle = {...protoStyle, textDecoration: "none"}
          checkStyle(child)
        }
      })
    }
    checkStyle(itemObj)
    return protoStyle
  }

  const anchorToFocus = (anchorNode, focusNode) => {
    // sel refers to selection
    let queue = []
    let curNode = anchorNode
    let preNode = null
    while(preNode !== focusNode){
      queue.push(curNode.parentNode)
      preNode = curNode
      if(curNode.parentNode.nextSibling){
        curNode = curNode.parentNode.nextSibling.lastChild
      }else{
        if(curNode.parentNode.parentNode.nextSibling.tagName !== "P"){
          curNode = focusNode
        }else{
          curNode = curNode.parentNode.parentNode.nextSibling.firstChild.firstChild
        }
      }
    }
    return queue
  }

  const handleClick = (e) => {
    let nodesInRange = []
    if(isDisabled){
      // first click entering editing
      setIsDisabled(false);
      setCursorPos([e.clientX, e.clientY]);
      // after state isDisabled changed simulate click event
      const anchorEle = document.elementFromPoint(e.clientX, e.clientY);
      nodesInRange.push(anchorEle)
    }else{
      const sel = window.getSelection();
      const range = sel.getRangeAt(0)
      const startNode = range.startContainer
      const endNode = (range.endContainer.tagName === "P")?
                        range.endContainer.previousSibling.lastChild.lastChild:
                        range.endContainer
      if(startNode.data === "" && startNode.nodeName === "#text") return;
      nodesInRange = anchorToFocus(startNode, endNode)
    }
    const cssObjsInRange = nodesInRange.map(cssText =>  cssTextToObj(cssText))
    const style = cssObjsInRange.reduce((res, cur) => {
      if(cur.fontWeight !== "bold"){res.fontWeight = "normal"}
      if(cur.fontStyle !== "italic"){res.fontStyle = "normal"}
      if(cur.textDecoration !== "underline"){res.textDecoration = "none"}
      return res
    }, {
      "fontWeight": "bold",
      "fontStyle": "italic",
      "textDecoration": "underline"
    })
    dispatch({
      type: "toolbarWord",
      style: style,
    });
  }

  const handleMouseUp = (e) => {
    // Check if the mouse was previously down inside the component
    if(isDisabled) return;
    if(component.current && 
      !component.current.contains(e.target)) {
      handleClick(e);
    }
  }

  // life cycle -----
  useEffect(() => {
    if(isDisabled === false){
      setCursorAtPosition(cursorPos[0], cursorPos[1])
    }
  }, [isDisabled, cursorPos])

  useEffect(() => {
    const styleStatus = itemStyleStatus(activeItem)
    dispatch({
      type: "toolbarWord",
      style: styleStatus
    })
  },[])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDisabled]);

  return(
    <ContentEditable 
      style={{
        userSelect: 'none', 
        writingMode: activeItem.style.writingMode,
        fontFamily: activeItem.style.fontFamily,
        fontSize: activeItem.style.fontSize,
      }} 
      id="editable"
      innerRef={component}
      html={madeHtml} 
      disabled={isDisabled} // use true to disable editing
      tagName='div' 
      onMouseDown={() => {
        const sel = window.getSelection()
        sel.removeAllRanges();
      }}
      onClick={handleClick}
      onChange={(e) => {
        dispatch({
          type: "update",
          id: activeItem.id,
          item: {
            ...activeItem, 
            children: genChildrenArr(e.target.value)
          }
        })
      }}
      onFocus={() => {
        onEditing(true)
      }}
      onBlur={() => {
        setIsDisabled(true)
        onEditing(false)
        dispatch({
          type: "reset"
        })
      }}
    >
    </ContentEditable>
  )
}

export default WordEditor;