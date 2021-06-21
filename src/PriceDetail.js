import React, { useState, useEffect } from 'react';

import Flickity from "react-flickity-component";
import './static/css/flickity.css';

import PriceTable from './PriceTable';


import axios from 'axios';


const PriceDetail = () => {

	const flickityOptions = {
		initialIndex: 0,
		wrapAround: true,
	}

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

    <Flickity
      className={'price-component-block'} // default ''
      elementType={'div'} // default 'div'
      options={flickityOptions} // takes flickity options {}
      disableImagesLoaded={false} // default false
      reloadOnUpdate // default false
      static// default false
    >

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
            priceWOTax = {item.priceWOTax}
          /> 
        )
      })
    }

    </ Flickity>

    )
}

export default PriceDetail;
