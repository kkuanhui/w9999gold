import { GoTrash } from "react-icons/go";
import { useApp } from "../Context";

const ShoppingCart = () => {
  const context = useApp();
  const shoppingCart = context.shoppingCart;
  if(shoppingCart.length === 0){
    return (
      <div>
        購物車沒有東西。
      </div>
    )
  }else{
    return ( 
      <div className="ml-auto mr-auto d-flex flex-jc-between" style={{width: "1000px"}}>
        <List></List>
        <PriceSum></PriceSum>
      </div>
    );
  }
};

const List = () => {
  return (
    <div>
      <h1 className="font-size-15" style={{paddingBottom: "30px"}}>購物車</h1>
      <div className="mb-5"
        style={{
          width: "600px",
          height: "calc(80vh - 50px)",
          overflow: "scroll",
        }}
      >
        <ListItem></ListItem> 
        <ListItem></ListItem> 
      </div>
    </div>
  );
};

const ListItem = () => {
  return (
    <div className="d-flex flex-ai-center flex-jc-between mb-5"
      style={{ width: "600px", height: "150px"}}
    >
      <input type="checkbox"
        style={{ width: "30px", height: "30px", border: "1px solid #000" }}
      />
      <div style={{ width: "150px", height: "150px", background: "#D9D9D9" }}></div>

      <div className="d-grid height-100" style={{gridTemplateRows: "auto"}}>
        <div className="font-size-15 font-bold d-flex flex-ai-start">酬神金牌</div>
        <div className="font-size-10" style={{ color: "#707072" }}>
          尺寸 5吋/ 重量 5錢/ 款式 雙龍搶珠
        </div>
        <div className="d-flex flex-ai-center flex-jc-start" style={{gap: "5px"}}>
          <div className="font-size-10" style={{ color: "#707072" }}>
            數量
          </div>
          <select
            style={{
              width: "60px",
              height: "20px",
              border: "1px solid #707072",
              borderRadius: "5px",
            }}
          >
            {[1,2,3,4,5,6,7,8,9,10].map((num, idx) => {
              return <option key={idx} value={num}>{num}</option>
            })}
          </select>
        </div>
        <div className="font-size-10 d-flex flex-ai-end">
          <GoTrash></GoTrash>
        </div>
      </div>

      <div className="font-size-15 font-bold" 
        style={{height: "100%"}}>
          $15,000
      </div>

    </div>
  );
};

const PriceSum = () => {
  return (
    <div style={{ width: "300px" }}>
      <h2 className="font-size-15 font-bold mb-5">摘要</h2>

      <div className="font-size-10">你選擇了 2 個產品</div>
      <div className="d-flex flex-jc-between flex-ai-center">
        <div className="font-size-15 font-bold">小計</div>
        <div className="font-size-15 font-bold">$30,000</div>
      </div>

      <div className="d-flex flex-jc-between flex-ai-center">
        <div className="font-size-15 font-bold">運費</div>
        <div className="font-size-15 font-bold">$0</div>
      </div>

      <div style={{ width: "300px", borderBottom: "1px solid #E7E7E7" }}></div>

      <div className="d-flex flex-jc-between flex-ai-center">
        <div className="font-size-15 font-bold">總計</div>
        <div className="font-size-15 font-bold">$30,000</div>
      </div>

      <div className="d-flex flex-jc-end flex-ai-center width-100">
        <button
          className="d-flex flex-ai-center flex-jc-center font-bold"
          style={{
            borderRadius: "15px",
            width: "200px",
            height: "50px",
            background: "#198964",
            color: "#fff",
          }}
        >
          結帳
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
