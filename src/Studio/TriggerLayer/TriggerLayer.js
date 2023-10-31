import Word from "./Word";
import Image from "./Image";
import Exit from "./Exit";
// test background image -----
import vector from "../../static/image/Vector.png";

const TriggerLayer = (props) => {
  const { jsonObj, onChangeAct, onChangeMode, onChangeHov, onRemoveAct, onSetNotEditing} = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundImage: `url("${vector}")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "50% auto",
        zIndex: 1,
      }}
    >
      <Exit
        onRemoveAct={onRemoveAct}
        onSetNotEditing={onSetNotEditing}
        onChangeMode={onChangeMode}
      ></Exit>
      {jsonObj.content.map((obj, key) => {
        if (obj.type === "word") {
          return (
            <Word
              key={key}
              wordObj={obj}
              onChangeAct={onChangeAct}
              onChangeHov={onChangeHov}
              onChangeMode={onChangeMode}
            ></Word>
          );
        } else {
          return (
            <Image
              key={key}
              imageObj={obj}
              onChangeAct={onChangeAct}
              onChangeHov={onChangeHov}
              onChangeMode={onChangeMode}
            ></Image>
          );
        }
      })}
    </div>
  );
};

export default TriggerLayer;
