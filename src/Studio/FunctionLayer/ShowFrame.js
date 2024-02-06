import { useApp } from "../../Context"
import { renderWordObject } from "../utilities";

const ShowFrame = () => {
  // context -----
  const context = useApp();
  const activeId = context.studioMeta.active.id
  const children = context.productContent.children
  const activeItem = children.filter(e => e.id === activeId)[0]

  return(
    <div className="studio-word"
      style={{
        userSelect: 'none', 
        writingMode: activeItem.style.writingMode,
        fontFamily: activeItem.style.fontFamily,
        fontSize: activeItem.style.fontSize,
      }} >
      {renderWordObject(activeItem)}
    </div>
  )
}

export default ShowFrame;

