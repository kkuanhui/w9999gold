import { useState } from "react"

const Popup = () => {

  const [isMenuPopup, setIsMenuPopup] = useState(false)

  const handleClick = () => {
    setIsMenuPopup(!isMenuPopup)
  }

  const [bgColor, setBgColor] = useState('')
  const [content, setContent] = useState('')

  return(
    <div style={{"display": (isMenuPopup)?"block":"none", "backgroundColor": "gray"}}>
      <div style={{"backgroundColor": "white"}}>content</div>
    </div>
  )

}

export default Popup