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
    maxWeight,
    wage,
  } = prop;

  const [isContainTax, setIsContainTax] = useState(false)

  const [priceWOTax, setPriceWOTax] = useState((initialWeight * futurePrice + wage).toFixed())

  const [priceWTax,  setPriceWTax]  = useState(((initialWeight * futurePrice + wage) * 1.05).toFixed())

  const [goldWeight, setGoldWeight] = useState(initialWeight)
  
  const [weightText, setWeightText] = useState(`${goldWeight}錢`)
  
  // const onChangeGoldWeight = (lowerBound, upperBound, inputWeight, adding) => {
  //     if(adding){
  //         const nowWeight = inputWeight + 0.1
  //         setGoldWeight(nowWeight)
  //         setWeightText(`${nowWeight.toFixed(1)}錢`)
  //         setPriceWOTax((nowWeight * futurePrice + wage).toFixed(0))
  //         setPriceWTax(((nowWeight * futurePrice + wage)*1.05).toFixed(0))
  //     }else{
  //         const nowWeight = inputWeight - 0.1
  //         if(nowWeight < initialWeight){
  //           setGoldWeight(initialWeight)
  //           if(initialWeight === 0.25){
  //             setWeightText(`最少${initialWeight.toFixed(2)}錢`)
  //           }else{
  //             setWeightText(`最少${initialWeight.toFixed(1)}錢`)
  //           }
  //           setPriceWOTax((initialWeight * futurePrice + wage).toFixed(0))
  //           setPriceWTax(((initialWeight * futurePrice + wage) * 1.05).toFixed(0))
  //         }else{
  //           setGoldWeight(nowWeight.toFixed(1))
  //           setWeightText(`${nowWeight.toFixed(1)}錢`)
  //           setPriceWOTax((nowWeight * futurePrice + wage).toFixed(0))
  //           setPriceWTax(((nowWeight * futurePrice + wage) * 1.05).toFixed(0))
  //         }
  //     }
  // }

  const numPos = (x, min, max) => {
    if( min < x  && x < max){
      return {resX: Number(x.toFixed(2)), txt: ''}
    }else if( min >= x ){
      return {resX: Number(min.toFixed(2)), txt:'至少'}
    }else if( x >= max){
      return {resX: Number(max.toFixed(2)), txt: '最多'}
    }
  }

  const onChangeGoldWeight = (lowerBound, upperBound, adding) => {
    const nowWeight = Number((goldWeight + adding).toFixed(1))

    const compareRes = numPos(nowWeight, lowerBound, upperBound)
    const price = (compareRes.resX * futurePrice + wage)

    setGoldWeight(compareRes.resX)
    setWeightText(`${compareRes.txt}${parseFloat(compareRes.resX)}錢`)
    setPriceWOTax(price.toFixed(0))
    setPriceWTax((price * 1.05).toFixed(0))

  }

  return (

      <div className="price-table">

        <div style={{marginBottom: "10px"}}>
          <h2>浮字金牌尺寸：{sizeTraditional}</h2>
        </div>

		<div>

          <div>
            尺寸（公分）：{sizeCM}
          </div>

          <div>
            重量：    
            <div style={{display: "inline-block", width: "clamp(5vw, 120px, 80%)"}}> 
              <div className="flex-between" style={{border: "1px solid #999", borderRadius: "5px"}}>

                <button 
                    style={{
                        width: "13%", 
                        borderTopLeftRadius: "inherit",
                        borderBottomLeftRadius: "inherit", 
                        backgroundColor: "white", 
                        borderRight: "1px solid #999", 
                        cursor: "pointer"}}
                    onClick={() => onChangeGoldWeight(initialWeight, maxWeight, -0.1)}> 
                  <strong> - </strong> 
                </button>
                <div style={{textAlign: "center", display: "inline-block", width: "100%"}}>
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
                    onClick={() => onChangeGoldWeight(initialWeight, maxWeight, 0.1)}>
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



