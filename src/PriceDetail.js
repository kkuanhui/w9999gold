import React, { useState, useEffect } from 'react';

import Flickity from "react-flickity-component";
import './static/css/flickity.css';

import PriceTable from './PriceTable';


// import axios from 'axios';


const PriceDetail = () => {

	const flickityOptions = {
		initialIndex: 0,
		wrapAround: true,
        pageDots: false,
	}

  const [Data, setData] = useState([]);
	
  // Second argument of useEffect is an enpty array [], which makes it only invoked at the first render.
  useEffect(
    () => {
    fetch('https://w9999gold-backend.herokuapp.com/backend-1')
    .then(res => 
        res.json()
      ).then(data => 
      setData(data)
      )
    .catch(err => 
      console.log('Something goes wrong.\n', err
      ))
    }, 
    [])
  
	return(

     <div className={'price-component-block'}>
      <Flickity
        className={''} // default ''
        style={{marginBottom: ""}}
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
              futurePrice = {item.futurePrice}
              sizeTraditional = {item.sizeTraditional}
              sizeCM = {item.sizeCM}
              initialWeight = {Number(item.initialWeight)}
              maxWeight = {item.maxWeight}
              wage = {item.wage}
            /> 
          )
        })
      }

      </ Flickity>
      <div id="price-detail-info">
        <p>
          以上表格僅顯示常規產品參考價格，更大尺寸歡迎詢問。
        </p>
        <p>
          部分尺寸或重量會增加少許工錢。
        </p>
        <p>
          最終售價以本公司專員報價為準。
        </p>
      </div>
    </div>

    )
}

export default PriceDetail;
