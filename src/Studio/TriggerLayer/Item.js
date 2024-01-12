import React, {useState, useRef, useEffect} from 'react';
import RightClick from './RightClick';
import Word from './Word';
import Photo from './Photo';
// css -----
import '../static/css/studio-item.css';

const Item = (props) => {
  const {productInfo} = props
  // ref -------------------------
  const myContainer = useRef(null)
  const myContent = useRef(null)

  // state -------------------------
  const [inEditMode, setInEditMode] = useState(
    (productInfo.type !== "word")
    ?false
    :(productInfo.content.length === 0)
    ?true
    :false
  )
  // right click part state
  const [rcPosition, setRcPosition] = useState([0, 0])
  const [isRcOpen, setIsRcOpen] = useState(false)

  useEffect(() => {
    function handler(e) {
      if(myContainer.current.contains(e.target)){
        // only effect on ref canvas
        e.preventDefault();
        setRcPosition([e.offsetX, e.offsetY])
        setIsRcOpen(true)
      }
    }
    myContainer.current.oncontextmenu = handler
  }, [])

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
      className='custom-view-item'
      activate={props.activate.toString()}
      onClick={() => {
        props.onActive()
      }}
      style={{
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "3px",
      }}
    >
      <div 
        // onMouseDown={(e) => {onReWidth(e)}}
        // onTouchStart={(e) => {onTouchReWidth(e)}}
        className="resize-border" 
        style={{cursor: "w-resize", top: "50%",  left: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(-100%, -50%)"}}></div>
      <div 
        // onMouseDown={(e) => {onReWidth(e)}}
        // onTouchStart={(e) => {onTouchReWidth(e)}}
        className="resize-border" 
        style={{cursor: "e-resize", top: "50%", right: "0px", height: "30px", width: "7px", borderRadius: "10px", transform: "translate(100%, -50%)"}}></div>
      <div 
        // onMouseDown={(e) => {onResize(e)}}
        // onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "nw-resize", top: "0px", left: "0px", transform: "translate(-50%, -50%)"}}></div>
      <div 
        // onMouseDown={(e) => {onResize(e)}}
        // onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "ne-resize", top: "0px",    right: "0px", transform: "translate(50%, -50%)"}}></div>
      <div 
        // onMouseDown={(e) => {onResize(e)}}
        // onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "se-resize", bottom: "0px", right: "0px", transform: "translate(50%, 50%)"}}></div>
      <div 
        // onMouseDown={(e) => {onResize(e)}}
        // onTouchStart={(e) => {onTouchResize(e)}}
        className="resize-dot" 
        style={{cursor: "sw-resize", bottom: "0px", left: "0px",  transform: "translate(-50%, 50%)"}}></div>

      <div 
        ref={myContent}
        idx={props.productInfo.idx}
        onDoubleClick={() => {
          if(props.activate){
            setInEditMode(true)
          }
        }}
        onMouseDown={(e) => {
          if(props.activate){
            onDrag(e)
          }
        }}
        onTouchStart={(e) => {
          if(props.activate){
            onTouchDrag(e)
          }
        }}
        style={{
          backgroundColor: "transparent",
          color: "black",
        }}>

          {
            (isRcOpen)
            ?<RightClick 
              position={rcPosition} 
              onClose={() => setIsRcOpen(false)} 
            />
            :null
          }
          {
            (props.productInfo.type === "word")
            ? <Word 
                inEditMode={inEditMode} 
                setInEditMode={setInEditMode}
                productInfo={props.productInfo} 
                onPIChange={props.onPIChange}
                onPIDelete={props.onPIDelete}
              />
            : <Photo 
                productInfo={props.productInfo} 
                onPIChange={props.onPIChange}
                onPIDelete={props.onPIDelete}
              />
          }
      </div>

    </div>

  )

};

export default Item;