import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from 'axios'

const Card = (props) => {
  return (
    <div>
      <Link to={props.linkTarget}>
        <img src={"./djwoidjiwoe.png"} width="250" height="200"></img>
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
  return (
    <div id="app-product">
      {
        apps.map(obj => {
          return <Card linkTarget={obj['english_name']} name={obj['show_name']}></Card>
        })
      }
    </div>
  );
};

export default ProductCards;
