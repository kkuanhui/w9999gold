// turn word object to jsx object. make object to become UI
export const renderWordObject = (obj) => {
  if(Object.values(obj).length === 0){
    // this is error boundary
    return null
  }
  const children = obj.children
  return children.map((item, key) => {
    const dom = item.dom
    if(dom === "p"){
      return (
        <p key={key}>
          {renderWordObject(item)}
        </p>
      )
    }else if(dom === "br"){
      return <br key={key}></br>
    }else if(dom === "span"){
      return (
        <span 
          key={key} 
          style={item.style}
        >
          {renderWordObject(item)}
        </span>
      )
    }else{
      return item.children
    }
  })
}

// generate children array
export const genChildrenArr = (htmlString) => {
  const html = document.createElement('div')
  html.innerHTML = htmlString
  const nodes = html.childNodes
  const arr = [...nodes].map(node => {
    if(node.nodeName === "#text"){
      return {
        dom: node.nodeName,
        children: node.data
      }
    }else{
      const camelCaseStyles = {};
      const styles = eleInlineStyleObj(node) 
      Object.keys(styles).forEach(key => {
        camelCaseStyles[kebabToCamelCase(key)] = styles[key];
      });
      return {
        dom: node.nodeName.toLowerCase(),
        style: camelCaseStyles,
        children: genChildrenArr(node.innerHTML)
      }
    }
  })
  return arr
}

function kebabToCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

// generate by ChatGPT
function eleInlineStyleObj(element) {
  var styleObject = {};
  // Get the inline style of the element
  var inlineStyle = element.style.cssText;
  // Split the inline style string into individual style declarations
  var styleDeclarations = inlineStyle.split(';');
  // Iterate through each style declaration
  styleDeclarations.forEach(function (declaration) {
    // Split the declaration into property and value
    var parts = declaration.split(':');
    if (parts.length === 2) {
      // Trim whitespaces and add to the styleObject
      var property = parts[0].trim();
      var value = parts[1].trim();
      styleObject[property] = value;
    }
  });
  return styleObject;
}