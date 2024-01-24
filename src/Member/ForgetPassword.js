import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "../Context";
// -----
import "../static/css/custom-class.css";

const ForgetPassword = () => {
  const context = useApp();
  const member = context.member;
  const [email, setEmail] = useState("");

  if (member.name) {
    return <Navigate to={"/member"} replace={true}></Navigate>;
  } else {
    return (
      <div className="pt-5">
        <div
          className="border-717171 d-flex flex-jc-center flex-ai-center mr-auto ml-auto"
          style={{
            padding: "15px 0px",
            width: "350px",
            height: "160px",
            borderRadius: "15px",
          }}
        >
          <div
            className="width-80 height-100 d-grid"
            style={{ gridTemplateRows: "auto" }}
          >
            <h1 className="font-size-15 font-bold text-center">找回密碼</h1>

            <div className="d-flex flex-ai-center flex-jc-between">
              <label htmlFor="email" className="font-size-15 font-bold">
                信箱:
              </label>
              <input
                id="email"
                type="email"
                style={{
                  width: "200px",
                  height: "36px",
                  borderRadius: "15px",
                  background: "#CFCFCF",
                  color: "#000",
                  padding: "0px 5px",
                }}
                placeholder="example@gmail.com"
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="font-size-15 d-flex flex-ai-center flex-jc-center"
              style={{
                width: "80px",
                height: "30px",
                color: "#FFF",
                borderRadius: "10px",
                backgroundColor: "#277B00",
              }}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ForgetPassword;
