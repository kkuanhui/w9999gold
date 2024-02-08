import { useState } from "react";
import Word from "./Word";
import Image from "./Image";
import Exit from "./Exit";
import Contextmenu from "./Contextmenu";
import { useApp } from "../../Context";
// test background image -----
import vector from "../../static/image/Vector.png";

const TriggerLayer = () => {
  const context = useApp();
  const [position, setPosition] = useState(null)
  return (
    <div
      id="trigger-layer"
      style={{
        boxSizing: "border-box",
        height: "100%",
        width: "100%",
        backgroundImage: `url("${vector}")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "95% auto",
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
      }}
    >

      <Exit></Exit>

      {
        context.productContent.children.map((item, key) => {
          const activeId = context.studioMeta.active?.id 
          if (item.type === "word" && activeId !== item.id) {
            return <Word key={key} idx={item.id} wordObj={item}></Word>;
          } else if (item.type === "image" && activeId !== item.id) {
            return <Image key={key} idx={item.id} imageObj={item}></Image>;
          } else {
            return null;
          }
        })
      }

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
