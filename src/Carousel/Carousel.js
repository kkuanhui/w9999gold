import React, { Children, useState, useRef, useLayoutEffect, useEffect } from "react";
import './carousel-style.css';

const Carousel = (props) => {
  const { children, style, className} = props;
  const [transx, setTransx] = useState(0)
  const [step, setStep] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0)

  const childrenNum = Children.count(children);

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    setContainerWidth(ref.current.offsetWidth);
  }, [windowWidth]);

  useEffect(() => {
    setTransx(containerWidth*step)
  }, [containerWidth])

  const handleClick = (sign) => {
    if(sign === '+'){
      if (step >= childrenNum - 1) {
        setStep(0)
        setTransx(0)
      } else {
        setStep(step+1)
        setTransx(containerWidth*(step+1))
      }
    }else{
      if (step <= 0) {
        setStep(childrenNum -1)
        setTransx(containerWidth*(childrenNum-1))
      } else {
        setStep(step-1)
        setTransx(containerWidth*(step-1))
      }
    }
  };

  const ref = useRef(null);

  return (
      <div className={`carousel ${className}`} style={style} ref={ref}>
        <div className="carousel-direction" style={{left: "0px"}} onClick={() => handleClick('-')}>
          <div>
            {"<"}
          </div>
        </div>
        <div className="carousel-content" style={{transform: `translateX(-${transx}px)`}}>
          {children.map((ele, idx) => {return <div key={idx} style={{width: `${containerWidth}px`}}>{ele}</div>})}
        </div>
        <div className="carousel-direction" style={{right: "0px"}} onClick={() => handleClick('+')}>
          <div>
            {">"}
          </div>
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
