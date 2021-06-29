
const PriceIntro = () => {
    const currencyFormat = (num) => {
        return `${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
      }

    return (
        <div id="price-intro" className="price-component-block">

            <h1 id="price-intro-title">
                <p>黃金市價</p>
            </h1>
            <div>
                <span id="gold-futures-price">{currencyFormat(1881.88)}</span><span style={{ fontSize: "clamp(5vw, 18px, 1vw)"}}>NTD/錢</span>
            </div>

        </div>
    )
}

export default PriceIntro;
