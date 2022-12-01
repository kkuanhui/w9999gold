import React from "react";
import image from './static/image/j-1.jpg'

const HomeJumbotron = (props) => {
  return (
    <div className="jumbotron">
      <div>
        <img className="width-100 height-100" style={{objectFit: 'cover'}} src={image} alt="jumbotron" width='400'></img>
      </div>
    </div>
  );
};

export default HomeJumbotron;
