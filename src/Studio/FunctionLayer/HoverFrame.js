import { useApp } from "../../Context";

const HoverFrame = () => {
  const context = useApp();
  const hover = context.studioMeta.hover
  return (
    <div
      className="m-0 p-0"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: `${hover.top}px`,
        left: `${hover.left}px`,
      }}
    >
      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: `${hover.width + 4}px`,
          height: `1px`,
          backgroundColor: "green",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: `${hover.width + 1}px`,
          // this one is tricky. from left 0 add width + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          width: "1px",
          height: `${hover.height + 4}px`,
          backgroundColor: "green",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: `${hover.height + 1}px`,
          // this one is tricky. from top 0 add height + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          left: `-2px`,
          width: `${hover.width + 4}px`,
          height: `1px`,
          backgroundColor: "green",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: "1px",
          height: `${hover.height + 4}px`,
          backgroundColor: "green",
        }}
      ></div>

    </div>
  );
};

export default HoverFrame;
