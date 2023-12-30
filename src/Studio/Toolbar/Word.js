import { useEffect, useState } from "react";
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
  const dispatch = useStudioDispatch();
  const studio = useStudio();
  const active = studio.meta.active
  const activeItem = studio.json.children.filter(ele => ele.id === active.id)[0]

  // const [headStyle, setHeadStyle] = useState({
  //   "fontWeight": true,
  //   "fontStyle": true,
  //   "textDecoration": true
  // })

  // const checkIfStyleWhole = (activeItem) => {
  //   activeItem.children.forEach(child => {
  //     if(child.dom === "#text"){
  //       return;
  //     }else{
  //       if(child.style.fontWeight !== "bold") setHeadStyle({...headStyle, fontWeight: false})
  //       if(child.style.fontStyle !== "italic") setHeadStyle({...headStyle, fontStyle: false})
  //       if(child.style.textDecoration !== "underline") setHeadStyle({...headStyle, textDecoration: false})
  //       checkIfStyleWhole(child)
  //     }
  //   })
  // }

  // useEffect(() => {
  //   checkIfStyleWhole(activeItem)
  //   setTimeout(() => {
  //     console.log(headStyle)
  //   }, [3000])
  // }, [])

  const onActionCalled = (newStyle) => {
    // if user isn't editing. caret not placed on contenteditalbe.
    if(document.activeElement !== document.getElementById('editable')){
      onUniStyleChange(newStyle)
      return 0
    }
    const selection = window.getSelection();
    const range = selection.getRangeAt(0); // the first one selection range. normally you'll have only one.
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
    // const newRange = new Range();
    // const newEndNode = endNode.parentNode.childNodes[1].childNodes[0]
    // newRange.setStart(newEndNode, 1);
    // newRange.collapse(true);
    // selection.removeAllRanges();
    // selection.addRange(newRange);
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
      <FontWeight onActionCalled={onActionCalled}></FontWeight>
      <FontStyle  onActionCalled={onActionCalled}></FontStyle>
      <TextDecoration onActionCalled={onActionCalled}></TextDecoration>
      <WritingModeVertical onItemStyleChange={onItemStyleChange}></WritingModeVertical>
    </div>
  );
};

const FontFamily = ({onItemStyleChange}) => {
  // fontFamily affect all content in word
  const studio = useStudio();
  const active = studio.meta.active;
  const activeItem = studio.json.children.filter(node => node.id === active.id)[0];
  const [style, setStyle] = useState("arial");
  const onStyleChange = (name) => {
    setStyle(name);
    onItemStyleChange({"fontFamily": name});
  }
  useEffect(() => {
    const jsonFontFamily = activeItem.style.fontFamily;
    setStyle(jsonFontFamily);
  }, [])
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
          value={style} 
          type="number" 
          onChange={(e) => {
            e.preventDefault()
            onStyleChange(e.target.value)}
          }>
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

const FontSize = ({onItemStyleChange}) => {
  // fontSize affect all content in word
  const studio = useStudio();
  const active = studio.meta.active;
  const activeItem = studio.json.children.filter(node => node.id === active.id)[0]
  const [size, setSize] = useState(16);
  const onSizeAdd = (delta) => {
    const s = (size + delta).toFixed(0);
    setSize(Number(s));
    onItemStyleChange({"fontSize": `${s}px`})
  };
  const onSizeChange = (s) => {
    setSize(Number(s))
    onItemStyleChange({"fontSize": `${s}px`})
  }
  useEffect(() => {
    if(activeItem){
      const fontSize = activeItem.style.fontSize
      setSize(Number(fontSize.slice(0, fontSize.length - 2)))
    }
  }, [])
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
          onMouseDown={(e) => {
            e.preventDefault();
            onSizeAdd(-1)
          }}
        >
          <FiMinus />
        </button>
      </div>
      <div className="width-60" style={{
        border: "1px solid #C2C2C2",
        borderStyle: "none solid",
      }}>
        <input className="width-100 text-center" 
          value={size} 
          type="number" 
          onChange={(e) => {
            e.preventDefault();
            onSizeChange(e.target.value);
          }}
        />
      </div>
      <div className="width-20 d-flex flex-ai-center flex-jc-center">
        <button className="d-flex flex-ai-center flex-jc-center" 
          onMouseDown={(e) => {
            e.preventDefault();
            onSizeAdd(1)
          }}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

const Button = ({children, styleEnabled, handleMouseDown}) => {
  const studio = useStudio()
  const active = studio.meta.active;
  const activeItem = studio.json.children.filter(e => e.id === active.id)[0]
  return (
    <button
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "5px",
        background: !styleEnabled ? "transparent" : "rgba(33, 129, 0, 0.46)",
      }}
      onMouseDown={(e) => {
        if(!activeItem){return false}
        e.preventDefault();
        handleMouseDown();
      }}
    >
      {children}
    </button>
  );
};

const FontWeight = ({onActionCalled}) => {
  const [styleEnabled, setStyleEnabled] = useState(false)
  const handleMouseDown = () => {
    onActionCalled({"fontWeight": "bold"})
  }
  useEffect(() => {
    setStyleEnabled(false)
  }, [])
  return (
    <Button handleMouseDown={handleMouseDown} styleEnabled={styleEnabled}>
      <AiOutlineBold></AiOutlineBold>  
    </Button>
  )
}

const FontStyle = ({onActionCalled}) => {
  const [styleEnabled, setStyleEnabled] = useState(false)
  const handleMouseDown = () => {
    onActionCalled({"fontStyle": "italic"})
  }
  useEffect(() => {
    setStyleEnabled(false)
  }, [])
  return (
    <Button handleMouseDown={handleMouseDown} styleEnabled={styleEnabled}>
      <AiOutlineItalic></AiOutlineItalic>  
    </Button>
  )
}

const TextDecoration = ({onActionCalled}) => {
  const [styleEnabled, setStyleEnabled] = useState(false)
  const handleMouseDown = () => {
    onActionCalled({"textDecoration": "underline"})
  }
  useEffect(() => {
    setStyleEnabled(false)
  }, [])
  return (
    <Button handleMouseDown={handleMouseDown} styleEnabled={styleEnabled}>
      <AiOutlineUnderline></AiOutlineUnderline>  
    </Button>
  )
}

const WritingModeVertical = ({onItemStyleChange}) => {
  const [styleEnabled, setStyleEnabled] = useState(false)
  const studio = useStudio();
  const active = studio.meta.active;
  const activeItem = studio.json.children.filter(node => node.id === active.id)[0]
  const handleMouseDown = () => {
    if(styleEnabled){
      onItemStyleChange({"writingMode": "horizontal-tb"})
      setStyleEnabled(false)
    }else{
      onItemStyleChange({"writingMode": "vertical-rl"})
      setStyleEnabled(true)
    }
  }
  // lifecycle -----
  useEffect(() => {
    const isVertical = (activeItem.style.writingMode === "vertical-rl")
    setStyleEnabled(isVertical)
  }, [])

  return (
    <Button 
      handleMouseDown={handleMouseDown} 
      styleEnabled={styleEnabled}
    >
      <AiOutlineVerticalAlignBottom />
    </Button>
  )
}

export default Word;