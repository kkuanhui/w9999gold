import stevejobs from "../../static/image/steve-jobs.png"

// image
const Image = (props) => {
  const {imageObj, onChangeAct, onChangeMode} = props;
  const style = {
        "position": "absolute",
        "top": imageObj.top+50,
        "left": imageObj.left+50,
        "zIndex": imageObj.zIndex,
        "width": `${imageObj.width}px`,
        "height": `${imageObj.height}px`
  }
  return(
    <img tabIndex="0" 
      // onClick={() => {onChangeAct(imageObj.id)}} 
      // onFocus={() => {onChangeMode('photo')}}
      // onBlur ={() => {onChangeMode('normal')}}
      style={style} 
      alt="user custom" 
      src={stevejobs}
    />
  )
}

export default Image;