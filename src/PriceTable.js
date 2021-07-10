import {useState} from 'react';

const PriceTable = (prop) => {

  const currencyFormat = (num) => {
      return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    }

  const {
    futurePrice,
    sizeTraditional,
    sizeCM,
    initialWeight,
    wage,
  } = prop;

  const [isContainTax, setIsContainTax] = useState(false)

  const [priceWOTax, setPriceWOTax] = useState((initialWeight * futurePrice + wage).toFixed())

  const [priceWTax,  setPriceWTax]  = useState(((initialWeight * futurePrice + wage) * 1.05).toFixed())

  const [goldWeight, setGoldWeight] = useState(initialWeight)
  
  const [weightText, setWeightText] = useState(`${goldWeight}錢`)
  
  const onChangeGoldWeight = (initialWeight, inputWeight, adding) => {
      if (adding){
          const nowWeight = inputWeight + 0.1
          setGoldWeight(nowWeight)
          setWeightText(`${nowWeight.toFixed(1)}錢`)
          setPriceWOTax((nowWeight * futurePrice + wage).toFixed(0))
          setPriceWTax(((nowWeight * futurePrice + wage)*1.05).toFixed(0))
      }else{
          const nowWeight = inputWeight - 0.1
          if(nowWeight < initialWeight){
            setGoldWeight(initialWeight)
            setWeightText(`最少${initialWeight.toFixed(1)}錢`)
            setPriceWOTax((initialWeight * futurePrice + wage).toFixed(0))
            setPriceWTax(((initialWeight * futurePrice + wage) * 1.05).toFixed(0))
          }else{
            setGoldWeight(nowWeight)
            setWeightText(`${nowWeight.toFixed(1)}錢`)
            setPriceWOTax((nowWeight * futurePrice + wage).toFixed(0))
            setPriceWTax(((nowWeight * futurePrice + wage) * 1.05).toFixed(0))
          }
      }
  }

  return (

      <div className="price-table">

        <div style={{marginBottom: "10px"}}>
          <h2>金牌尺寸：{sizeTraditional}</h2>
        </div>

		<div>

          <div>
            尺寸（公分）：{sizeCM}
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
                    onClick={() => onChangeGoldWeight(initialWeight, goldWeight, false)}> 
                  <strong> - </strong> 
                </button>
                <div style={{textAlign: "center", display: "inline-block", width: "70%"}}>
                  {weightText}
                </div>
                <button 
                    style={{
                        width: "13%", 
                        borderTopRightRadius: "inherit", 
                        borderBottomRightRadius: "inherit", 
                        backgroundColor: "white", 
                        borderLeft: "1px solid #999", 
                        cursor: "pointer"}}
                    onClick={() => onChangeGoldWeight(initialWeight, goldWeight, true)}>
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
                    {isContainTax?currencyFormat(priceWTax):currencyFormat(priceWOTax)}
                  </span>
                    元
                </span>
                <button className="price-table-switch-button" onClick={() => setIsContainTax(!isContainTax)}>
                  {isContainTax?"含稅":"不含稅"}
                </button>
            </div>


		</div>
      </div>

  )
}

export default PriceTable;



