const HoverFrame = (props) => {
  const { hoverItem } = props;
  return (
    <div
      className="m-0 p-0"
      style={{
        position: "absolute",
        width: "0px",
        height: "0px",
        top: `${hoverItem.top}px`,
        left: `${hoverItem.left}px`,
      }}
    >
      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          width: `${hoverItem.width + 4}px`,
          height: `1px`,
          backgroundColor: "green",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: "-2px",
          left: `${hoverItem.width + 1}px`,
          // this one is tricky. from left 0 add width + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          width: "1px",
          height: `${hoverItem.height + 4}px`,
          backgroundColor: "green",
        }}
      ></div>

      <div
        className="m-0 p-0"
        style={{
          position: "absolute",
          top: `${hoverItem.height + 1}px`,
          // this one is tricky. from top 0 add height + 1px (blank) + 1px (line thickness) so line lies outside of div area +2px.
          left: `-2px`,
          width: `${hoverItem.width + 4}px`,
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
          height: `${hoverItem.height + 4}px`,
          backgroundColor: "green",
        }}
      ></div>

    </div>
  );
};

export default HoverFrame;
