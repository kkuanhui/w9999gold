import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useApp } from "../Context";
import { FaLine, FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
// -----
import facebook from "../static/image/facebook.png"
import instagram from "../static/image/instagram.png"
import line from "../static/image/line.png"
import google from "../static/image/google.png"

const Login = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const memberInfo = context.memberInfo;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    dispatch({
      type: "login",
      email: email,
      name: "葉大雄",
    });
  };

  if (memberInfo.name) {
    return <Navigate to={"/member"} replace={true}></Navigate>;
  } else {
    return (
      <div 
        className="border-717171 d-flex flex-jc-center flex-ai-center"
        style={{ 
          padding: "15px 0px",
          width: "350px", 
          height: "350px", 
          borderRadius: "15px", 
          margin: "100px auto",
        }}
      >
        <div className="width-80 height-100 d-grid"
          style={{gridTemplateRows: "auto"}}
        >

          <h1 className="font-size-15 font-bold text-center">
            登入
          </h1>

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
                padding: "0px 5px"
              }}
              placeholder="example@gmail.com"
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-flex flex-ai-center flex-jc-between">
            <label htmlFor="password" className="font-size-15 font-bold">
              密碼:
            </label>
            <input
              id="password"
              type="password"
              style={{
                width: "200px",
                height: "36px",
                borderRadius: "15px",
                backgroundColor: "#CFCFCF",
                color: "#000",
                padding: "0px 5px"
              }}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <div className="font-size-15">利用其他平台登入</div>

            <div className="d-flex flex-ai-center flex-jc-around" 
              style={{gap: "50px"}}
            >
              <button>
                <img alt="google icon" width={30} height={30} src={google}></img>
              </button>
              <button>
                <img alt="facebook icon" width={30} height={30} src={facebook}></img>
              </button>
              <button>
                <img alt="line icon" width={30} height={30} src={line}></img>
              </button>
              <button>
                <img alt="instagram icon" width={30} height={30} src={instagram}></img>
              </button>
            </div>
          </div>

          <div className="d-flex flex-ai-center flex-jc-between"
            style={{gap: "50px", padding: ""}}
          >
            <button className="d-flex flex-jc-center flex-ai-center border-868686"
              style={{
                width: "80px",
                height: "30px",
                color: "#000",
                borderRadius: "10px",
                backgroundColor: "#fff"
              }}
            >
              <Link className="font-size-15 font-bold" 
                style={{color: "#000"}}
                to={"/member/register/"}
              >
                註冊
              </Link>
            </button>

            <button className="d-flex flex-jc-center flex-ai-center border-868686"
              style={{
                width: "140px",
                height: "30px",
                color: "#000",
                borderRadius: "10px",
                backgroundColor: "#fff"
              }}
            >
              <Link className="font-size-15 font-bold" 
                style={{color: "#000"}}
                to={"/member/forget-password/"}
              >
                忘記密碼
              </Link>
            </button>
          </div>

          <div className="d-flex flex-ai-center flex-jc-start">
            <button
              className="font-size-15 d-flex flex-ai-center flex-jc-center"
              style={{
                width: "80px",
                height: "30px",
                color: "#FFF",
                borderRadius: "10px",
                backgroundColor: "#277B00"
              }}
              onClick={() => {
                onLogin();
              }}
            >
              登入
            </button>
          </div>

        </div>
      </div>
    );
  }
};

export default Login;
