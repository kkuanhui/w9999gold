import { useEffect, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import { renderToString } from 'react-dom/server'
import { setCursorAtPosition } from "./gptTest"
import { useStudio, useStudioDispatch } from "../StudioContext"
import { renderWordObject } from "../utilities"

const EditFrame = ({onEditing}) => {
  // context -----
  const dispatch = useStudioDispatch();
  const studio = useStudio();
  const activeItem = studio.json.children.filter(e => e.id === studio.meta.active.id)[0]
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
      style={{userSelect: 'none'}} 
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
        }
      }}
      onChange={(e) => {
        dispatch({
          type: "update",
          id: activeItem.id,
          item: {...activeItem, children: htmlToObj(e.target.value)}
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