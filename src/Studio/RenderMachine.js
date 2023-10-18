// render based on content object
export const Renderer = (obj) => {
  const style = {
    fontSize: "",
    fontFamily: "",
    textStyle: ""
  }
  switch (obj.dom) {
    case 'p':
      return <p style={style}>{Renderer(obj.children)}</p>;
    case 'span':
      return <span style={style}>{obj.children}</span>;
    case 'img':
      return <img src={obj.src} alt="custom-pic"></img>;
    default:
        return Renderer(obj.children)
  };
};

// refresh content object 
var myNode = {
  "id": "0",
  "type": "word",
  "place": [100, 50],
  "zIndex": 0,
  "content": [
    {
      "dom": "p",
      "children": [
        {
          "dom": "span",
          "children": "大雄 "
        },
      ]
    },
    {
      "dom": "p",
      "children": [
        {
          "dom": "span",
          "children": "小夫 小花"
        }
      ]
    },
    {
      "dom": "p",
      "children": [
        {
          "dom": "span",
          "children": "小豬 大嘴鳥"
        },
        {
          "dom": "span",
          "children": "技安 "
        },
      ]
    },
    {
      "dom": "p",
      "children": [
        {
          "dom": "span",
          "bold": true,
          "children": "敬獻"
        },
      ]
    },
  ]
}

function travelse(
    node = myNode, 
    range = {anchor: {path: [0, 0], offset: 0},focus: {path: [2, 0], offset: 4}},
    action = {bold: false,}
  ){
   const startEle = range.anchor.path
   const endEle = range.focus.path
   node.content.slice(startEle[0], endEle[0]+1).map((ele, key) => {
    if(key === 0){
      ele.children.slice(startEle[1]).map(e => {
        console.log(e.children.slice(range.anchor.offset))
      })
    }else if(key === endEle[0]){
      ele.children.slice(0,endEle[1]+1).map(e => {
        console.log(e.children.slice(0,range.focus.offset))
      })
    }else{
      ele.children.map(e => {
        console.log(e.children)
      })
    }
   })
}
travelse()
