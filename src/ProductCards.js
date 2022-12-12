import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import imageGoldFan from './static/image/product-goldfan.jpg'
import imageCreativity from './static/image/product-plate-creativity.jpg'
import imageDeities from './static/image/product-plate-deities.jpg'
import imageOmori from './static/image/product-omori.jpg'

const Card = (props) => {

  return (
    <div>
      <Link to={props.linkTarget} className="text-center flex-item-flex overflow-hidden d-flex flex-ai-center flex-jc-between flex-direction-column">
        <div className="d-flex flex-direction-column flex-ai-center flex-jc-between">
            <div className="img-container">
              <img className="img-cover" src={props.imgUrl} width="120" height="120" alt="card img"></img>
            </div>
            <div className="card-name d-flex flex-ai-center flex-jc-center">
              {props.name}
            </div>
        </div>
      </Link>
    </div>
  );
};

const ProductCards = (props) => {
  const [apps, setApps] = useState([])
  const imgUrls = [
    imageCreativity,
    imageDeities,
    imageGoldFan,
    imageOmori,
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
    <div id="app-product" className="d-flex flex-jc-around flex-ai-center flex-wrap width-100">
      {apps.map((ele, idx) => {
        return <Card key={idx} linkTarget={ele['english_name']} name={ele['show_name']} imgUrl={ele["imgUrl"]}></Card>
      })
      }
      <div style={{"visiablity": "hidden"}}></div>
      <div style={{"visiablity": "hidden"}}></div>
      <div style={{"visiablity": "hidden"}}></div>
    </div>
  );
};

export default ProductCards;