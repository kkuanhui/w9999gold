import { useRef, useState, useEffect } from "react";
import WordEditor from "./WordEditor";
import ShowFrame from "./ShowFrame";
import EditImageFrame from "./EditImageFrame";
import ShowImageFrame from "./ShowImageFrame";
import Contextmenu from "./Contextmenu";
// css
import "../../static/css/custom-class.css";
import { useApp, useAppDispatch } from "../../Context";

const FocusFrame = () => {
  // context -----
  const context = useApp();
  const dispatch = useAppDispatch();
  const active = context.studioMeta.active;
  const activeItem = context.customizedContext.children.filter((e) => e.id === active.id)[0];
  // state -----
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing , setIsEditing ] = useState(false);
  const [position, setPosition] = useState(null)
  // ref -----
  const component = useRef(null);
  // lifecycle -----
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
        top: `${activeItem.style.top - 2}px`,
        left: `${activeItem.style.left - 2}px`,
        border: "1px solid purple",
        padding: "1px",
        cursor: isDragging ? "move" : "auto",
      }}
      onMouseDown={() => {
        // to move item
        if(isEditing) return false;
        let top = activeItem.style.top;
        let left = activeItem.style.left;
        document.onmousemove = (e) => {
          setIsDragging(true);
          top = top + e.movementY;
          left = left + e.movementX;
          dispatch({
            type: "pos",
            item: {
              ...activeItem,
              style: {
                ...activeItem.style,
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
        itemType={activeItem.type}
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
      return <WordEditor onEditing={onEditing}></WordEditor>;
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