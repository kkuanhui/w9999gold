import { useState, useRef, useEffect} from "react";
import {GoTriangleLeft, GoTriangleRight} from "react-icons/go";
import {AiOutlineSearch} from "react-icons/ai";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useApp, useAppDispatch} from "../../Context";

const Normal = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const price = context.productMeta.price;
  return (
    <div
      className="d-flex flex-jc-between flex-ai-center"
      style={{
        height: "100%",
        width: "100%",
        padding: "0px 20px",
        position: "relative",
      }}
    >
      <div className="d-flex flex-jc-around" style={{height: "100%", gap: "10px"}}>

        <button name="word"
          style={{height: "100%"}}
          className="hover-background-43ff64d9"
          onClick={() => {
            console.log('addon new word block')
            dispatch({
              type: "contentAddNewWord",
              position: [250, 250]
            })
          }}
        >
          新增文字
        </button>

        <ImageInput />

        <Dropdown name={"款式"}>
          <StyleContent />
        </Dropdown>

        <Dropdown name={"重量"}>
          <WeightContent/>
        </Dropdown>

        <Dropdown name={"尺寸"}>
          <SizeContent />
        </Dropdown>

        <div name="scale" 
          className="d-flex flex-ai-center flex-jc-center" 
          style={{height: "100%"}}
        >
          <div><AiOutlineSearch/></div>
          <input type="range" 
            style={{width: "80px", padding: "0px 5px"}}
            defaultValue="9" 
            min="1" 
            max="20" 
            step="1"
            onChange={(e) => {
              const value = e.target.value 
              const c = (value <= 10)?value*0.1:value/10
              dispatch({
                type: "studioScale",
                scale: c
              })
          }}>
          </input>
          <div>{(Number(context.studioMeta.scale)*100).toFixed(0)}%</div>
        </div>

      </div>

      <div className="font-bold user-select-none">
        價格 {Number(price).toLocaleString()} 元
      </div>
    </div>
  );
};

const Dropdown = ({children, name}) => {
  const component = useRef(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if(component.current && !component.current.contains(e.target)){
        setIsShow(false)
      }
    }
    window.addEventListener('click', handler)
  }, [])

  return (
    <div 
    ref={component}
    tabIndex={-1}
    style={{
      height: "100%",
      position: "relative",
      zIndex: "1"
    }}>
      <button 
      className="hover-background-43ff64d9"
      style={
          (!isShow)
          ?{height: "100%", padding: "0px 5px"}
          :{height: "100%", padding: "0px 5px", color: "#fff", background: "#00873E"}
        }
        onClick={() => setIsShow(!isShow)}
      >
        {name}
        <RiArrowDropDownLine/>
      </button>
      <div style={{
          position: "absolute",
          width: "150px",
          height: "200px",
          zIndex: "1",
          display: isShow ? "block" : "none",
          borderRadius: "0px 5px 5px 5px",
          border: "1px solid #00873E",
          background: "#FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// content for illustrate -----

const StyleContent = () => {
  const dispatch = useAppDispatch()
  const container = useRef(null)
  const options = [
    {value: "A01", name: "山水景"},
    {value: "A02", name: "財源滾滾"},
    {value: "A03", name: "山水景"},
    {value: "A04", name: "財源滾滾"},
    {value: "A05", name: "雙虎底"},
    {value: "A06", name: "關公部將"},
    {value: "A07", name: "聖母部將"},
    {value: "A08", name: "廣澤部將"},
    {value: "A09", name: "特殊三魚"},
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
    <div ref={container} 
      style={{
        width: "100%", 
        height: "100%", 
        position: "relative", 
        overflow: "hidden"
      }}
    >
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
        { options.map((ele, key) => {
        return (
          <div key={key} 
            style={{width: "148px", userSelect: "none"}} 
            className="hover-background-06f hover-color-fff hover-pointer"
            onClick={() => {
              dispatch({
                type: "productMetaUpdate",
                update: {
                  style: ele.name   
                }
              })
            }}
          >
              {ele.name}
          </div>
        )
        }) }
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
  const context = useApp();
  const weight = context.productMeta.weight
  const dispatch = useAppDispatch();
  return(
    <div style={{width: "100%", height: "100%"}}>
      <h1>金牌重量</h1>
      <div className="d-grid" style={{gridTemplateColumns: "2fr 3fr 2fr 1fr"}}>
        <button
          style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
          onClick={() => dispatch({
            type: "contentWeight",
            update: {
              weight: Number((weight - 1).toFixed(1))
            }
          })}
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
          onClick={() => dispatch({
            type: "productMetaUpdate",
            update: {
              weight: Number((weight + 1).toFixed(1))
            }
          })}
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

const SizeContent = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const size = context.productMeta.size;
  return (
    <div>
      <h1>金牌尺寸</h1>
      <div className="d-grid" style={{gridTemplateColumns: "2fr 3fr 2fr 1fr"}}>

        <button
          style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
          onClick={() => {
            dispatch({
              type: "productMetaUpdate",
              update: {
                size: Number((size - 0.1).toFixed(2))
              }
            })
          }}
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
          onClick={() => {
            dispatch({
              type: "productMetaUpdate",
              update: {
                size: Number((size + 0.1).toFixed(2))
              }
            })
          }}
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

const ImageInput = () => {
  const dispatch = useAppDispatch();

  return(
        <label name="word"
          style={{height: "100%"}}
          className="hover-cursor-pointer hover-background-43ff64d9 d-flex flex-ai-center flex-jc-center"
        >
          新增圖片

          <input 
            type="file" 
            accept="image/jpeg, image/png" 
            style={{height: "100%", display: "none"}}
            onChange={(e) => {
              const fileList = e.target.files;
              console.log('addon new word block')
              dispatch({
                type: "contentAddNewImage",
                src: URL.createObjectURL(fileList[0]),
                position: [250, 250]
              })
            }}
          />

        </label>
  )
}

export default Normal;
