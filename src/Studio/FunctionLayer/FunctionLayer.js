import HoverFrame from "./HoverFrame";
import FocusFrame from "./FocusFrame";
import { useStudio } from "../StudioContext";

/**
 * The FunctionLayer is positioned above the BottomLayer to ensure that elements are not obscured by other elements in component Canvas.
 * It is responsible for handling various element editing functions, including content editing, resizing, and the right-click menu.
 */

const FunctionLayer = () => {
  const studio = useStudio();
  const hoverItem = studio.meta.hover;
  const activeItem = studio.meta.active;
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
