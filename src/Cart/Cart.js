import { GoTrash } from "react-icons/go";
import { useApp } from "../Context";
import "../static/css/cart.css";

const Cart = () => {
  const context = useApp();
  const cart = context.cart;
  if (cart.length === 0) {
    return <div>購物車沒有東西。</div>;
  } else {
    return (
      <div id="cart">
        <List></List>
        <Checkout></Checkout>
      </div>
    );
  }
};

const List = () => {
  return (
    <div id="cart-list">
      <h1 className="font-size-15" style={{ paddingBottom: "30px" }}>
        購物車
      </h1>
      <div
        className="mb-5"
        style={{
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
    <div className="cart-list-item">
      <input type="checkbox" />

      <img src="" alt="thumbnail" width={150} height={150} />

      <div className="d-grid height-100" style={{ gridTemplateRows: "auto" }}>
        <div
          className="font-bold d-flex flex-ai-start"
          style={{ fontSize: "clamp(1em,2vw,1.5em)" }}
        >
          酬神金牌
        </div>
        <div style={{ fontSize: "clamp(0.8em,2vw,1em)", color: "#707072" }}>
          尺寸 5吋/ 重量 5錢/ 款式 雙龍搶珠
        </div>
        <div
          className="d-flex flex-ai-center flex-jc-start"
          style={{ gap: "5px" }}
        >
          <div style={{ fontSize: "clamp(0.8em, 2vw, 1em)", color: "#707072" }}>
            數量
          </div>
          <select
            style={{
              width: "clamp(20px, 10vw, 60px)",
              aspectRatio: "3/1",
              border: "1px solid #707072",
              borderRadius: "5px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => {
              return (
                <option key={idx} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
        </div>
        <div
          style={{ fontSize: "clamp(0.8em, 2vw, 1em)" }}
          className="d-flex flex-ai-end"
        >
          <GoTrash></GoTrash>
        </div>
      </div>
      <div
        className="font-bold"
        style={{ height: "100%", fontSize: "clamp(1em,2vw,1.5em)" }}
      >
        $15,000
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <div id="cart-checkout" style={{ width: "300px" }}>
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
      <div id="cart-checkout-button">
        <button>結帳</button>
      </div>
    </div>
  );
};

export default Cart;
