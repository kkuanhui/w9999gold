
const PriceTable = (prop) => {

  const {
    sizeTraditional,
    sizeCM,
    weightTraditional,
    priceWTax,
    // priceWOTax
  } = prop;

  return (

      <div className="price-table">

        <div 
        style={{
          marginBottom: "10px"
        }}
        >
          <h2>{sizeTraditional}</h2>
        </div>

				<div>
          <div>
            尺寸：{sizeCM}
          </div>

          <div>
            重量：{weightTraditional}    
          </div>

          <hr 
            style={{
              height: "1px",
              backgroundColor: "rgb(149, 163, 152)",
              marginTop: "10px",
            }}
          />

          <div
           style={{marginTop: "10px"}}
          >
            <span 
            style={{color: "green", fontWeight: "bold", fontSize: "2rem"}}
            >
              {priceWTax}
            </span>元
          </div>
				</div>

      </div>

  )
}

export default PriceTable;



