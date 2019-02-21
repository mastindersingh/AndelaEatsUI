import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import configureStore from "./store/store";
import "./styles/main.scss";
import "react-day-picker/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";

import "./assets/images/favicon.ico";
import axios from "axios";

// set the application baseUrl
// axios.defaults.baseURL = "https://andelaeats.herokuapp.com/api/v1";
axios.defaults.baseURL = process.env.API_BASE_URL

const store = configureStore();
if (window.Raven) {
  // eslint-disable-next-line
  Raven.config(process.env.SENTRY_URL).install();
}

export default ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app") || document.createElement("div")
);
