import React from "react";

const HomeJumbotron = (props) => {
  return (
    <div className="jumbotron">
      <picture>
        <source
          media="(min-width:650px)"
          srcSet="img_pink_flowers.jpg"
        ></source>
        <img src="" alt="Flowers"></img>
      </picture>
    </div>
  );
};

export default HomeJumbotron;
