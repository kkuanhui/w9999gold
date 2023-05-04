import React from "react";


const ProductPlate = (props) => {
  return (
    <div style={{width: "min(100%, 992px)", margin: "0px auto"}}>
      <h1>神明金牌</h1>
      <div>
        <PartProduct></PartProduct>
        {/* <PartCustomer></PartCustomer> */}
      </div>
    </div>
  )
};

const PartProduct = () => {
  return (
    <div>
      <div>
        <div className="d-inline-block" style={{width: "30px", aspectRatio: "1/1", border: "1px solid #3E3E3E", borderRadius: "5px", backgroundColor: "#5E5E5E"}}></div>
        <div className="d-inline-block">選擇樣式</div>
      </div>
      <div>
        <div className="d-inline-block" style={{width: "30px", aspectRatio: "1/1", border: "1px solid #3E3E3E", borderRadius: "5px"}}></div>
        <div className="d-inline-block">選擇樣式</div>
      </div>
    </div>
  )
}

const PartCustomer = () => {
  return (
    <div>
      <div>報價諮詢</div>
      <div>姓名</div>
      <div>電話</div>
      <div>email</div>
    </div>
  )
}



export default ProductPlate;