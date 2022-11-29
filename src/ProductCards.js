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
  const imgUrls = [
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652312/w9999gold/plate-deities-1_tunbky.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652316/w9999gold/plate-deities-2_wjy9xw.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652321/w9999gold/goldfan-1.png",
    "https://res.cloudinary.com/hbehita9k/image/upload/v1669652318/w9999gold/omori-1_ichsxz.png"
  ]
  useEffect(() => {
    axios.get(`/list-apps`)
    .then(res => {
      const data = res.data
      data[0]["imgUrl"]=imgUrls[0]
      data[1]["imgUrl"]=imgUrls[1]
      data[2]["imgUrl"]=imgUrls[2]
      data[3]["imgUrl"]=imgUrls[3]
      setApps(res.data)
    })
  }, [])
  return (
    <div id="app-product">
      {apps.map(ele => {
        return <Card linkTarget={ele['english_name']} name={ele['show_name']} imgUrl={ele["imgUrl"]}></Card>
      })}
    </div>
  );
};

export default ProductCards;
