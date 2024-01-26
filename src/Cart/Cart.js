import { useApp } from "../Context";
import "../static/css/cart.css";
import Checkout from "./Checkout";
import List from "./List";

const Cart = () => {
  const context = useApp();
  const cart = context.cart;
  if (cart.length === 0) {
    return (
      <div>
        購物車沒有東西。
      </div>
    )
  } else {
    return (
      <div id="cart">
        <List></List>
        <Checkout></Checkout>
      </div>
    );
  }
};

export default Cart;
