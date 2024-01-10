import Normal from "./Normal";
import Word from "./Word";
import Photo from "./Photo";
import { useStudio } from "../Context";

const Toolbar = () => {
  const studio = useStudio();
  const mode = studio.meta.mode;
  const active = studio.meta.active
  return active=== null ?(
    <Normal />
  ): mode === "normal" ? (
    <Normal />
  ) : mode === "word" ? (
    <Word />
  ) : mode === "image" ? (
    <Photo />
  ) : (
    <Normal />
  );
};

export default Toolbar;
