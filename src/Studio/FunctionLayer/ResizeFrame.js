import { useApp } from "../../Context";

const HoverFrame = () => {
  const context = useApp();
  const active = context.studioMeta.active
  return (
    <div
      className="m-0 p-0"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: `${active.top}px`,
        left: `${active.left}px`,
      }}
    >
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

export default HoverFrame;
