import { useState } from "react";
import { useStudio } from "../StudioContext";
import Word from "./Word";
import Image from "./Image";
import Exit from "./Exit";
import Contextmenu from "./Contextmenu";
// test background image -----
import vector from "../../static/image/Vector.png";

const TriggerLayer = () => {
  const studio = useStudio();
  const [position, setPosition] = useState(null)
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
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
      }}
    >

      <Exit></Exit>

      {studio.json.children.map((item, key) => {
        const activeId = studio.meta.active?.id 
        if (item.type === "word" && activeId !== item.id) {
          return <Word key={key} idx={item.id} wordObj={item}></Word>;
        } else if (item.type === "image" && activeId !== item.id) {
          return <Image key={key} idx={item.id} imageObj={item}></Image>;
        } else {
          return null;
        }
      })}

      {
        (position !== null)
        ?<Contextmenu 
          position={position}
          onClose={() => {setPosition(null)}}>
          </Contextmenu>
        :null
      }

    </div>
  );
};

export default TriggerLayer;
