import React from 'react';
import HomePriceIntro from './HomePriceIntro';
import HomePriceDetail from './HomePriceDetail';

const HomePriceBlock = () => {
  return(
    <div id="price-block" className='flex-direction-column'>
      <HomePriceIntro />
      <HomePriceDetail />
    </div>
  )
}

export default HomePriceBlock