// component -----
import React, {useState}  from 'react';
import FunctionLayer from './FunctionLayer/FunctionLayer'; 
import TriggerLayer from './TriggerLayer/TriggerLayer'
import ExitLayer from './TriggerLayer/Exit';
// css ------

const Canvas = (props) => {
  // props -----
  const {onChangeMode, json} = props
  // states -----
  const [activeItem, setActiveItem] = useState(null)
  const [hoverItem, setHoverItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false);

  // UI --------------------------------------
  return(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(180, 180, 180, 1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <TriggerLayer
        jsonObj={json}
        activeItem={activeItem}
        onChangeAct={(infoObj) => setActiveItem(infoObj)}
        onChangeMode={onChangeMode}
        onChangeHov={(infoObj) => setHoverItem(infoObj)}
        onRemoveAct={() => setActiveItem(null)}
        onSetNotEditing={() => {setIsEditing(false)}}
      ></TriggerLayer>

      <FunctionLayer
        onRemoveAct={() => setActiveItem(null)}
        activeItem={activeItem}
        onChangeMode={onChangeMode}
        jsonObj={json}
        hoverItem={hoverItem}
        isEditing={isEditing}
        onSetIsEditing={() => {
          setIsEditing(true);
        }}
        onSetNotEditing={() => {
          setIsEditing(false);
        }}
      ></FunctionLayer>

    </div>
  )
}
  
export default Canvas;