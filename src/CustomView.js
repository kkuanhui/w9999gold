import React, {useState, useRef} from 'react'
import './static/css/custom-view.css'

const CustomView = () => {
  const content = useRef(null)
  return(
    <div
      className="mb-3"
      id="custom-view"
      style={{
        width: "100%",
        height: "min(100vw, 400px)",
        backgroundColor: "#DDDDDD",
        position: "relative",
      }}
    >
      <div ref={content} style={{width: "150px", height: "150px", border: "1px solid black"}}></div>
    </div>
  )
}

export default CustomView

// reference: https://www.w3schools.com/howto/howto_js_draggable.asp
// dom manipulation
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

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
	    el = el || instance.getContainer();
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