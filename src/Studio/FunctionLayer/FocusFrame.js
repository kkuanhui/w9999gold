import { useRef, useState, useEffect } from "react";
import Contextmenu from "./Contextmenu";
import EditWord from "./EditWord";
import ShowWord from "./ShowWord";
import EditImage from "./EditImage";
import ShowImage from "./ShowImage";
// css
import "../../static/css/custom-class.css";
import "../../static/css/studio.css"
import { useApp, useAppDispatch } from "../../Context";

const FocusFrame = () => {
  // context -----
  const context = useApp();
  const dispatch = useAppDispatch();
  const active = context.studioMeta.active;
  const activeItem = context.productContent.children.filter((e) => e.id === active.id)[0];
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
        border: (activeItem.type === "word")?"1px solid purple": null,
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
            type: "contentPos",
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
      return <EditWord onEditing={onEditing}></EditWord>;
    } else {
      return <ShowWord></ShowWord>;
    }
  } else {
    if(!isDragging){
      return <EditImage></EditImage>
    }else{
      return <ShowImage></ShowImage>
    }
  }
};

export default FocusFrame;