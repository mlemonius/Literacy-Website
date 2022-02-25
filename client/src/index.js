import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import { CookiesProvider } from "react-cookie";

const store = createStore(allReducers);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
