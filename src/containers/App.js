
import { Fragment } from 'react';
import NavBar from '../components/NavBar';
import PriceIntro from '../components/PriceIntro';
import PriceDetail from '../components/PriceDetail';
import Footer from '../components/Footer';

const App = () => {

  return (
    <Fragment>

      <div id="main-content">
        <NavBar />
        <div id="price-row" className="flex-center">
          <PriceIntro />
          <PriceDetail />
        </div>
      </div>
      <Footer />

    </Fragment>
  );
}


export default App;
