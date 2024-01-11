import Normal from "./Normal";
import Word from "./Word";
import Photo from "./Photo";
import { useApp } from "../Context";

const Toolbar = () => {
  const context = useApp();
  const mode = context.studioMeta.mode;
  const active = context.studioMeta.active
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
