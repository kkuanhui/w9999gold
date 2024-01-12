import { useApp } from "../Context";

const ShoppingCart = () => {
  const context = useApp();
  const shoppingCart = context.shoppingCart;
  console.log(shoppingCart)
  if(shoppingCart.length === 0){
    return (
      <div>
        購物車沒有東西。
      </div>
    )
  }else{
    return ( 
      <div>
        {shoppingCart.map((ele, idx) => {
          return (
            <div key={idx}>
              {idx+1}. {ele.style} - 價格{ele.price}
            </div>
          )
        })}
      </div> 
    );
  }
};


export default ShoppingCart;
