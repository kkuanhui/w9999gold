import React, { Children, useState } from "react";
import './carousel-style.css';

const Carousel = (props) => {
  const { children, style, className} = props;
  const [transx, setTransx] = useState(0)
  const [step, setStep] = useState(0)

  const childrenNum = Children.count(children);

  const handleClick = (sign) => {
    if(sign === '+'){
      if (step >= childrenNum - 1) {
        setStep(0)
      } else {
        setStep(step+1)
      }
    }else{
      if (step <= 0) {
        setStep(childrenNum)
      } else {
        setStep(step-1)
      }
    }
    setTransx(100*step)
  };

  return (
    <div className={`carousel ${className}`} style={style}>
      <div className="carousel-direction" style={{left: "0px"}} onClick={() => handleClick('-')}>
        -
      </div>
      <div className="carousel-content" style={{transform: `translateX(-${transx}%)`}}>
        {children}
      </div>
      <div className="carousel-direction" style={{right: "0px"}} onClick={() => handleClick('+')}>
        +
      </div>
    </div>
  );
};

export const CarouselChild = (props) => {
  const { children } = props;
  return (
    <div style={{"width": `100%`}}>
      {children}
    </div>
  )
};

export default Carousel;
