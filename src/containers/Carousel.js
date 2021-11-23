
import { useState, useEffect } from "react";

const Carousel = (props) => {

  const { children } = props
  const totalCellItem = children.length;

  const [rollT, setRollT] = useState(1);
  const [transX, setTransX] = useState(0);
  const [transStyle, setTransStyle] = useState( {transform:`translateX(${transX}px)`} )

  const switchCellItem = (direction) => {
    switch(direction){
      case "previous":
        if(rollT !== 1){
          setTransX( transX + 300 );
          setRollT ( rollT - 1 );
        }
        break;
        default: // default is "next"
        if(rollT !== totalCellItem){
          setTransX( transX - 300 );
          setRollT ( rollT + 1 );
        }
        break;
    }  
  }

  useEffect(() => {
    const newStyleObj = {transform: `translateX(${transX}px)`}
    setTransStyle( newStyleObj )
    }, 
    [transX]
  )


  return(

      <div className="carousel-container">

        <div 
          className="carousel-buttom previous"
          onClick = {() => switchCellItem("previous")}
        >
          {"<"}
        </div>

        <div 
          className="carousel-cell"
          style={transStyle}
          >
          {children}
        </div>

        <div 
          className="carousel-buttom next"
          onClick = {() => switchCellItem("next")}
          >
          {">"}
        </div>

      </div>

  )

}


export default Carousel;
