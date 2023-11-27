import HoverFrame from "./HoverFrame";
import FocusFrame from "./FocusFrame";

/**
 * The FunctionLayer is positioned above the BottomLayer to ensure that elements are not obscured by other elements in component Canvas.
 * It is responsible for handling various element editing functions, including content editing, resizing, and the right-click menu.
 */
const FunctionLayer = (props) => {
  // destructure
  const { 
    activeItem, 
    hoverItem, 
    onChangeMode, 
    onRemoveAct, 
    isEditing,
    onSetIsEditing, 
    onSetNotEditing
  } = props;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "0px",
        zIndex: "2",
      }}
    >
      {hoverItem ? <HoverFrame hoverItem={hoverItem}></HoverFrame> : null}

      {activeItem ? (
        <FocusFrame
          activeItem={activeItem}
          onRemoveAct={onRemoveAct}
          onChangeMode={onChangeMode}
          isEditing={isEditing}
          onSetIsEditing={onSetIsEditing}
          onSetNotEditing={onSetNotEditing}
        ></FocusFrame>
      ) : null}
    </div>
  );
};

export default FunctionLayer;
