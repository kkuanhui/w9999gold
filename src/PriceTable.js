import {useState} from 'react';

const PriceTable = (prop) => {

  const {
    future,
    sizeTraditional,
    sizeCM,
    weightTraditional,
    priceWTax,
    priceWOTax
  } = prop;

  const [containTax, setContainTax] = useState(false);

  const [goldWeight, setGoldWeight] = useState(weightTraditional)
  
  const [weightText, setWeightText] = useState(`${weightTraditional}錢`)

  //const [price, setPrice] = useState(future * goldWeight)
  
  const onSwitchPrice = () => {
    setContainTax(!containTax)
  }

  const onChangeGoldWeight = (initialWeight, inputWeight, adding) => {
      //let a
      //const nowWeight = (adding)?  a = inputWeight+0.1: a = inputWeight-0.1
      if (adding){
          const nowWeight = inputWeight + 0.1
          setGoldWeight(nowWeight)
          setWeightText(`${nowWeight.toFixed(1)}錢`)
      }else{
          const nowWeight = inputWeight - 0.1
          if(nowWeight < initialWeight){
            setGoldWeight(initialWeight)
            setWeightText(`最少${initialWeight.toFixed(1)}錢`)
          }else{
            setGoldWeight(nowWeight)
            setWeightText(`${nowWeight.toFixed(1)}錢`)
          }
      }

      //(nowWeight < initialWeight)?(
      //  setGoldWeight(initialWeight),
      //  setWeightText(`最少${initialWeight}錢`)
      //):(
      //);
       
      console.log(goldWeight)
      console.log(weightText)
  }

  return (

      <div className="price-table">

        <div style={{marginBottom: "10px"}}>
          <h2>金牌尺寸：{sizeTraditional}</h2>
        </div>

		<div>

          <div>
            尺寸：{sizeCM}
          </div>

          <div>
            重量：    
            <div style={{display: "inline-block", width: "clamp(5vw, 100px, 60%)"}}> 
              <div className="flex-between" style={{border: "1px solid #999", borderRadius: "5px"}}>

                <button 
                    style={{
                        width: "13%", 
                        borderTopLeftRadius: "inherit",
                        borderBottomLeftRadius: "inherit", 
                        backgroundColor: "white", 
                        borderRight: "1px solid #999", 
                        cursor: "pointer"}}
                    onClick={() => onChangeGoldWeight(weightTraditional, goldWeight, false)}> 
                  <strong> - </strong> 
                </button>
                <div style={{textAlign: "center", display: "inline-block", width: "70%"}}>{weightText}</div>
                <button 
                    style={{
                        width: "13%", 
                        borderTopRightRadius: "inherit", 
                        borderBottomRightRadius: "inherit", 
                        backgroundColor: "white", 
                        borderLeft: "1px solid #999", 
                        cursor: "pointer"}}
                    onClick={() => onChangeGoldWeight(weightTraditional, goldWeight, true)}>
                  <strong> + </strong> 
                </button>

              </div>
            </div>

          </div>

          <hr style={{height: "1px",backgroundColor: "rgb(149, 163, 152)",marginTop: "10px"}}/>


            參考價格：
            <div className="flex-between" style={{marginTop: "10px"}}>
                <span>
                  <span style={{color: "green", fontWeight: "bold", fontSize: "2rem", cursor: "pointer"}}>
                    {containTax?priceWTax:priceWOTax}
                  </span>
                    元
                </span>
                <button className="price-table-switch-button" onClick={() => onSwitchPrice()}>
                  {containTax?"含稅":"不含稅"}
                </button>
            </div>


		</div>
      </div>

  )
}

export default PriceTable;



