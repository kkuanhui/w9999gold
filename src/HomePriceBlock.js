import React from "react";
import HomePriceIntro from "./HomePriceIntro";

const HomePriceBlock = () => {
  return (
    <div
      className="d-flex flex-direction-column width-100"
      style={{
        margin: "10px auto",
        padding: "5px",
      }}
    >
      <HomePriceIntro />
    </div>
  );
};

export default HomePriceBlock;
