import Normal from "./Normal";
import Word from "./Word";
import Photo from "./Photo";
import { useStudio } from "../StudioContext";

const Toolbar = () => {
  const studio = useStudio();
  const mode = studio.meta.mode;
  return mode === "normal" ? (
    <Normal 
      testShowProductItems={mode.testShowProductItems} 
      testShowProductMeta={mode.testShowProductMeta}
    />
  ) : mode === "word" ? (
    <Word />
  ) : mode === "image" ? (
    <Photo />
  ) : (
    <Normal />
  );
};

export default Toolbar;
