import stevejobs from "../../static/image/steve-jobs.png";
import { useApp } from "../../Context";

// image
const ShowImageFrame = () => {
  const context = useApp();
  const active = context.studioMeta.active
  const imageObj = context.productContent.children.filter(
    (e) => e.id === active.id
  )[0];
  return (
    <img
      draggable={false}
      style={{
        width: `${imageObj.style.width}px`,
        height: `${imageObj.style.height}px`,
      }}
      alt="user custom"
      src={stevejobs}
    />
  );
};

export default ShowImageFrame;
