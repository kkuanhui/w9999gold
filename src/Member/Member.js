import { Route, Routes, Navigate } from "react-router-dom";
import { useApp, useAppDispatch } from "../Context";
import Login from "./Login"
import Register from "./Register";
import ChangePassword from "./ChangePassword";
import ShoppingCart from "../ShoppingCart/ShoppingCart"

const Member = () => {
  return(
    <Routes>
      <Route index element={<MemberPage />} ></Route>
      <Route path="login/" element={<Login/>}></Route>
      <Route path="register/" element={<Register/>}></Route>
      <Route path="change-password/" element={<ChangePassword/>}></Route>
      <Route path="shopping-cart/" element={<ShoppingCart/>}></Route>
    </Routes>
  )
}

const MemberPage = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const memberInfo = context.memberInfo;
  if(memberInfo.name){
    return (
      <>
        <div>
          Welcome! {memberInfo.name}.
        </div>
        <div>
          <button onClick={() => {
            dispatch({
              type: "logout",
            }) 
          }}> logout </button>
        </div>
      </>
    )
  }else{
    return <Navigate to={"login/"} replace={true}></Navigate>
  }

}

export default Member;