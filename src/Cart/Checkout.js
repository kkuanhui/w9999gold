import "../static/css/cart.css";

const Checkout = () => {
  return (
    <div id="cart-checkout">
      <h2
        className="font-bold mb-3"
        style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}
      >
        <span>購物車</span>摘要
      </h2>

      <div className="mb-3" style={{ fontSize: "clamp(0.5em, 3vw, 1em)" }}>
        你選擇了 2 個產品
      </div>

      <div className="d-flex flex-jc-between flex-ai-center mb-2">
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          小計
        </div>
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          $30,000
        </div>
      </div>

      <div className="d-flex flex-jc-between flex-ai-center mb-2">
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          運費
        </div>
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          $0
        </div>
      </div>

      <div className="width-100 mb-1" style={{ borderBottom: "1px solid #E7E7E7" }}></div>

      <div className="d-flex flex-jc-between flex-ai-center mb-2">
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          總計
        </div>
        <div className="font-bold" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)" }}>
          $30,000
        </div>
      </div>

      <div id="cart-checkout-button">
        <button>結帳</button>
      </div>

    </div>
  );
};

export default Checkout;
