import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useApp } from "../Context";

const Login = () => {
  const context = useApp();
  const dispatch = useAppDispatch()
  const memberInfo = context.memberInfo;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = () => {
    dispatch({
      type: "login",
      email: email,
      name: "葉大雄"
    })
  }
  if(memberInfo.name){
    return <Navigate to={"/member"} replace={true}></Navigate>
  }else{
    return(
      <div>
        <h1>Login Page</h1>
        <div style={{border: "1px solid #D3D3D3", width: "50%"}}>

          <div>
            <label htmlFor="email">信箱</label>
            <input id="email" type="text" onInput={(e) => setEmail(e.target.value)}></input>
          </div>

          <div>
            <label htmlFor="password">密碼</label>
            <input id="password" type="password" onInput={(e) => setPassword(e.target.value)}></input>
          </div>

          <div className="d-flex flex-ai-center flex-jc-around">
            <Link to={"/member/register/"}>註冊</Link>
            <button>忘記密碼</button>
            <button 
              onClick={() => {
                login(); 
              }}
            >
              登入
            </button>
          </div>

        </div>
      </div>
    )
  }
}

export default Login;