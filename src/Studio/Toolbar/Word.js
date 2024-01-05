import { useEffect, useState, useRef } from "react";
import {
  AiOutlineBold, 
  AiOutlineItalic, 
  AiOutlineUnderline, 
  AiOutlineVerticalAlignBottom,
} from 'react-icons/ai';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useStudio, useStudioDispatch } from "../StudioContext";
import { toolbarHtmlToObj } from "../utilities";

const Word = () => {
  // state -----
  const dispatch = useStudioDispatch();
  const studio = useStudio();
  const active = studio.meta.active
  const activeItem = studio.json.children.filter(ele => ele.id === active.id)[0]

  // function -----
  const onActionCalled = (newStyle) => {
    // if user isn't in editing. Do uni-style change.
    if(document.activeElement !== document.getElementById('editable')){
      onUniStyleChange(newStyle)
      return;
    }
    // else detect select range and make change on it
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startNode = range.startContainer
    const endNode = range.endContainer
    const startOffset = range.startOffset
    const endOffset = range.endOffset
    let tempNode = startNode
    let previousNode = null
    const nodesInRange = []
    while(previousNode !== endNode){
      nodesInRange.push(tempNode)
      if(tempNode.parentNode.nextSibling === null){
        previousNode = tempNode
        tempNode = tempNode.parentNode.parentNode.nextSibling?.childNodes[0]?.childNodes[0]
        // switch to next <p>. cornor case is there is only one <p> in word.
        if(tempNode === undefined) previousNode = endNode // force to stop
      }else{
        previousNode = tempNode
        tempNode = tempNode.parentNode.nextSibling?.childNodes[0]
      }
    }
    let myRange = new Range()
    nodesInRange.forEach((node, idx) => {
      if(nodesInRange.length !== 1){
        if(idx === 0){
          myRange.setStart(node, startOffset)
          myRange.setEnd(node, node.length)
        }else if(idx === nodesInRange.length - 1){
          myRange.setStart(node, 0)
          myRange.setEnd(node, endOffset)
        }else{
          myRange.setStart(node, 0)
          myRange.setEnd(node, node.length)
        }
      }else{
        myRange = range
      }
      const span = document.createElement('span');
      Object.assign(span.style, newStyle)
      myRange.surroundContents(span);
    })
    const newHTMLString = document.getElementById('editable').innerHTML
    dispatch({
      type: "update",
      id: activeItem.id,
      item: {...activeItem, children: toolbarHtmlToObj(newHTMLString)}
    })
  }

  const onItemStyleChange = (newStyle = {}) => {
    const active = studio.meta.active
    const activeItem = studio.json.children.filter(node => node.id === active.id)[0]
    const newStyleActiveItem = {
      ...activeItem, 
      style: {...activeItem.style, ...newStyle}
    } 
    dispatch({
      type: "update",
      id: activeItem.id,
      item: newStyleActiveItem
    })
  }

  const onUniStyleChange = (newStyle = {}) => {
    const active = studio.meta.active
    if(!active){
      return 0;
    }
    const activeItem = studio.json.children.filter(node => node.id === active.id)[0]
    traverseStyle(activeItem, newStyle)
    dispatch({
      type: "update",
      id: activeItem.id,
      item: activeItem
    })
  }

  const traverseStyle = (obj, style = {}) => {
    // altStyle refers to alternative style.
    obj.children.forEach(child => {
      if(child.dom === "#text"){
        return 0
      }else if(child.dom === "span"){
        child.style = {...child.style, ...style}
        traverseStyle(child, style)
      }else{
        traverseStyle(child, style)
      }
    })
  }
  

  return (
    <div
      className="d-flex flex-jc-start flex-ai-center"
      style={{
        gap: "10px",
        height: "100%",
        width: "100%",
        padding: "0px 20px",
        position: "relative",
      }}
    >
      <FontFamily onItemStyleChange={onItemStyleChange}></FontFamily>
      <FontSize onItemStyleChange={onItemStyleChange}></FontSize>
      <WritingMode onItemStyleChange={onItemStyleChange}></WritingMode>

      <div name={"divider"} 
        style={{
          borderLeft: "1px solid #b7b7b7", 
          width: "1px", 
          height: "50%"
        }} 
      />

      <FontWeight onActionCalled={onActionCalled}></FontWeight>
      <FontStyle  onActionCalled={onActionCalled}></FontStyle>
      <TextDecoration onActionCalled={onActionCalled}></TextDecoration>
    </div>
  );
};

const FontFamily = () => {
  // fontFamily affect all content in word
  const studio = useStudio();
  const contextValue = studio.toolbar.word.fontFamily
  const dispatch = useStudioDispatch();
  const [fontFamily, setFontFamily] = useState(contextValue);
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFontFamily(e.target.value);
    // dispatch({
    //   type: "update",
    //   style: {"fontFamily": font},
    // })
    dispatch({
      type: "toolbarWord",
      style: {"fontFamily": e.target.value}
    })
  }
  useEffect(() => {
    setFontFamily(contextValue)
  }, [contextValue])
  return (
    <div 
      className="d-flex flex-ai-center" 
      style={{
        width: "100px", 
        borderRadius: "5px",
        border: "1px solid #C2C2C2",
        position: "relative"
        }}
      >
      <div className="width-100" style={{
        border: "1px solid #C2C2C2",
        borderStyle: "none solid",
      }}>
        <select className="width-100 text-center" 
          value={fontFamily} 
          type="number" 
          onChange={onChangeHandler}
        >
            <option value="arial">Arial</option>
            <option value="verdana">Verdana</option>
            <option value="tahoma">Tahoma</option> 
            <option value="trebuchet">Trebuchet</option>
            <option value="times">Times</option>
            <option value="georgia">Georgia</option> 
            <option value="garamond">Garamond</option>
            <option value="courier">Courier</option>
            <option value="brush">Brush</option>
        </select>
      </div>
    </div>
  );
}

