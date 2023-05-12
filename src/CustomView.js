import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import './static/css/custom-view.css'
import { opacity } from '@cloudinary/url-gen/actions/adjust'

const CustomView = () => {
  const [zoomIndex, setZoomIndex] = useState(1)

  const onDoubleClick = (e) => {
    document.querySelector('#custom-view').style.overflow = 'visible'
  }

  const zoom = (sign) => {
    if(sign === "in"){
      setZoomIndex(zoomIndex+0.1)
      document.querySelectorAll('#custom-view-container').forEach(ele => {
        ele.style.scale = `${zoomIndex + 0.1}`
      })
    }else{
      setZoomIndex(zoomIndex-0.1)
      document.querySelectorAll('#custom-view-container').forEach(ele => {
        ele.style.scale = `${zoomIndex - 0.1}`
      })
    }
  }

  return(
    <div
      className="mb-3"
      id="custom-view"
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
      <div id="custom-view-container">
        <CustomViewItem zoomIndex={zoomIndex}></CustomViewItem>
      </div>
    </div>
  )
}

const CustomViewItem = (props) => {

  const myContainer = useRef(null)

  const onMouseDownDrag = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    console.log('key down')
    pos11 = e.clientX
    pos12 = e.clientY
    document.querySelector('#custom-view').style.overflow = 'visible'
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
    document.onmouseup = closeDrag
  } 

  const closeDrag = (e) => {
    myContainer.current.style.border = null
    myContainer.current.style.cursor  = `default`
    document.onmousemove = null
    document.querySelector('#custom-view').style.overflow = 'hidden'
  }

  const onMouseReWidth = (e) => {
    console.log('re width')
  }
  const onMouseReSize = (e) => {
    console.log('re size')
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
    document.onmouseup = closeDrag
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
        className="resize-border" 
        onMouseDown={(e) => {onMouseReWidth(e)}}
        style={{cursor: "e-resize", top: "50%",  left: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(-100%, -50%)"}}></div>

      <div 
        className="resize-border" 
        onMouseDown={(e) => {onMouseReWidth(e)}}
        style={{cursor: "w-resize", top: "50%", right: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(100%, -50%)"}}></div>

      <div className="resize-border resize-dot" style={{cursor: "se-resize", top: "0px", left: "0px", transform: "translate(-50%, -50%)"}}></div>
      <div className="resize-border resize-dot" style={{cursor: "sw-resize", top: "0px",    right: "0px", transform: "translate(50%, -50%)"}}></div>
      <div className="resize-border resize-dot" style={{cursor: "se-resize", bottom: "0px", right: "0px", transform: "translate(50%, 50%)"}}></div>
      <div className="resize-border resize-dot" style={{cursor: "sw-resize", bottom: "0px", left: "0px",  transform: "translate(-50%, 50%)"}}></div>

      <div 
      onMouseDown={(e) => {onMouseDownDrag(e)}}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "blue",
        opacity: "0.3",
      }}>

      </div>

    </div>
  )

}

export default CustomView

// reference: https://www.w3schools.com/howto/howto_js_draggable.asp
// dom manipulation
//Make the DIV element draggagle:


// dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// reference: https://stackoverflow.com/questions/43692714/how-to-zoom-container-div-and-all-its-contents-to-a-specific-size
// zoom in 

function setZoom(zoom,el) {
      
      var transformOrigin = [0,0];
	    // el = el || instance.getContainer();
	    var p = ["webkit", "moz", "ms", "o"],
            s = "scale(" + zoom + ")",
            oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";

	    for (var i = 0; i < p.length; i++) {
	        el.style[p[i] + "Transform"] = s;
	        el.style[p[i] + "TransformOrigin"] = oString;
	    }

	    el.style["transform"] = s;
	    el.style["transformOrigin"] = oString;
      
}

//setZoom(5,document.getElementsByClassName('container')[0]);

function showVal(a){
   var zoomScale = Number(a)/10;
   setZoom(zoomScale,document.getElementsByClassName('container')[0])
}