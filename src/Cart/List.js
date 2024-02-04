import { GoTrash } from "react-icons/go";
import "../static/css/cart.css";
import "../static/css/custom-class.css"
import { useApp } from "../Context";

const List = () => {
  const context = useApp();
  const cart = context.cart;
  return (
    <div id="cart-list">
      <h1 className="mb-5" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)"}}>
        購物車
      </h1>
      <div className="border-868686 p-3 width-100"
        style={{
          height: "calc(80vh - 50px)",
          overflow: "hidden",
          borderRadius: "25px"
        }}
      >
        <div style={{
          overflow: "auto",
          height: "100%",
        }}>
          {
            cart.map((ele, idx) => {
              return <ListItem key={idx}
                title={ele.title}
                style={ele.style}
                qty={ele.qty}
                weight={ele.weight}
                size={ele.size}
                price={ele.price}
              ></ListItem>
            })
          }
        </div>
      </div>
    </div>
  );
};

const ListItem = ({
  title, style, qty, weight, size, price
}) => {
  return (
    <div className="cart-list-item">

      <input type="checkbox" />

      <img src="" alt="thumbnail" width={150} height={150} />

      <div className="d-grid height-100" style={{ gridTemplateRows: "auto" }}>
        <div
          className="font-bold d-flex flex-ai-start"
          style={{ fontSize: "clamp(1em,2vw,1.5em)" }}
        >
          {title}
        </div>
        <div style={{ fontSize: "clamp(0.8em,2vw,1em)", color: "#707072" }}>
          尺寸 {size}吋/ 重量 {weight}錢/ 款式 {style}
        </div>
        <div
          className="d-flex flex-ai-center flex-jc-start"
          style={{ gap: "5px" }}
        >
          <div style={{ fontSize: "clamp(0.8em, 2vw, 1em)", color: "#707072" }}>
            {qty}
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
          <button>
            <GoTrash></GoTrash>
          </button>
        </div>
      </div>

      <div
        className="font-bold"
        style={{ height: "100%", fontSize: "clamp(1em,2vw,1.5em)" }}
      >
        ${price}
      </div>

    </div>
  );
};

export default List;