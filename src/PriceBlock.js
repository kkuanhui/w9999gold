import React from 'react';
import PriceIntro from './PriceIntro';
import PriceDetail from './PriceDetail';

const PriceBlock = () => {
  return(
    <div id="price-block" className='flex-direction-column'>
      <PriceIntro />
      <PriceDetail />
    </div>
  )
}

export default PriceBlock