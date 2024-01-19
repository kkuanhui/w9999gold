const ChangePassword = () => {
  const inputStyle = {
    width: "200px",
    height: "36px",
    borderRadius: "15px",
    border: "1px solid #868686",
    background: "#FFF",
    padding: "0px 5px"
  }
  return (
    <div className="d-flex flex-ai-center flex-jc-center mr-auto ml-auto" 
      style={{
        marginTop: "20px",
        width: "500px", 
        height: "300px",
        borderRadius: "15px",
        border: "1px solid #717171",
        background: "#fff",
      }}
    >
      <div style={{width: "350px", height: "240px"}}>

        <h1 className="text-center width-100 font-size-15"
          style={{marginBottom: "25px"}}
        >
          更改密碼
        </h1>

        <div className="d-flex flex-ai-center flex-jc-between"
          style={{marginBottom: "15px"}}
        >
          <label htmlFor="old-pw" className="font-size-15">舊密碼：</label>
          <input id="old-pw" style={inputStyle}></input>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between"
          style={{marginBottom: "15px"}}
        >
          <label htmlFor="new-pw" className="font-size-15">新密碼：</label>
          <input id="new-pw" style={inputStyle}></input>
        </div>

        <div className="d-flex flex-ai-center flex-jc-between mb-3">
          <label htmlFor="new-pw-2" className="font-size-15">密碼確認：</label>
          <input id="new-pw-2" style={inputStyle}></input>
        </div>

        <button className="font-size-15 font-bold d-flex flex-jc-center flex-ai-center"
          style={{background: "#000", color: "white", width: "80px", height: "30px", borderRadius: "15px"}}
          onClick={() => {
            console.log('change pw!')
          }}
        >
          送出
        </button>

      </div>


    </div>
  )
}

export default ChangePassword;