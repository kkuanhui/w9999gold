import { useEffect, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import { renderToString } from 'react-dom/server'
import { useStudio, useStudioDispatch } from "../StudioContext"
import { setCursorAtPosition, renderWordObject, genChildrenArr, cssTextToObj} from "../utilities"

const EditFrame = ({onEditing}) => {
  // context -----
  const dispatch = useStudioDispatch();
  const studio = useStudio();
  const active = studio.meta.active // there must be an item being activtive
  const activeItem = studio.json.children.filter(e => e.id === active.id)[0]
  // ref -----
  const component = useRef(null)

  // state -----
  const [isDisabled, setIsDisabled] = useState(true);
  const [cursorPos, setCursorPos] = useState([0, 0]);
  const madeHtml = renderToString(renderWordObject(activeItem)) 

  // life cycle -----
  useEffect(() => {
    if(isDisabled === false){
      setCursorAtPosition(cursorPos[0], cursorPos[1])
    }
  }, [isDisabled, cursorPos])

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
      onClick={(e) => {
        if(isDisabled){
          setIsDisabled(false);
          setCursorPos([e.clientX, e.clientY])
          // after state isDisabled changed simulate click event
        }else{
          const sel = window.getSelection();
          const anchorParent = sel.anchorNode.parentNode;
          // console.log(parentOfText.style.cssText)
          const styleObj = cssTextToObj(anchorParent)
          console.log(styleObj)
        }
      }}
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

export default EditFrame;