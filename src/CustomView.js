import React, {useState, useRef, useEffect} from 'react'
import './static/css/custom-view.css'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'

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
        <CustomViewItem zoomIndex={zoomIndex}></CustomViewItem>
      </div>
    </div>
  )
}

const CustomViewItem = (props) => {

  const myDiv = useRef(null)

  const onMouseDown = (e, b) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    pos11 = e.clientX
    pos12 = e.clientY
    document.querySelector('#custom-view').style.overflow = 'visible'
    document.onmousemove = (e) => {
      pos21 = e.clientX - pos11
      pos22 = e.clientY - pos12
      pos11 = e.clientX
      pos12 = e.clientY
      myDiv.current.style.left = `${myDiv.current.offsetLeft + (pos21/props.zoomIndex)}px`
      myDiv.current.style.top  = `${myDiv.current.offsetTop + (pos22/props.zoomIndex)}px`
    }
    document.onmouseup = closeDrag
  } 

  const closeDrag = (e) => {
    document.onmousemove = null
    document.querySelector('#custom-view').style.overflow = 'hidden'
  }

  return(
    <div 
      ref={myDiv} 
      className='custom-view-item'
      style={{
        position: "absolute", 
        width: "50px", 
        height: "50px", 
        top: "100",
        left: "100",
        border: "1px solid green",
      }}
      onMouseDown={(e) => {onMouseDown(e)}}
    ></div>
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