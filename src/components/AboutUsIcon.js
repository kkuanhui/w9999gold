
const AboutUsIcon = (props) => {
  const {brickName, iconUrl, pageUrl} = props
  return(
    <div className="about-us-icon flex-center">
      <button>
        <a href={pageUrl} className="footer-icon-link" target="_blank" rel="noopener noreferrer">
          <img src={iconUrl} alt={brickName} width="100" height="100"></img>
        </a>
      </button>
    </div>
  )
}

export default AboutUsIcon