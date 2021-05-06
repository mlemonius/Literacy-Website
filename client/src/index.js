import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import {BrowserRouter as Router} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
          <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

