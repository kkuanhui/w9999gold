import { useStudio } from "../StudioContext"
import { renderWordObject } from "../utilities";

const ShowFrame = () => {
  // context -----
  const studio = useStudio();
  const activeId = studio.meta.active.id
  const children = studio.json.children
  const activeItem = children.filter(e => e.id === activeId)[0]

  return(
    <div style={{userSelect: 'none',}} >
      {renderWordObject(activeItem)}
    </div>
  )
}

export default ShowFrame;

