/*
 * Word is a WYSIWYG editor.
 */

import React, { useRef, useEffect } from "react";
import ContentEditable from 'react-contenteditable'

const Word = (props) => {
  const { productInfo } = props;
  const component = useRef(null);

  const itemStyle = {
    // fontSize: `${productInfo.fontSize}px`,
    // fontWeight: productInfo.fontWeight,
    // fontStyle: productInfo.fontStyle,
    // fontFamily: productInfo.fontFamily,
    // textDecoration: productInfo.textDecoration,
    textAlign: productInfo.textAlign,
    writingMode: productInfo.writingMode,
    zIndex: productInfo.zIndex,
  };

  return (
    /*
    Incorporating the 'contenteditable' property within the React.js framework can present challenges. 
    React's guiding principle emphasizes that DOM manipulation should be exclusively handled through React.js. 
    However, 'contenteditable' allows users to make direct modifications to the DOM, potentially resulting in unexpected outcomes.
    */
    <ContentEditable
      innerRef={component}
      html={productInfo.content} // innerHTML of the editable div
      disabled={props.inEditMode} // use true to disable editing
      onChange={(e) =>{
          console.log(e.currentTarget.innerHTML)
          props.onPIChange(productInfo.id, "content", e.currentTarget.innerHTML)
        }}
      tagName="div" // Use a custom HTML tag (uses a div by default)
    />
  );

};

export default Word;
