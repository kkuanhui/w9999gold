import {useState} from 'react';

const PriceSwitch = () => {
  const [isSwitch, setIsSwitch] = useState(false)
  return(
    <div id="price-switch">
      <button className="blue-button" type="button" onClick={() => setIsSwitch(!isSwitch)}>
        {(isSwitch)?"顯示購買價":"顯示回收價"}
      </button>
    </div>
  )
}

export default PriceSwitch