import { useApp, useAppDispatch } from "../../Context";
import "../../static/css/studio.css";

const ResizeFrame = () => {
  const context = useApp();
  const active = context.studioMeta.active;
  return (
    <div
      className="m-0 p-0"
      style={{
        position: "absolute",
        zIndex: "2",
        width: "100%",
        height: "0px",
        top: `${active.top}px`,
        left: `${active.left}px`,
      }}
    >
      <Lines></Lines>
      <Dots></Dots>
    </div>
  );
};

const Lines = () => {
  const context = useApp();
  const active = context.studioMeta.active;
  return (
    <>
      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: `${active.width + 4}px`,
          height: `1px`,
          backgroundColor: "black",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: `${active.width + 1}px`,
          width: "1px",
          height: `${active.height + 4}px`,
          backgroundColor: "black",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: `${active.height + 1}px`,
          left: `-2px`,
          width: `${active.width + 4}px`,
          height: `1px`,
          backgroundColor: "black",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "1px",
          height: `${active.height + 4}px`,
          backgroundColor: "black",
        }}
      ></div>
    </>
  );
};

const Dots = () => {
  const context = useApp();
  const active = context.studioMeta.active;
  const activeItem = context.productContent.children.filter(
    (ele) => ele.id === active.id
  )[0];
  const aspectRatio = active.width / active.height;
  const dispatch = useAppDispatch();

  const setItemAspectValue = (movementX, movementY) => {
    const imageItem = { ...activeItem };
    if (!imageItem.style.width || !imageItem.style.height) {
      imageItem.style.width = active.width;
      imageItem.style.height = active.height;
    }
    imageItem.style.width += movementX;
    // imageItem.style.height = imageItem.style.width * aspectRatio;

    imageItem.style.height += movementY;
    // imageItem.style.width = imageItem.style.height / aspectRatio;

    return imageItem;
  };

  return (
    <>
      <div name="upper-left"
        className="hover-cursor-nwse-resize"
        style={{
          background: "#fff",
          border: "1px solid black",
          height: "10px",
          width: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: "0px",
          left: "0px",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => {
          let top = activeItem.style.top;
          let left = activeItem.style.left;
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(-1 * e.movementX, -1 * e.movementY),
            });
            top += e.movementY;
            left += e.movementX;
            dispatch({
              type: "contentPos",
              item: {
                ...activeItem,
                style: {
                  ...activeItem.style,
                  top: top,
                  left: left,
                },
              },
            });
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }}
      ></div>

      <div name="upper-right"
        className="hover-cursor-nesw-resize"
        style={{
          background: "#fff",
          border: "1px solid black",
          height: "10px",
          width: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: "0px",
          left: active.width,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => {
          let top = activeItem.style.top;
          const left = activeItem.style.left;
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(e.movementX, -1 * e.movementY),
            });
            top = top + e.movementY;
            dispatch({
              type: "contentPos",
              item: {
                ...activeItem,
                style: {
                  ...activeItem.style,
                  top: top,
                  left: left,
                },
              },
            });

          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }}
      ></div>

      <div name="bottom-right"
        className="hover-cursor-nwse-resize"
        style={{
          background: "#fff",
          border: "1px solid black",
          height: "10px",
          width: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: active.height,
          left: active.width,
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => {
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(1 * e.movementX , 1 * e.movementY),
            });
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }}
      ></div>

      <div name="bottom-left"
        className="hover-cursor-nesw-resize"
        style={{
          background: "#fff",
          border: "1px solid black",
          height: "10px",
          width: "10px",
          borderRadius: "10px",
          position: "absolute",
          top: active.height,
          left: "0px",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => {
          const top = activeItem.style.top;
          let left = activeItem.style.left;
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue( -1 * e.movementX , 1 * e.movementY),
            });
            left = left + e.movementX;
            dispatch({
              type: "contentPos",
              item: {
                ...activeItem,
                style: {
                  ...activeItem.style,
                  top: top,
                  left: left,
                },
              },
            });
          };
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }}
      ></div>

    </>
  );
};

export default ResizeFrame;
