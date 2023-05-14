import React, {useState, useRef} from 'react'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import './static/css/custom-view.css'

const CustomView = () => {
  const [zoomIndex, setZoomIndex] = useState(1)
  const dom = useRef(null)
  const container = useRef(null)

  const onDoubleClick = (e) => {
    dom.current.style.overflow = 'visible'
  }

  const zoom = (sign) => {
    if(sign === "in"){
      setZoomIndex(zoomIndex+0.1)
      container.current.style.scale = `${zoomIndex + 0.1}`
    }else{
      setZoomIndex(zoomIndex-0.1)
      container.current.style.scale = `${zoomIndex - 0.1}`
    }
  }

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
      onDoubleClick={() => {onDoubleClick()}}
    >
      <div style={{position: "absolute", top: "5px", right: "5px", display: "flex", gap: "10px"}}>
        <button onClick={() => {zoom('in')}}><AiOutlineZoomIn/></button>
        <button onClick={() => {zoom('out')}}><AiOutlineZoomOut/></button>
      </div>
      <div ref={container} id="custom-view-container">
        <CustomViewItem zoomIndex={zoomIndex}></CustomViewItem>
      </div>
    </div>
  )
}

// --------------------------------------------------------

const CustomViewItem = (props) => {

  const myContainer = useRef(null)
  const myContent = useRef(null)

  const onDrag = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    console.log('key down')
    pos11 = e.clientX
    pos12 = e.clientY
    myContainer.current.style.cursor  = `grab`
    document.onmousemove = (e) => {
      pos21 = e.clientX - pos11
      pos22 = e.clientY - pos12
      pos11 = e.clientX
      pos12 = e.clientY
      myContainer.current.style.left = `${myContainer.current.offsetLeft + (pos21/props.zoomIndex)}px`
      myContainer.current.style.top  = `${myContainer.current.offsetTop + (pos22/props.zoomIndex)}px`
      myContainer.current.style.cursor  = `grabbing`
    }
    document.onmouseup = (e) => {
      document.onmousemove = null
      myContainer.current.style.border = null
      myContainer.current.style.cursor  = `default`
    }
  } 

  const onReWidth = (e) => {
    let pos1 = 0, pos2 = 0
    console.log('re width', e)
    pos1 = e.clientX
    // first position
    document.onmousemove = (e) => {
      pos2 = e.clientX - pos1 //movement
      pos1 = e.clientX
      myContainer.current.style.offsetWidth = `${myContainer.current.offsetWidth - pos2/props.zoomIndex}px`
    } 
    document.onmouseup = () => {

    }
  }

  const onResize = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    pos11 = e.clientX
    pos12 = e.clientY
    document.querySelector('#custom-view').style.overflow = 'visible'
    document.onmousemove = (e) => {
      pos21 = e.clientX - pos11
      pos22 = e.clientY - pos12
      pos11 = e.clientX
      pos12 = e.clientY
      myContainer.current.style.left = `${myContainer.current.offsetLeft + (pos21/props.zoomIndex)}px`
      myContainer.current.style.top  = `${myContainer.current.offsetTop + (pos22/props.zoomIndex)}px`
    }
    document.onmouseup = () => {

    }
  } 


  return(
    <div 
      ref={myContainer}
      className='custom-view-item'
      style={{
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "3px",
        width: "200px",
        height: "150px",
      }}
    >

      <div 
        onMouseDown={(e) => {onReWidth(e)}}
        className="resize-border" 
        style={{cursor: "w-resize", top: "50%",  left: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(-100%, -50%)"}}></div>

      <div 
        onMouseDown={(e) => {onReWidth(e)}}
        className="resize-border" 
        style={{cursor: "e-resize", top: "50%", right: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(100%, -50%)"}}></div>

      <div 
        onMouseDown={(e) => {onResize(e)}}
        className="resize-border resize-dot" 
        style={{cursor: "nw-resize", top: "0px", left: "0px", transform: "translate(-50%, -50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        className="resize-border resize-dot" 
        style={{cursor: "ne-resize", top: "0px",    right: "0px", transform: "translate(50%, -50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        className="resize-border resize-dot" 
        style={{cursor: "se-resize", bottom: "0px", right: "0px", transform: "translate(50%, 50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        className="resize-border resize-dot" 
        style={{cursor: "sw-resize", bottom: "0px", left: "0px",  transform: "translate(-50%, 50%)"}}></div>

      <div 
        ref={myContent}
        onMouseDown={(e) => {onDrag(e)}}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "blue",
          opacity: "0.3",
        }}></div>

    </div>
  )

}

export default CustomView