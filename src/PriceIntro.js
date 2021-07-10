import axios from "axios";
import {useEffect, useState} from "react";

const PriceIntro = () => {

    const currencyFormat = (num) => {
        return `${num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
        }

    const [futurePrice, setFuturePrice] = useState([]);

    useEffect(() => {
        axios.get("https://w9999gold-backend.herokuapp.com/backend-2")
        .then( res => {
            const resultText = currencyFormat(res.data.future)
            setFuturePrice(resultText)
        })
        .catch(err => 
            console.log('Something goes wrong.\n', err
        ))


    }, 
    []) 

    return (
        <div id="price-intro" className="price-component-block">

            <h1 id="price-intro-title">
                <p>黃金市價</p>
            </h1>
            <div>
                <span id="gold-futures-price">{futurePrice}</span><span style={{ fontSize: "clamp(5vw, 18px, 1vw)"}}>NTD/錢</span>
            </div>

        </div>
    )
}

export default PriceIntro;
