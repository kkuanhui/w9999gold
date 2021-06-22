import {useState} from 'react';

const PriceTable = (prop) => {

  const {
    sizeTraditional,
    sizeCM,
    weightTraditional,
    priceWTax,
    priceWOTax
  } = prop;

  const [containTax, setContainTax] = useState(false);

  const onSwitchPrice = () => {
    setContainTax(!containTax)
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
            重量：{weightTraditional}    
          </div>

          <hr style={{height: "1px",backgroundColor: "rgb(149, 163, 152)",marginTop: "10px"}}/>

          <div className="flex-between" style={{marginTop: "10px"}}>

            <div>
                <span style={{color: "green", fontWeight: "bold", fontSize: "2rem", cursor: "pointer"}}>
                  {containTax?priceWTax:priceWOTax}
                </span>
                  元
            </div>
            <span>
              <button className="price-table-switch-button" onClick={() => onSwitchPrice()}>
                {containTax?"含稅":"不含稅"}
              </button>
            </span>

          </div>

		</div>
      </div>

  )
}

export default PriceTable;



