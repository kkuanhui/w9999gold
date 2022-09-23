
const Jumbotron = (props) => {
    return (
        <div className="jumbotron">
          <picture>
            <source media="(min-width:650px)" srcSet="img_pink_flowers.jpg"></source>
            <img src="img_orange_flowers.jpg" alt="Flowers"></img>
          </picture>
        </div>
    )
}

export default Jumbotron