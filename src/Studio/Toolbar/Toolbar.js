import Normal from "./Normal";
import Word from "./Word";
import Photo from "./Photo";

const Toolbar = (props) => {
  return props.operateMode === "normal" ? (
    <Normal 
      testShowProductItems={props.testShowProductItems} 
      testShowProductMeta={props.testShowProductMeta}
    />
  ) : props.operateMode === "word" ? (
    <Word />
  ) : props.operateMode === "photo" ? (
    <Photo />
  ) : (
    <Normal />
  );
};

export default Toolbar;
