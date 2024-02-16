import { useApp, useAppDispatch } from "../../Context";
import "../../static/css/studio.css";

const ResizeFrame = () => {
  const context = useApp();
  const dispatch = useAppDispatch();

  const whRatio = context.studioMeta.active;
  console.log(whRatio.width, whRatio.height)

  const active = context.studioMeta.active
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
          console.log('down')
          document.onmousemove = (e) => {
            dispatch({
              type: "contentImageUpdate"
            })
            console.log(e.movementY)
          }
          document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: `${active.width + 1}px`,
          // this one is tricky. from left 0 add width + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
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
          // this one is tricky. from top 0 add height + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
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

    </div>
  );
};

export default ResizeFrame;
