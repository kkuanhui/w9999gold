import stevejobs from "../../static/image/steve-jobs.png";
import { useStudio } from "../StudioContext";

// image
const EditImageFrame = () => {
  const studio = useStudio();
  const imageObj = studio.json.children.filter(
    (e) => e.id === studio.meta.active.id
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

export default EditImageFrame;
