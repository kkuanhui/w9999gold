import iconDeliver from './static/image/icon-deliver.png';
import iconCertificate from './static/image/icon-cerificate.png';
import iconWarrant from './static/image/icon-warrant.png';
import iconMarket from './static/image/icon-market.png';


const HomeFeature = () => {
  return(
    <div className="mb-5" style={{backgroundColor: "#F3F3F3", width: "100%"}}>

      <h2 style={{textAlign: "center", fontSize: "clamp(16px, 5vw, 48px)"}}>
        任何版型 客製化服務
      </h2>

      <div className="d-flex flex-jc-around flex-ai-center flex-wrap" style={{width: "min(100%, 576px)", margin: "0px auto", gap: "15px"}}>
        <Part title="純金保證" subTitle="付保證卡，保證回收機制。" imageSrc={iconCertificate}></Part>
        <Part title="產品保固" subTitle="產品售後保固，免費整理。" imageSrc={iconWarrant}></Part>
        <Part title="全國運送" subTitle="臺灣或外島，通通不漏接。" imageSrc={iconDeliver}></Part>
        <Part title="市場金價" subTitle="與市場同步，價格全透明。" imageSrc={iconMarket}></Part>
      </div>


    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <div>{props.title}</div>
      <div>{props.subTitle}</div>
      <img alt="intro icon" src={props.imageSrc}></img>
    </div>
  )
}

export default HomeFeature