import React from 'react';
import PriceIntro from './PriceIntro';
import PriceDetail from './PriceDetail';

const PriceBlock = () => {
  return(
    <div id="price-block" className='flex-center'>
      <PriceIntro />
      <PriceDetail />
    </div>
  )
}

export default PriceBlock