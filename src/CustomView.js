import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import './static/css/custom-view.css'

const CustomView = () => {
  const [zoomIndex, setZoomIndex] = useState(1)
  const [choosedItem, setChoosedItem] = useState(null)
  const dom = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    window.onclick = (e) => { 
      const isCanvasArea = e.target.getAttribute("iscanvasarea")
      const idx = e.target.getAttribute('idx')
      if(isCanvasArea){setChoosedItem(idx)}
    };
  })

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
      iscanvasarea={1}
      idx="0"
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
      <div ref={container} id="custom-view-container">
        <CustomViewItem iscanvasarea={1} idx="1" choosedItem={choosedItem}></CustomViewItem>
        <CustomViewItem iscanvasarea={1} idx="2" choosedItem={choosedItem}></CustomViewItem>
        <CustomViewItem iscanvasarea={1} idx="3" choosedItem={choosedItem}></CustomViewItem>
      </div>
    </div>
  )
}

// --------------------------------------------------------

const CustomViewItem = (props) => {

  const myContainer = useRef(null)
  const myContent = useRef(null)
  const [isclicked, setIsclicked] = useState("false")
  const [inEditMode, setInEditMode] = useState(false)
  const [content, setContent] = useState(props.idx)

  useEffect(() => {
    if(props.idx === props.choosedItem){
      setIsclicked("true")
    }else{
      setIsclicked("false")
      setInEditMode(false)
    }
  }, [props.choosedItem, props.idx])

  const onDrag = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    pos11 = e.clientX
    pos12 = e.clientY
    document.onmousemove = (e) => {
      pos21 = e.clientX - pos11
      pos22 = e.clientY - pos12
      pos11 = e.clientX
      pos12 = e.clientY
      myContainer.current.style.left = `${myContainer.current.offsetLeft + pos21}px`
      myContainer.current.style.top  = `${myContainer.current.offsetTop  + pos22}px`
    }
    document.onmouseup = (e) => {
      document.onmousemove = null
    }
  } 

  const onTouchDrag = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0 
    pos11 = e.touches[0].clientX
    pos12 = e.touches[0].clientY
    document.ontouchmove = (e) => {
      pos21 = e.touches[0].clientX - pos11
      pos22 = e.touches[0].clientY - pos12
      pos11 = e.touches[0].clientX
      pos12 = e.touches[0].clientY
      myContainer.current.style.left = `${myContainer.current.offsetLeft + pos21}px`
      myContainer.current.style.top  = `${myContainer.current.offsetTop  + pos22}px`
    }
    document.ontouchend = (e) => {
      document.ontouchmove = null
    }
  }

  const onReWidth = (e) => {
    let pos1 = 0, pos2 = 0
    pos1 = e.clientX
    // first position
    document.onmousemove = (e) => {
      pos2 = e.clientX - pos1 //movement
      pos1 = e.clientX
      myContainer.current.style.width = `${myContainer.current.offsetWidth + pos2}px`
    } 
    document.onmouseup = () => {
      document.onmousemove = null
    }
  }

  const onTouchReWidth = (e) => {
    let pos1 = 0, pos2 = 0
    pos1 = e.touches[0].clientX
    // first position
    document.ontouchmove = (e) => {
      pos2 = e.touches[0].clientX - pos1 //movement
      pos1 = e.touches[0].clientX
      myContainer.current.style.width = `${myContainer.current.offsetWidth + pos2}px`
    } 
    document.ontouchend = () => {
      document.ontouchmove = null
    }
  }

  const onResize = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0
    pos11 = e.clientX
    pos12 = e.clientY
    // first position
    document.onmousemove = (e) => {
      pos21 = e.clientX - pos11 //movement
      pos22 = e.clientY - pos12 //movement
      pos11 = e.clientX
      pos12 = e.clientY
      myContainer.current.style.width  = `${myContainer.current.offsetWidth  + pos21}px`
      myContainer.current.style.height = `${myContainer.current.offsetHeight + pos22}px`
    } 
    document.onmouseup = () => {
      document.onmousemove = null
    }
  } 

  const onTouchResize = (e) => {
    let pos11 = 0, pos12 = 0, pos21 = 0, pos22 = 0
    pos11 = e.touches[0].clientX
    pos12 = e.touches[0].clientY
    // first position
    document.ontouchmove = (e) => {
      pos21 = e.touches[0].clientX - pos11 //movement
      pos22 = e.touches[0].clientY - pos12 //movement
      pos11 = e.touches[0].clientX
      pos12 = e.touches[0].clientY
      myContainer.current.style.width  = `${myContainer.current.offsetWidth  + pos21}px`
      myContainer.current.style.height = `${myContainer.current.offsetHeight + pos22}px`
    } 
    document.ontouchend = () => {
      document.ontouchmove = null
    }
  } 

  return(
    <div 
      ref={myContainer}
      idx={props.idx}
      iscanvasarea={1}
      isclicked = {isclicked}
      className='custom-view-item'
      onClick={() => {
        if(isclicked === 'true'){
          setInEditMode(true)
        }
      }}
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
        onTouchStart={(e) => {onTouchReWidth(e)}}
        className="resize-border" 
        style={{cursor: "w-resize", top: "50%",  left: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(-100%, -50%)"}}></div>

      <div 
        onMouseDown={(e) => {onReWidth(e)}}
        onTouchStart={(e) => {onTouchReWidth(e)}}
        className="resize-border" 
        style={{cursor: "e-resize", top: "50%", right: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(100%, -50%)"}}></div>

      <div 
        onMouseDown={(e) => {onResize(e)}}
        onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "nw-resize", top: "0px", left: "0px", transform: "translate(-50%, -50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "ne-resize", top: "0px",    right: "0px", transform: "translate(50%, -50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "se-resize", bottom: "0px", right: "0px", transform: "translate(50%, 50%)"}}></div>
      <div 
        onMouseDown={(e) => {onResize(e)}}
        onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "sw-resize", bottom: "0px", left: "0px",  transform: "translate(-50%, 50%)"}}></div>

      <div 
        ref={myContent}
        iscanvasarea={1}
        idx={props.idx}
        onClick={() => {
          if(isclicked === 'true'){
            setInEditMode(true)
          }
        }}
        onMouseDown={(e) => {
          if(isclicked === 'true'){
            onDrag(e)
          }
        }}
        onTouchStart={(e) => {
          if(isclicked === 'true'){
            onTouchDrag(e)
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 200, 0.3)",
          color: "black",
          fontSize: "36px",
        }}>
          {!(inEditMode)?<div>{content}</div>:<input defaultValue={content} onChange={(e) => {setContent(e.target.value)}}></input>}
      </div>

    </div>
  )

}

