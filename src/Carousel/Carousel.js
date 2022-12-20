import React, { Children, useState, useRef, useLayoutEffect, useEffect } from "react";
import './carousel-style.css';

const Carousel = (props) => {
  const { children, style, className} = props;
  const [transx, setTransx] = useState(0)
  const [step, setStep] = useState(0)
  const [width, setWidth] = useState(0);
  const [wwidth, setwwidth] = useState(0)

  const childrenNum = Children.count(children);

  useEffect(() => {
    console.log(width)
  })

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  useEffect(() => {
    setTransx(width*step)
  }, [width])

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
    setTransx(width*step)
  };

  const ref = useRef(null);

  return (
    <div className={`carousel ${className}`} style={style} ref={ref}>
      <div className="carousel-direction" style={{left: "0px"}} onClick={() => handleClick('-')}>
        -
      </div>
      <div className="carousel-content" style={{transform: `translateX(-${transx}px)`}}>
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
