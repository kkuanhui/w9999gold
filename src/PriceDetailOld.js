
import Carousel from "./Carousel"
import PriceTable from "./PriceTable"

import { useState, useEffect } from "react";
import axios from "axios";

const PriceDetail = () => {

  const [Data, setData] = useState([]);
	
  // Second argument of useEffect is an enpty array [], which makes it only invoked at the first render.
  useEffect(
    () => {
    axios.get('./backend.json')
    .then(res => {
      setData(res.data)
      })
    .catch(err => 
      console.log('Something goes wrong.\n', err
      ))
    }, 
    [])



  return(
    <div id="price-detail" className="price-component-block">
      <Carousel>
      {
      // React require loop item must contains key. So I have to add index on each one.
      Data.map( (item, idx) => {
        return (
            <PriceTable 
              key={idx}
              sizeTraditional = {item.sizeTraditional}
              sizeCM = {item.sizeCM}
              weightTraditional = {item.weightTraditional}
              priceWTax = {item.priceWTax}
            /> 
          )
        })
      }
      </Carousel>
    </div>
  )
}

export default PriceDetail