import { useState, useRef} from "react";
import {GoTriangleLeft, GoTriangleRight} from "react-icons/go";
import {AiOutlineSearch, AiOutlineZoomIn, AiOutlineZoomOut} from "react-icons/ai";
import {RiArrowDropDownLine} from "react-icons/ri"
import {useStudio} from "../StudioContext"

const Normal = (props) => {
  const studio = useStudio();
  const price = studio.json.price;
  return (
    <div
      className="d-flex flex-jc-between flex-ai-center"
      style={{
        height: "100%",
        width: "100%",
        padding: "0px 20px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <div className="d-flex flex-jc-around" style={{height: "100%", gap: "10px"}}>
        <div className="d-flex flex-ai-center flex-jc-center font-bold">W</div>
        <NavItem name={"新增"} type={"addon"}>
          <AddonContent />
        </NavItem>
        <NavItem name={"款式"} type={"style"}>
          <StyleContent />
        </NavItem>
        <NavItem name={"重量"} type={"weight"}>
          <WeightContent/>
        </NavItem>
        <NavItem name={"流蘇"} type={"tassel"}>
          <TasselContent />
        </NavItem>
        <NavItem name={"尺寸"} type={"size"}>
          <SizeContent />
        </NavItem>
        <NavItem name={"測試"} type={"test"}>
          <TestContent 
            testShowProductItems={props.testShowProductItems} 
            testShowProductMeta={props.testShowProductMeta}
          />
        </NavItem>
        <div><AiOutlineZoomOut></AiOutlineZoomOut></div>
        <div><AiOutlineZoomIn></AiOutlineZoomIn></div>
      </div>
      <div className="font-bold" style={{fontSize: "large"}}>
        價格 {Number(price).toLocaleString()} 元
      </div>
    </div>
  );
};

const NavItem = (props) => {
  const [isShow, setIsStyleShow] = useState(false);
  // determin dropdown component display.
  return (
    <div style={{height: "100%"}}>
      <button
        style={
          (!isShow)
          ?{height: "100%", padding: "0px 5px"}
          :{height: "100%", padding: "0px 5px", color: "#fff", background: "#00873E"}
        }
        onClick={() => setIsStyleShow(!isShow)}
      >
        {props.name}
        {(props.children)?<RiArrowDropDownLine/>:null}
      </button>
      <DropDown isShow={isShow} setIsShow={setIsStyleShow}>
        {props.children}
      </DropDown>
    </div>
  );
};

const DropDown = (props) => {
  const menu = useRef(null)
  const closeMenu = (e)=>{
    if(menu.current && !menu.current.contains(e.target)){
      // props.setIsShow(false)
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

const TestContent = (props) => {

  return(
    <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
      <div><button onClick={() => props.testShowProductMeta()}>meta</button></div>
      <div><button onClick={() => props.testShowProductItems()}>itmes</button></div>
    </div>
  )
}

const AddonContent = (props) => {

  return(
    <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
      <h1>新增</h1>
    </div>
  )
}

const StyleContent = (props) => {

  const container = useRef(null)
  const options = [
    {value: "A01", name: "雙龍搶珠"}, {value: "A02", name: "龍鳳搶珠"}, {value: "A03", name: "雙鳳搶珠"},
    {value: "A04", name: "雙龍搶珠"}, {value: "A05", name: "龍鳳搶珠"}, {value: "A06", name: "雙鳳搶珠"},
    {value: "A07", name: "雙龍搶珠"}, {value: "A08", name: "龍鳳搶珠"}, {value: "A09", name: "雙鳳搶珠"},
    {value: "A10", name: "雙龍搶珠"}, {value: "A11", name: "龍鳳搶珠"}, {value: "A12", name: "雙鳳搶珠"},
  ]
  const pageMax = Number((
    (options.length/5) + ((options%5)?1:0)
  ).toFixed(0))
  const [page, setPage] = useState(1)
  const [slide, setSlide] = useState(0)
  const onPageChange = (delta) => {
    if(page+delta > pageMax){
      setPage(1)
      setSlide(0)
    }else if(page+delta < 1){
      setPage(pageMax)
      setSlide((pageMax - 1)*148)
    }else{
      setPage(page+delta)
      setSlide((page+delta -1)*148)
    }
  }
  return(
    <div ref={container} style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}>
      <h1>金牌款式</h1>
      <div className="width-80 ml-auto mr-auto">
        <div className="d-flex flex-ai-center flex-jc-around" style={{
          borderRadius: "10px",
          border: "1px solid #B6B6B6",
          color: "#B6B6B6",
        }}>
          <span><AiOutlineSearch /></span>
          <span>search</span>
        </div>
      </div>
      <div 
        className="d-flex flex-direction-column"
        style={{
          position: "absolute", 
          transform: `translate(-${slide}px, 0%)`,
          transitionDuration: "0.5s",
          flexWrap: "wrap",
          height: "100px",
        }}
      >
        { options.map((ele, key) => <div style={{width: "148px"}} key={key} className="hover-background-06f hover-color-fff hover-pointer">{ele.name}</div>) }
      </div>
      <div 
        className="d-flex width-80 flex-ai-center flex-jc-between mr-auto ml-auto" 
        style={{marginTop: "120px"}}
      >
        <button onClick={() => onPageChange(-1)}><GoTriangleLeft/></button>
        <div>{page}/{pageMax}</div>
        <button onClick={() => onPageChange( 1)}><GoTriangleRight/></button>
      </div>
    </div>
  )
}

const WeightContent = () => {
  const [weight, setWeight] = useState(5)
  return(
    <div style={{width: "100%", height: "100%"}}>
      <h1>金牌重量</h1>
      <div className="d-grid" style={{gridTemplateColumns: "2fr 3fr 2fr 1fr"}}>
        <button
          style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
          onClick={() => setWeight(Number((weight - 1).toFixed(1)))}
        >
          -
        </button>
        <div 
          className="d-flex flex-ai-center flex-jc-center" 
          style={{ border: "1px solid rgba(0,0,0,0.5)" }}
        >
          {weight}
        </div>
        <button
          style={{ border: "1px solid rgba(0,0,0,0.5)" }}
          onClick={() => setWeight(Number((weight + 1).toFixed(1)))}
        >
          +
        </button>
        <div>台錢</div>
      </div>
      <div>
        <div>{`約等於 ${(weight*3.125).toFixed(2)} 公克`}</div>
      </div>
    </div>
  )
}

const TasselContent = () => {
  return(
    <div>選擇流蘇</div>
  )
}

const SizeContent = () => {
  const [size, setSize] = useState(0.5);
  return (
    <div>
      <h1>金牌尺寸</h1>
      <div className="d-grid" style={{gridTemplateColumns: "2fr 3fr 2fr 1fr"}}>

        <button
          style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
          onClick={() => setSize(Number((size - 0.1).toFixed(2)))}
        >
          -
        </button>

        <div 
          className="d-flex flex-ai-center flex-jc-center" 
          style={{ border: "1px solid rgba(0,0,0,0.5)" }}
        >
          {size}
        </div>

        <button
          style={{ border: "1px solid rgba(0,0,0,0.5)" }}
          onClick={() => setSize(Number((size + 0.1).toFixed(2)))}
        >
          +
        </button>
        <div>台寸</div>

      </div>
      <div>
        約等於 {(size*3.03).toFixed(2)} 公分
      </div>
    </div>
  );
};

export default Normal;
