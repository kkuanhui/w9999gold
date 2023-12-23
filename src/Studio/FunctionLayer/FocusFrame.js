import { useRef, useState, useEffect } from "react";
import EditFrame from "./EditFrame";
import ShowFrame from "./ShowFrame";
import EditImageFrame from "./EditImageFrame";
import ShowImageFrame from "./ShowImageFrame";
import Contextmenu from "./Contextmenu";
// css
import "../../static/css/custom-class.css";
import { useStudio, useStudioDispatch } from "../StudioContext";

const FocusFrame = () => {
  // context -----
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const active = studio.meta.active;
  const currentObj = studio.json.children.filter((e) => e.id === active.id)[0];
  // state -----
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing , setIsEditing ] = useState(false);
  const [position, setPosition] = useState(null)
  // ref -----
  const component = useRef(null);
  useEffect(() => {
    if(!isEditing){
      component.current.oncontextmenu = (e) => {
        e.preventDefault()
        setPosition([e.offsetX, e.offsetY])
      }
    }else{
      component.current.oncontextmenu = null
    }
  }, [isEditing])
  return (
    <div
      ref={component}
      style={{
        position: "absolute",
        zIndex: "1",
        top: `${currentObj.style.top - 2}px`,
        left: `${currentObj.style.left - 2}px`,
        border: "1px solid purple",
        padding: "1px",
        cursor: isDragging ? "move" : "auto",
      }}
      onMouseDown={() => {
        if(isEditing) return false;
        let top = currentObj.style.top;
        let left = currentObj.style.left;
        document.onmousemove = (e) => {
          setIsDragging(true);
          top = top + e.movementY;
          left = left + e.movementX;
          dispatch({
            type: "pos",
            item: {
              ...currentObj,
              style: {
                ...currentObj.style,
                top: top,
                left: left,
              }
            },
          });
        };
        document.onmouseup = () => {
          setIsDragging(false);
          document.onmouseup = null;
          document.onmousemove = null;
        };
      }}
    >
      <FocusOnWhat 
        isDragging={isDragging} 
        itemType={currentObj.type}
        onEditing={(tf) => setIsEditing(tf)}
      />
      {
        (position !== null)
        ?<Contextmenu position={position} onClose={() => setPosition(null)}></Contextmenu>
        :null
      }
    </div>
  );
};

const FocusOnWhat = ({ isDragging, itemType, onEditing}) => {
  if (itemType === "word") {
    if (!isDragging) {
      return <EditFrame onEditing={onEditing}></EditFrame>;
    } else {
      return <ShowFrame></ShowFrame>;
    }
  } else {
    if(!isDragging){
      return <EditImageFrame></EditImageFrame>
    }else{
      return <ShowImageFrame></ShowImageFrame>
    }
  }
};

export default FocusFrame;