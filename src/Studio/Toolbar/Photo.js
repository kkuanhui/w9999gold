import { useState, useRef } from "react";
import {BsImage} from 'react-icons/bs';
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
        background: "#FFFFFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <BsImage />
      <NavItem name={"裁切"} type={"corp"}>
        <BiCrop></BiCrop>
      </NavItem>
      <NavItem name={"圓角"} type={"corner"}>
        <PiCornersOutLight />
      </NavItem>
      <Delete>
        <AiFillDelete></AiFillDelete>
      </Delete>
    </div>
  );
};


const NavItem = (props) => {
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
        {props.children}
      </button>
      <DropDown type={props.type} isShow={isStyleShow} setIsShow={setIsStyleShow}>
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
  return(
    <div>
      <button>
        {props.children}
      </button>
    </div>
  )
}

export default Photo;