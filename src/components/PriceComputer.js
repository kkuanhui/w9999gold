import { useState } from "react";

const PriceComputer = () => {
  const [total, setTotal] = useState(0);
  return (
    <div id="price-computer">
      <div>
        <div>
          <div className="price-computer-name price-computer-parameter">
            金牌
          </div>

          <div className="price-parameter-form">
            <div>尺寸</div>
            <div>
              <select>
                <option>1寸</option>
                <option>2寸</option>
              </select>
            </div>
            <div>工錢</div>
            <div>$ 2345</div>
          </div>
        </div>

        <div>
          <div className="price-computer-name price-computer-parameter">
            黃金
          </div>

          <div className="price-parameter-form">
            <div>重量</div>
            <div>
              <select>
                <option>1錢</option>
                <option>2錢</option>
              </select>
            </div>
            <div>市價</div>
            <div>$ 2345</div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="price-computer-name price-computer-total">總價</div>
          <div>$ {total}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceComputer;
