import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const Card = (props) => {

  return (
    <div>
      <Link to={props.linkTarget}>
        <img src={props.imgUrl} width="250" height="200" alt={'card img'}></img>
        <div>{props.name}</div>
      </Link>
    </div>
  );
};

const ProductCards = (props) => {
  const [apps, setApps] = useState([])
  useEffect(() => {
    axios.get(`/list-apps`)
    .then(res => {
      setApps(res.data)
    })
  }, [])
  const imgUrls = [
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652312/w9999gold/plate-deities-1_tunbky.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652316/w9999gold/plate-deities-2_wjy9xw.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652321/w9999gold/goldfan-1.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652318/w9999gold/omori-1_ichsxz.png"
  ]
  return (
    <div id="app-product">
      <Card linkTarget={apps[0]?.['english_name']} name={apps[0]?.['show_name']} imgUrl={imgUrls[0]}></Card>
      <Card linkTarget={apps[1]?.['english_name']} name={apps[1]?.['show_name']} imgUrl={imgUrls[1]}></Card>
      <Card linkTarget={apps[2]?.['english_name']} name={apps[2]?.['show_name']} imgUrl={imgUrls[2]}></Card>
      <Card linkTarget={apps[3]?.['english_name']} name={apps[3]?.['show_name']} imgUrl={imgUrls[3]}></Card>
    </div>
  );
};

export default ProductCards;
