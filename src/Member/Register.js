import { useAppDispatch } from "../Context";

const Register = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>註冊頁面</h1>

      <div>
        <div>
          <label htmlFor="name">姓名:</label>
          <input id="name"></input>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email"></input>
        </div>
        <div>
          <label htmlFor="email-2">Email:</label>
          <input id="email-2"></input>
        </div>
        <div>
          <label htmlFor="password">密碼:</label>
          <input id="password"></input>
        </div>
      </div>

      <div>
        <buttom 
          onClick={() => {
            console.log('register!')
          }}
        >
          註冊
        </buttom>
      </div>

    </div>
  )
}

export default Register;