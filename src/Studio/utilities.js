export const renderWordObject = (obj) => {
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
          style={{
            fontSize: `${item.fontSize}px`,
            fontFamily: item.fontFamily,
            fontStyle: item.italic,
            fontWeight: item.bold,
            textDecoration: item.underline
          }}
        >
          {renderWordObject(item)}
        </span>
      )
    }else{
      return item.children
    }
  })

}