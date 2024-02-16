import { useApp, useAppDispatch } from "../../Context";
import "../../static/css/studio.css";

const ResizeFrame = () => {
  const context = useApp();
  const active = context.studioMeta.active
  const activeItem = context.productContent.children.filter(ele => ele.id === active.id)[0]
  const aspectRatio = (active.width/ active.height);
  const dispatch = useAppDispatch();

  const setItemAspectValue = (movementX, movementY) => {
    const imageItem = {...activeItem}
    if(!imageItem.style.width || !imageItem.style.height){
      imageItem.style.width = active.width
      imageItem.style.height = active.height
    }
    imageItem.style.width += movementX
    imageItem.style.height = imageItem.style.width * aspectRatio;
    imageItem.style.height += movementY
    imageItem.style.width = imageItem.style.height / aspectRatio;
    return imageItem
  }
  return (
    <div
      className="m-0 p-0"
      style={{
        position: "absolute",
        zIndex: "2",
        width: "100%",
        height: "100%",
        top: `${active.top}px`,
        left: `${active.left}px`,
      }}
    >

      <div
        name="up"
        className="m-0 p-0 hover-cursor-n-resize"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: `${active.width + 4}px`,
          height: `1px`,
          backgroundColor: "black",
        }}
        onMouseDown={() => {
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(0, e.movementY)
            })
          }
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }}
      ></div>

      <div
        name="right"
        className="m-0 p-0 hover-cursor-e-resize"
        style={{
          position: "absolute",
          top: "-2px",
          left: `${active.width + 1}px`,
          // this one is tricky. from left 0 add width + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          width: "1px",
          height: `${active.height + 4}px`,
          backgroundColor: "black",
        }}
        onMouseDown={() => {
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(e.movementX, 0)
            })
          }
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }}
      ></div>

      <div
        name="bottom"
        className="m-0 p-0 hover-cursor-s-resize"
        style={{
          position: "absolute",
          top: `${active.height + 1}px`,
          // this one is tricky. from top 0 add height + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          left: `-2px`,
          width: `${active.width + 4}px`,
          height: `1px`,
          backgroundColor: "black",
        }}
        onMouseDown={() => {
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(0, e.movementY)
            })
          }
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }}
      ></div>

      <div
        name="left"
        className="m-0 p-0 hover-cursor-w-resize"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "1px",
          height: `${active.height + 4}px`,
          backgroundColor: "black",
        }}
        onMouseDown={() => {
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: setItemAspectValue(e.movementX, 0)
            })
          }
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }}
      ></div>

    </div>
  );
};

export default ResizeFrame;
