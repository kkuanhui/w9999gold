import iconDeliver from './static/image/icon-deliver.png';
import iconCertificate from './static/image/icon-cerificate.png';
import iconWarrant from './static/image/icon-warrant.png';
import iconMarket from './static/image/icon-market.png';


const HomeIntro = () => {
  return(
    <div className="" style={{backgroundColor: "#F3F3F3", width: "100%"}}>
      <div style={{width: "50%", margin: "0px auto"}}>
        <h2 style={{textAlign: "center"}}>任何版型 客製化服務</h2>
        <div className="d-flex flex-jc-around flex-ai-center" style={{flexWrap: "wrap"}}>
          <Part title="純金保證" subTitle="付保證卡，保證回收機制。" imageSrc={iconCertificate}></Part>
          <Part title="產品保固" subTitle="產品售後保固，免費整理。" imageSrc={iconWarrant}></Part>
        </div>
        <div className="d-flex flex-jc-around flex-ai-center" style={{flexWrap: "wrap"}}>
          <Part title="全國運送" subTitle="不管台灣本島或是離島，通通不漏接。" imageSrc={iconDeliver}></Part>
          <Part title="市場金價" subTitle="金價與市場同步，價格完全透明。" imageSrc={iconMarket}></Part>
        </div>
      </div>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <div>{props.title}</div>
      <div>{props.subTitle}</div>
      <img alt="intro icon" src={props.imageSrc} width={100} height={100}></img>
    </div>
  )
}

export default HomeIntro