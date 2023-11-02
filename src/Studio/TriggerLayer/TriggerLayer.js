import Word from "./Word";
import Image from "./Image";
import Exit from "./Exit";
// test background image -----
import vector from "../../static/image/Vector.png";

const TriggerLayer = (props) => {
  const { 
    activeItem,
    jsonObj, 
    onChangeAct, 
    onChangeMode, 
    onChangeHov, 
    onRemoveAct, 
    onSetNotEditing
  } = props;
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
        const activeId = (activeItem)?activeItem.id:null
        if (obj.type === "word" && activeId !== obj.id) {
          return (
            <Word
              key={key}
              wordObj={obj}
              onChangeAct={onChangeAct}
              onChangeHov={onChangeHov}
              onChangeMode={onChangeMode}
            ></Word>
          );
        } else if(obj.type === "image" && activeId !== obj.id){
          return (
            <Image
              key={key}
              imageObj={obj}
              onChangeAct={onChangeAct}
              onChangeHov={onChangeHov}
              onChangeMode={onChangeMode}
            ></Image>
          );
        }else{
          return null
        }
      })}

    </div>
  );
};

export default TriggerLayer;
