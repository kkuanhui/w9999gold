import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './static/css/tag.css'
import './static/css/id.css'
import './static/css/class.css';
import './static/css/medium.css'
import './static/css/large.css'
import './static/css/extra-large.css'
import './static/css/general/layout.css'
import './static/css/general/root-and-custom.css'
// import axios from 'axios';

// axios.defaults.baseURL = 'https://express-psql-backend.herokuapp.com/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
