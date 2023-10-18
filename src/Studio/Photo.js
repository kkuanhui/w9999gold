/**
 * Photo
 * The "Photo" component in Component Studio is used for editing images. 
 * You can resize the image and apply corner radius to it using this component.
 *
 * @param {Object} options - Component options.
 */

import myImg from '../static/image/steve-jobs.png';

const Photo = (props) => {
 return(
    <div>
      <img 
         draggable="false"
         width={200}
         src={myImg}
         style={{
            width: "100%",
            userSelect: "none",
         }}
         alt="custom"
      ></img>
    </div>
 )
}

export default Photo;