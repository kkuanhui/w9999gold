import { lazy } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { useApp, useAppDispatch } from "../Context";

const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const ChangePassword = lazy(() => import("./ChangePassword"));
const ForgetPassword = lazy(() => import("./ForgetPassword"));
const EditProfilee = lazy(() => import("./EditProfile"));

const Member = () => {
  return (
    <Routes>
      <Route index element={<MemberPage />}></Route>
      <Route path="login/*" element={<Login />}></Route>
      <Route path="register/*" element={<Register />}></Route>
      <Route path="change-password/*" element={<ChangePassword />}></Route>
      <Route path="forget-password/*" element={<ForgetPassword />}></Route>
      <Route path="edit-profile/*" element={<EditProfilee />}></Route>
      <Route path="*" element={<MemberPage />}></Route>
    </Routes>
  );
};

const MemberPage = () => {
  const context = useApp();
  const dispatch = useAppDispatch();
  const member = context.member;
  if (member.name) {
    return (
      <div className="pt-5 pl-5 pr-5" style={{width: "992px", margin: "0px auto"}}>
        <h1 className="mb-1 font-size-25">{member.name}，歡迎！</h1>
        <h2 className="mb-1 font-size-15">自從 2021 年 8 月成為我們的會員。</h2>
        <div className="mb-1 d-flex" style={{ gap: "10px" }}>
          <button
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "15px",
              padding: "0px 5px",
              border: "1px solid #000",
            }}
          >
            <Link to="edit-profile/" style={{ color: "#000" }}>
              編輯資料
            </Link>
          </button>
          <button
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "15px",
              padding: "0px 5px",
              border: "1px solid #000",
            }}
          >
            <Link to="change-password/" style={{ color: "#000" }}>
              更改密碼
            </Link>
          </button>
        </div>
        <div className="mb-1">
          <button
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "15px",
              padding: "0px 5px",
              border: "1px solid #000",
            }}
            onClick={() => {
              dispatch({
                type: "logout",
              });
            }}
          >
            登出
          </button>
        </div>

        {member.hasBackstagePrivilege ? (
          <BackstageProtal></BackstageProtal>
        ) : null}
      </div>
    );
  } else {
    return <Navigate to={"login/"} replace={true}></Navigate>;
  }
};

const BackstageProtal = () => {
  return (
    <div className="mb-1">
      <button
        style={{
          width: "140px",
          background: "#FFD4D4",
          height: "30px",
          borderRadius: "15px",
          padding: "0px 5px",
          border: "1px solid #000",
        }}
      >
        <Link to="/backstage" style={{ color: "#000" }}>
          進入後台
        </Link>
      </button>
    </div>
  );
};

export default Member;
