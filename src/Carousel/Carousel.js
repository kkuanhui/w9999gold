import React, { Children, useState } from "react";
import './carousel-style.css';

const Carousel = (props) => {
  const { children, style, className} = props;
  const [transx, setTransx] = useState(0)
  const [step, setStep] = useState(0)

  const childrenNum = Children.count(children);
  console.log(step)
  const handleClick = () => {
    if (step >= childrenNum - 1) {
      setStep(0)
    } else {
      setStep(step+1)
    }
    console.log(step)
    setTransx(100*step)
  };

  return (
    <div className={`carousel ${className}`} style={style} onClick={() => handleClick()}>
      <div style={{transform: `translateX(-${transx}%)`}}>{children}</div>
    </div>
  );
};

export const CarouselChild = (props) => {
  const { children, widthPercent } = props;
  return (
    <div style={{"width": `${widthPercent}%`}}>
      {children}
    </div>
  )
};

export default Carousel;