const FontSize = () => {
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const myInput = useRef(null);
  const contextValue = studio.toolbar.word.fontSize;
  const [fontSize, setFontSize] = useState(16);
  // function -----
  const handleChange = (e) => {
    e.preventDefault();
    const value = Number(e.target.value)
    setFontSize(value)
    dispatch({
      type: "toolbarWord",
      style: {'fontSize': `${value}px`}
    })
    // dispatch({
    //   type: "update",
    // })
  }
  const handleMouseDown = (e, value) => {
    e.preventDefault()
    myInput.current.value = value
    setFontSize(value)
    dispatch({
      type: "toolbarWord",
      style: {'fontSize': `${value}px`}
    })
    // dispatch({
    //   type: "update",
    // })
  }
  // lifecycle -----
  useEffect(() => {
    const ele = myInput.current
    ele.addEventListener('change', handleChange)
    const contextFontSize = Number(contextValue.slice(0, contextValue.length - 2))
    ele.value = contextFontSize
    setFontSize(contextFontSize)
    return () => {
      ele.removeEventListener('change', handleChange)
    }
  }, [contextValue])

  return (
    <div 
      className="d-flex flex-ai-center" 
      style={{width: "100px", 
        borderRadius: "5px",
        border: "1px solid #C2C2C2"
        }}
      >
      <div className="width-20 d-flex flex-ai-center flex-jc-center">
        <button className="d-flex flex-ai-center flex-jc-center" 
          onMouseDown={(e) => {handleMouseDown(e, fontSize-1)}}
        >
          <FiMinus />
        </button>
      </div>
      <div className="width-60" style={{
        border: "1px solid #C2C2C2",
        borderStyle: "none solid",
      }}>
        <input className="width-100 text-center" 
          ref={myInput}
          defaultValue={fontSize} 
          type="number" 
        />
      </div>
      <div className="width-20 d-flex flex-ai-center flex-jc-center">
        <button className="d-flex flex-ai-center flex-jc-center" 
          onMouseDown={(e) => handleMouseDown(e, fontSize+1)}
        >
          <FiPlus />
        </button>
      </div>
    </div>// 
  );
};

const Button = ({children, handleMouseDown, enabled}) => {
  return (
    <button
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "5px",
        background: enabled ? "rgba(33, 129, 0, 0.46)": "transparent" ,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

const FontWeight = () => {
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const contextValue = studio.toolbar.word.fontWeight;
  const [enabled, setEnabled] = useState(false)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnabled(!enabled)
    dispatch({
      "type": "toolbarWord",
      "style": {"fontWeight": !enabled?"normal":"bold"}
    })
  }
  useEffect(() => {
    if(contextValue === "bold"){
      setEnabled(true)
    }else{
      setEnabled(false)
    }
  }, [contextValue])
  return (
    <Button handleMouseDown={handleMouseDown} enabled={enabled}>
      <AiOutlineBold></AiOutlineBold>  
    </Button>
  )
}

const FontStyle = () => {
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const contextValue = studio.toolbar.word.fontStyle;
  const [enabled, setEnabled] = useState(false)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnabled(!enabled)
    dispatch({
      "type": "toolbarWord",
      "style": {"fontStyle": !enabled?"normal":"italic"}
    })
  }
  useEffect(() => {
    if(contextValue === "italic"){
      setEnabled(true)
    }else{
      setEnabled(false)
    }
  }, [contextValue])
  return (
    <Button handleMouseDown={handleMouseDown} enabled={enabled}>
      <AiOutlineItalic></AiOutlineItalic>  
    </Button>
  )
}

const TextDecoration = () => {
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const contextValue = studio.toolbar.word.textDecoration;
  const [enabled, setEnabled] = useState(false)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnabled(!enabled)
    dispatch({
      "type": "toolbarWord",
      "style": {"fontStyle": !enabled?"none":"underline"}
    })
  }
  useEffect(() => {
    if(contextValue === "underline"){
      setEnabled(true)
    }else{
      setEnabled(false)
    }
  }, [contextValue])
  return (
    <Button handleMouseDown={handleMouseDown} enabled={enabled}>
      <AiOutlineUnderline></AiOutlineUnderline>  
    </Button>
  )
}

const WritingMode = () => {
  const studio = useStudio();
  const dispatch = useStudioDispatch();
  const contextValue = studio.toolbar.word.writingMode;
  const [enabled, setEnabled] = useState(false)
  const handleMouseDown = (e) => {
    e.preventDefault();
    setEnabled(!enabled)
    dispatch({
      "type": "toolbarWord",
      "style": {"fontStyle": !enabled?"horizontal":"vertical-rl"}
    })
  }
  useEffect(() => {
    if(contextValue === "vertical-rl"){
      setEnabled(true)
    }else{
      setEnabled(false)
    }
  }, [contextValue])
  return (
    <Button handleMouseDown={handleMouseDown} enabled={enabled}>
      <AiOutlineVerticalAlignBottom />
    </Button>
  )
}

export default Word;