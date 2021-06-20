
import { Fragment } from 'react';
import NavBar from './NavBar';
import PriceIntro from './PriceIntro';
import PriceDetail from './PriceDetail';
import Footer from './Footer';

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