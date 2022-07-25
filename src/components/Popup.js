import { useState } from "react"

const Popup = () => {
  // setState background color
  // setState content 
  const [bgColor, setBgColor] = useState('')
  const [content, setContent] = useState('')
  return(
    <div>
      {content}
    </div>
  )
}

export default Popup