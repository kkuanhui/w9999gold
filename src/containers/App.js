
import { Fragment } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AboutUsBlock from './AboutUsBlock';
import PriceBlock from './PriceBlock.js';
import Popup from "../components/Popup.js"

const App = () => {

  return (
    <Fragment>

      <div id="main-content">
        <NavBar />
        <PriceBlock />
        <AboutUsBlock />
      </div>

      <Footer></Footer>

      <Popup></Popup>

    </Fragment>
  );
}


export default App;
