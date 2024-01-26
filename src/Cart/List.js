import { GoTrash } from "react-icons/go";
import "../static/css/cart.css";
import "../static/css/custom-class.css"

const List = () => {
  return (
    <div id="cart-list">
      <h1 className="mb-5" style={{ fontSize: "clamp(0.8em, 3vw, 1.5em)"}}>
        購物車
      </h1>
      <div className="border-868686 p-3 width-100"
        style={{
          maxHeight: "calc(80vh - 50px)",
          overflow: "scroll",
          borderRadius: "25px"
        }}
      >
        <ListItem></ListItem>
        <ListItem></ListItem>
        <ListItem></ListItem>
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
          <button>
            <GoTrash></GoTrash>
          </button>
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

export default List;