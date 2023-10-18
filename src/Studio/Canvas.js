import React, {useState, useRef, useEffect}  from 'react';
import Item from './Item';
import RightClick from './RightClick';
// css ------
import '../static/css/studio-item.css';
// test image ------
import vector from '../static/image/Vector.png';

const Canvas = (props) => {
  // states
  const [zoomIndex, setZoomIndex] = useState(1)
  const [activateItem, setActivateItem] = useState(null)
  // right click part state
  const [rcPosition, setRcPosition] = useState([0, 0])
  const [isRcOpen, setIsRcOpen] = useState(false)
  
  // ref -------------------------------------
  const component = useRef(null)

  // functions -------------------------------
  const zoom = (sign) => {
    if(sign === "in"){
      setZoomIndex(zoomIndex+0.1)
      component.current.style.scale = `${zoomIndex + 0.1}`
    }else{
      setZoomIndex(zoomIndex-0.1)
      component.current.style.scale = `${zoomIndex - 0.1}`
    }
  }

  useEffect(() => {
    const onRightClick = (e) => {
      if(e.target === component.current){
        // only effect on ref canvas
        e.preventDefault();
        setRcPosition([e.offsetX, e.offsetY])
        setIsRcOpen(true)
      }
    }
    component.current.oncontextmenu = onRightClick

    const onClick = (e) => {
      if(e.target === component.current){
        props.setOperateMode('normal')
        setActivateItem(0)
      }
    }
    component.current.onclick = onClick

  }, [])

  // UI --------------------------------------
  return(
    <div
      ref={component}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(180, 180, 180, 1)",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url('${vector}')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "50% auto",
      }}
    >

      {/* <div style={{width: "100%", height: "100%", zIndex: "-999"}} 
        onClick={() => {
          setActivateItem(0)
          props.setOperateMode('normal')
        }}>
      </div> */}

        {/* <div style={
          {
            position: "absolute", 
            top: "50%",
            left: "50%", 
            transform: "translate(-50%, -50%)",
            width: "50%"
          }
        }>
          <img style={{width: "100%"}} alt="vector" src={vector}></img>
        </div> */}

        {
          (isRcOpen)
          ?<RightClick 
            position={rcPosition} 
            onClose={() => setIsRcOpen(false)} 
            onPIAdd={props.onPIAdd}
          />
          :null
        }

        {props.productItems.slice(0, 1).map((ele, key) => {
          return(
            <Item
              key={key} // react require this
              activate={(activateItem === ele.id)}
              onActive={() => {
                setActivateItem(ele.id)
                props.setOperateMode(ele.type)                
              }}
              setOperateMode={props.setOperateMode}
              setRcPosition={setRcPosition}
              productInfo={ele}
              onPIChange={props.onPIChange}
              onPIDelete={props.onPIDelete}
            ></Item>
          )
        })}

    </div>
  )
}
  
export default Canvas;