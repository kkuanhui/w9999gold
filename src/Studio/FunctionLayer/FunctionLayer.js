import HoverFrame from "./HoverFrame";
import FocusFrame from "./FocusFrame";
import ResizeFrame from "./ResizeFrame";
import { useApp } from "../../Context";
import { useEffect, useState } from "react";

/**
 * The FunctionLayer is positioned above the BottomLayer to ensure that elements are not obscured by other elements in component Canvas.
 * It is responsible for handling various element editing functions, including content editing, resizing, and the right-click menu.
 */

const FunctionLayer = () => {
  const context = useApp();
  const hoverItem = context.studioMeta.hover;
  const active = context.studioMeta.active;
  const [activeItem, setActiveItem] = useState({});

  useEffect(() => {
    if(active){
      const item = context.productContent.children.filter(ele => ele.id === active.id)[0]
      setActiveItem(item)
    }
  }, [active])

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "0px",
        overflow: "none",
        zIndex: "2",
      }}
    >
      {hoverItem ? <HoverFrame></HoverFrame> : null}
      {active ? <FocusFrame></FocusFrame> : null}
    {
        (active && activeItem.type === 'image')
        ? <ResizeFrame></ResizeFrame>
        :null
      }
    </div>
  );
};

export default FunctionLayer;
