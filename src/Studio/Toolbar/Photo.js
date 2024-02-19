import { useState, useRef, useEffect } from "react";
import { useApp, useAppDispatch } from "../../Context";
import {PiCornersOutLight} from 'react-icons/pi'
import {AiFillDelete} from "react-icons/ai"


const Photo = () => {
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

      <CornorRadius />

      <Delete>
        <AiFillDelete></AiFillDelete>
      </Delete>

    </div>
  );
};

const CornorRadius = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const active = context.studioMeta.active;
  const activeItem = context.productContent.children.filter(ele => ele.id === active.id)[0]
  const [radiusValue, setRadiusValue] = useState(0);
  const [isStyleShow, setIsStyleShow] = useState(false);
  // determin dropdown component display.
  useEffect(() => {
    setRadiusValue(activeItem.style.borderRadius)
  }, [])
  return (
    <div style={{height: "100%"}}>
      <button
        style={
          (!isStyleShow)
          ?{height: "100%", padding: "0px 5px"}
          :{height: "100%", padding: "0px 5px", color: "#fff", background: "#00873E"}
        }
        onClick={() => {
          setIsStyleShow(!isStyleShow);
        }}
      >
        <PiCornersOutLight />
      </button>
      <DropDown isShow={isStyleShow} setIsShow={setIsStyleShow}>
        <label>
          圓角
          <input type="number" 
            value={radiusValue}
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid black"
            }}
          onInput={(e) => {
            setRadiusValue(e.target.value)
            dispatch({
              type: "contentImageUpdate",
              id: active.id,
              item: {
                ...activeItem, 
                style: {
                  ...activeItem.style,
                  borderRadius: Number(e.target.value)
                }
              }
            })
          }} 
        />
        </label>
        </DropDown>
    </div>
  );
};


const DropDown = ({children, isShow, setIsShow}) => {
  const menu = useRef(null)
  const closeMenu = (e)=>{
    if(menu.current && !menu.current.contains(e.target)){
      setIsShow(false)
    }
  }
  document.addEventListener('mousedown',closeMenu)
  return (
    <div
      ref={menu}
      style={{
        width: "150px",
        height: "200px",
        position: "absolute",
        zIndex: "999",
        display: isShow ? "block" : "none",
        borderRadius: "0px 5px 5px 5px",
        border: "1px solid #00873E",
        background: "#FFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {children}
    </div>
  );
};

const Delete = (props) => {
  const dispatch = useAppDispatch();
  return(
    <div>
      <button onClick={() => {
        dispatch({type: "contentDelete"})
      }}>
        {props.children}
      </button>
    </div>
  )
}

export default Photo;