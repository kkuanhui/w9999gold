import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../Context";
import CustomPreview from "./CustomPreview";
import CustomControl from "./CustomControl";
import "../static/css/custom-class.css"
import "../static/css/products.css"

const Custom = () => {
  const params = useParams(); // url parameter
  const context = useApp();
  const productMeta = context.productMeta;
  const productTypes = context.productTypes;

  const [type, setType] = useState({});
  const [main, setMain] = useState({});
  const [shape, setShape] = useState("雙龍搶珠");
  const [size, setSize] = useState(6);
  const [weight, setWeight] = useState(5);
  const [content, setContent] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const calculate = size * 1000 + weight * 3000;
    setPrice(calculate);
  }, [size, weight]);

  useEffect(() => {
    if (productTypes.length !== 0) {
      const filteredType = productTypes.filter(
        (ele) => ele.eName === params.productType
      )[0];
      setType(filteredType);
    }
    // if(Object.values(products.main).length !== 0){
    //   setMain(products.main)
    // }
  }, [productTypes]);

  return (
    <div id="custom">
      <CustomPreview></CustomPreview>
      <CustomControl></CustomControl>
    </div>
  );
};

export default Custom;