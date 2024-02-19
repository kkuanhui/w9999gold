import { useApp } from "../../Context";

// image
const EditImage = () => {
  const context = useApp();
  const active = context.studioMeta.active
  const imageObj = context.productContent.children.filter(e => e.id === active.id)[0];
  return (
    <img
      draggable={false}
      style={{
        width: `${imageObj.style.width}px`,
        height: `${imageObj.style.height}px`,
        userSelect: `none`,
      }}
      alt="user custom"
      src={imageObj.src}
    />
  );
};

export default EditImage;