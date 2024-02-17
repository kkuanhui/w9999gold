import { useState, useRef } from "react";
import { useAppDispatch } from "../../Context";

import {PiCornersOutLight} from 'react-icons/pi'
import {BiCrop} from 'react-icons/bi'
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

      {/* <NavItem type={"corp"}>
        <BiCrop></BiCrop>
      </NavItem> */}

      <NavItem type={"corner"}>
        <PiCornersOutLight />
      </NavItem>

      <Delete>
        <AiFillDelete></AiFillDelete>
      </Delete>

    </div>
  );
};

const NavItem = ({children, type}) => {
  const [isStyleShow, setIsStyleShow] = useState(false);
  // determin dropdown component display.
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
        {children}
      </button>
      <DropDown type={type} isShow={isStyleShow} setIsShow={setIsStyleShow}>
        <Corner></Corner>
      </DropDown>
    </div>
  );
};

const DropDown = (props) => {
  const menu = useRef(null)
  const closeMenu = (e)=>{
    if(menu.current && !menu.current.contains(e.target)){
      props.setIsShow(false)
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
        display: props.isShow ? "block" : "none",
        borderRadius: "0px 5px 5px 5px",
        border: "1px solid #00873E",
        background: "#FFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {props.children}
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

const Corner = () => {
  return(
    <div>
      
      <label>
        圓角
        <input type="number" style={{
            width: "30px",
            height: "30px",
            border: "1px solid black"
          }}
        onInput={(e) => {console.log(e.target.value)}} />
      </label>

    </div>
  )
}

export default Photo;