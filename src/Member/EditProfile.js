const Register = () => {
  const inputStyle = {
    width: "200px",
    height: "36px",
    borderRadius: "15px",
    border: "1px solid #868686",
    background: "#FFF",
    padding: "0px 5px",
  };
  return (
    <div className="pt-5">
      <div
        className="d-flex flex-ai-center flex-jc-center mr-auto ml-auto"
        style={{
          width: "500px",
          height: "450px",
          borderRadius: "15px",
          border: "1px solid #717171",
          background: "#fff",
        }}
      >
        <div style={{ width: "350px", height: "400px" }}>
          <h1 className="text-center width-100 font-size-15"
            style={{ marginBottom: "25px" }}
          >
            更改資料
          </h1>

          <div
            className="d-flex flex-ai-center flex-jc-between"
            style={{ marginBottom: "15px" }}
          >
            <label htmlFor="email" className="font-size-15">
              信箱：
            </label>
            <input id="email" style={inputStyle}></input>
          </div>

          <div
            className="d-flex flex-ai-center flex-jc-between"
            style={{ marginBottom: "15px" }}
          >
            <label htmlFor="email-2" className="font-size-15">
              信箱確認：
            </label>
            <input id="email-2" style={inputStyle}></input>
          </div>
          <div style={{ marginBottom: "30px" }}>
            <small className="color-ff0000">
              您會需要這個信箱找回遺失的密碼
            </small>
          </div>

          <div className="d-flex flex-ai-center flex-jc-between mb-3">
            <label htmlFor="password" className="font-size-15">
              密碼：
            </label>
            <input id="password" style={inputStyle}></input>
          </div>

          <div className="d-flex flex-ai-center flex-jc-between mb-3">
            <label htmlFor="name" className="font-size-15">
              姓名：
            </label>
            <input id="name" style={inputStyle}></input>
          </div>

          <div
            className="d-flex flex-ai-center flex-jc-between"
            style={{ marginBottom: "15px" }}
          >
            <label htmlFor="phone" className="font-size-15">
              電話：
            </label>
            <input id="phone" style={inputStyle}></input>
          </div>

          <button
            className="font-size-15 font-bold d-flex flex-jc-center flex-ai-center"
            style={{
              background: "#000",
              color: "white",
              width: "80px",
              height: "30px",
              borderRadius: "15px",
            }}
            onClick={() => {
              console.log("register!");
            }}
          >
            註冊
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
