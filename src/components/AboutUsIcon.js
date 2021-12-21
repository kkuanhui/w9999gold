
const AboutUsIcon = (props) => {
  const {brickName, iconUrl} = props
  return(
    <div className="about-us-icon flex-center">
      <button onClick={() => {console.log("go about us")}}>
        <img src={iconUrl} alt={brickName} width="100" height="100"></img>
      </button>
    </div>
  )
}

export default AboutUsIcon