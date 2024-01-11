import HoverFrame from "./HoverFrame";
import FocusFrame from "./FocusFrame";
import { useApp } from "../Context";

/**
 * The FunctionLayer is positioned above the BottomLayer to ensure that elements are not obscured by other elements in component Canvas.
 * It is responsible for handling various element editing functions, including content editing, resizing, and the right-click menu.
 */

const FunctionLayer = () => {
  const context = useApp();
  const hoverItem = context.studioMeta.hover;
  const activeItem = context.studioMeta.active;
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
      {activeItem ? <FocusFrame></FocusFrame> : null}
    </div>
  );
};

export default FunctionLayer;
