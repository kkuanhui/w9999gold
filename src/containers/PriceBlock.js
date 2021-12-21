import PriceIntro from '../components/PriceIntro';
import PriceDetail from '../components/PriceDetail';

const PriceBlock = () => {
  return(
    <div id="price-block" className='flex-center'>
      <PriceIntro />
      <PriceDetail />
    </div>
  )
}

export default PriceBlock