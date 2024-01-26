import { Link } from "react-router-dom";

const Error = () => {
  return(
    <div className="mr-auto ml-auto" style={{width: "992px"}}>
      <h1 className="font-size-25">後台沒有這個頁面</h1>
      <div className="font-size-20">
        <Link to={"/backstage"}> 回到後台首頁 </Link>
      </div>
    </div>
  )
}
export default Error;