export default CustomView


// selection 

function rectangleSelect(inputElements, selectionRectangle) {
  var elements = [];
  inputElements.forEach(function(element) {
    var box = element.getBoundingClientRect();
    if (
      selectionRectangle.left <= box.left &&
      selectionRectangle.top <= box.top &&
      selectionRectangle.right >= box.right &&
      selectionRectangle.bottom >= box.bottom
    ) {
      elements.push(element);
    }
  });
  return elements;
}

function getSelectionRectNode() {
  return document.querySelector(".selection-rect");
}

function showSelectionRectangle(selection) {
  var rect = getSelectionRectNode();
  rect.style.left = `${selection.left}px`;
  rect.style.top = `${selection.top + window.scrollY}px`;
  rect.style.width = `${selection.right - selection.left}px`;
  rect.style.height = `${selection.bottom - selection.top}px`;
  rect.style.opacity = 0.5;
}

function hideSelectionRectangle() {
  var rect = getSelectionRectNode();
  rect.style.opacity = 0;
}

function selectBoxes(selection) {
  deselectBoxes();
  rectangleSelect(getBoxes(), selection).forEach(function(box) {
    box.classList.add("selected");
  });
}

function deselectBoxes() {
  getBoxes().forEach(function(box) {
    box.classList.remove("selected");
  });
}

function getBoxes() {
  return [...document.querySelectorAll(".box")];
}

function initEventHandlers() {
  var isMouseDown = false;
  var selectionRectangle = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  function onMouseDown(e) {
    isMouseDown = true;
    deselectBoxes();
    selectionRectangle.left = e.clientX;
    selectionRectangle.top = e.clientY;
  }

  function onMouseMove(e) {
    if (!isMouseDown) {
      return;
    }
    selectionRectangle.right = e.clientX;
    selectionRectangle.bottom = e.clientY;
    showSelectionRectangle(selectionRectangle);
    selectBoxes(selectionRectangle);
  }

  function onMouseUp(e) {
    isMouseDown = false;
    selectBoxes(selectionRectangle);
    hideSelectionRectangle();
    selectionRectangle = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
  }

  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}

// function initBoxes() {
//   // Helpers for generating random boxes on screen
//   function generateColumn(boxesPerColumn) {
//     var node = document.createElement("div");
//     node.className = "column";
//     while (boxesPerColumn--) {
//       var box = document.createElement("div");
//       var sizeClassName = ["tiny", "small", "normal", "big", "huge"][
//         Math.floor(Math.random() * 5)
//       ];
//       box.className = "box " + sizeClassName;
//       node.appendChild(box);
//     }
//     return node;
//   }
//   function generateBoxes(parent, cols, boxesPerColumn) {
//     while (cols--) {
//       parent.appendChild(generateColumn(boxesPerColumn));
//     }
//   }

//   generateBoxes(document.querySelector(".boxes"), 10, 10);
// }

function init() {
  initEventHandlers();
  // initBoxes();
}