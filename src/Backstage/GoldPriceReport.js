import "../static/css/custom-class.css"
const GoldPriceReport = () => {
  return (
    <div className="ml-auto mr-auto" style={{width: "992px"}}>

      <div className="mb-3">
        <h1 className="font-size-25">仕彩黃金報價管理</h1>
        <div style={{ borderBottom: "1px solid #D3D3D3", width: "100%" }}></div>
      </div>

      <div className="mb-3">

        <div className="mb-1">
          <h2 className="font-size-20">報價公式</h2>
          <div 
            className="pt-3 pb-3 pl-1 pr-1 d-flex flex-ai-center flex-jc-center" 
            style={{
              width: "100%", 
              height: "100px", 
              borderRadius: "10px", 
              background: "#D9D9D9",
              color: "#000"
            }}
          >
            <div>
              基數X + 增數Y = 報價
            </div>
          </div>
        </div>

        <div className="mb-1 d-grid" 
          style={{gridTemplateColumns: "200px 70px 70px 70px", columnGap: "30px"}}>
          <label className="font-size-15">基數選擇(X)</label>
          <select className="border-d4d4d4">
            <option>詮美</option>
            <option>台新</option>
          </select>
          <button className="pt-1 pb-1 pl-3 pr-3"
            style={{background: "#000", color: "#fff", borderRadius: "15px", gridColumn: "4"}}>送出</button>
        </div>

        <div className="mb-1 d-grid" 
          style={{gridTemplateColumns: "200px 70px 70px 70px", columnGap: "30px"}}>
          <label className="font-size-15">金價增數(Y)</label>
          <input type="number" className="border-d4d4d4" placeholder="10"></input>
          <button className="pt-1 pb-1 pl-3 pr-3"
            style={{background: "#000", color: "#fff", borderRadius: "15px", gridColumn: "4"}}>送出</button>
        </div>

        <div className="mb-1">
          <div className="d-grid" 
            style={{gridTemplateColumns: "200px 70px 70px 70px", columnGap: "30px"}}>
            <label className="font-size-15">金價鎖定：</label>
            <input type="number" className="border-d4d4d4"></input>
            <input type="checkbox"></input>
            <button className="pt-1 pb-1 pl-3 pr-3"
              style={{background: "#000", color: "#fff", borderRadius: "15px"}}>送出</button>
          </div>
          <small style={{ color: "#ff0000" }}>鎖定報價就不會隨中盤變動</small>
        </div>
      </div>

      <div className="mb-3">
        <h2 className="font-size-20">報價走勢圖</h2>
        <div
          style={{ 
            width: "500px", 
            height: "300px", 
            background: "#D9D9D9", 
            margin: "0px auto"
          }}
        ></div>
      </div>

      <div className="mb-3">
        <h2 className="font-size-20">報價警語</h2>
        <textarea 
          className="d-block border-d4d4d4 width-100 font-size-10 p-3" 
          style={{height: "300px", borderRadius: "15px"}} 
        />
        <button className="pt-1 pb-1 pl-3 pr-3"
          style={{background: "#000", color: "#fff", borderRadius: "15px"}}>
          送出
        </button>
      </div>

    </div>
  );
};

export default GoldPriceReport;