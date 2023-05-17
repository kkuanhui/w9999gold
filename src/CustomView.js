import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import CustomViewItem from './CustomViewItem'
import './static/css/custom-view.css'

const CustomView = () => {
  const [zoomIndex, setZoomIndex] = useState(1)
  const [activateItem, setActivateItem] = useState(null)
  const [viewItems, setViewItems] = useState([
      {id: 1, content: "天上聖母"},
      {id: 2, content: "眾爐下 敬獻"},
  ])
  // ref
  const dom = useRef(null)
  const container = useRef(null)

  const zoom = (sign) => {
    if(sign === "in"){
      setZoomIndex(zoomIndex+0.1)
      container.current.style.scale = `${zoomIndex + 0.1}`
    }else{
      setZoomIndex(zoomIndex-0.1)
      container.current.style.scale = `${zoomIndex - 0.1}`
    }
  }

  // useEffect(() => {
  //   const myArray = [
  //     {id: 1},
  //     {id: 2},
  //     {id: 3},
  //   ]
  //   setTimeout(() => {
  //     setViewItems(myArray)
  //   }, 1000) 
  // }, [])

  return(
    <div
      className="mb-3"
      id="custom-view"
      ref = {dom}
      style={{
        width: "100%",
        height: "min(100vw, 400px)",
        backgroundColor: "#DDDDDD",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{position: "absolute", top: "5px", right: "5px", display: "flex", gap: "10px"}}>
        <button onClick={() => {zoom('in')}}><AiOutlineZoomIn/></button>
        <button onClick={() => {zoom('out')}}><AiOutlineZoomOut/></button>
      </div>

      <div style={{width: "100%", height: "100%", zIndex: "-999"}} onClick={() => {setActivateItem(0)}} ></div>

      <div ref={container} id="custom-view-container">

        {viewItems.map((ele, key) => {
          const isActivate = (activateItem === ele.id)?"true":"false"
          return (
            <CustomViewItem 
              key={ele.id} idx={ele.id} 
              activate={isActivate}
              setActivateItem={() => setActivateItem(ele.id)}
              content={ele.content}>
            </CustomViewItem>
          )
        })}

      </div>

    </div>
  )
}

export default CustomView