import { Route, Routes, Navigate, Link} from "react-router-dom";
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
  if (memberInfo.name) {
    return (
      <>
        <div>Welcome! {memberInfo.name}.</div>
        <div>自從 2021 年 8 月成為我們的會員。</div>
        <div>
          <button
            style={{ width: "80px", height: "30px", borderRadius: "15px", padding: "0px 5px", border: "1px solid #000"}}
          >
            <Link to="edit-profile/" style={{color: "#000"}}>
            編輯資料
            </Link>
          </button>
          <button
            style={{ width: "80px", height: "30px", borderRadius: "15px", padding: "0px 5px", border: "1px solid #000"}}
          >
            <Link to="change-password/" style={{color: "#000"}}>
              更改密碼
            </Link>
          </button>
        </div>
        <div>
          <button
            style={{ width: "80px", height: "30px", borderRadius: "15px", padding: "0px 5px", border: "1px solid #000"}}
            onClick={() => {
              dispatch({
                type: "logout",
              });
            }}
          >
            登出
          </button>
        </div>
      </>
    );
  } else {
    return <Navigate to={"login/"} replace={true}></Navigate>;
  }
};

export default Member;