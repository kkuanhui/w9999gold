import React from 'react';

const Card = (props) => {
  return (
    <div>
      <Link to={props.linkTarget}>
        <img src={props.imgPlaceholder} width="250" height="200"></img>
        <div>{props.name}</div>
      </Link>
    </div>
  );
};

const ProductCards = (props) => {
  return (
    <div id="app-product">
      <Card
        linkTarget="plate-deities"
        name="神明金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="plate-regular"
        name="純金金牌"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="goldfan"
        name="黃金扇"
        imgPlaceholder={imgPlaceholder}
      ></Card>
      <Card
        linkTarget="omori"
        name="純金御守"
        imgPlaceholder={imgPlaceholder}
      ></Card>
    </div>
  );
};


export default ProductCards;