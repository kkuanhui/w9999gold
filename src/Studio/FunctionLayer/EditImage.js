import { useApp } from "../../Context";

// image
const ImageEditor = () => {
  const context = useApp();
  const active = context.studioMeta.active
  const imageObj = context.productContent.children.filter(
    (e) => e.id === active.id
  )[0];
  return (
    <img
      unselectable="on"
      draggable={false}
      style={{
        width: `${imageObj.style.width}px`,
        height: `${imageObj.style.height}px`,
      }}
      alt="user custom"
      src={imageObj.src}
    />
  );
};

export default ImageEditor;
