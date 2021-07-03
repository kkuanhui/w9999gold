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
    fetch('http://localhost:5000/Backend1')
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
              initialWeight = {item.initialWeight}
              wage = {item.wage}
            /> 
          )
        })
      }

      </ Flickity>
      <div id="price-detail-info">
        <h2>特殊尺寸可以另外詢問</h2>
        <p>以上表格只包含常規尺寸表，其他客製尺寸重量大小可聯絡詢問。</p>
      </div>
    </div>

    )
}

export default PriceDetail;
