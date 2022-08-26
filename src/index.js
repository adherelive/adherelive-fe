import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { IntlProvider, addLocaleData } from "react-intl";
import arLocaleData from "react-intl/locale-data/ar";
import esLocaleData from "react-intl/locale-data/es";
import hiLocalData from "react-intl/locale-data/hi";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./modules";
import translations from "./i18n/locales";
import retainState from "./RetainState";
import { getQuery } from "./Helper/queryString";

import "./Styles/index.less";

const Desktop = lazy(() =>
  import(/* webpackChunkName: "DesktopWrapper" */ "./Containers/Routes")
);

const middleware = [thunk, retainState];

let store;
if (process.env.NODE_ENV === "development") {
  store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  store = createStore(allReducers, applyMiddleware(...middleware));
}

addLocaleData(arLocaleData);
addLocaleData(esLocaleData);
addLocaleData(hiLocalData);
/* fetch locale */
const search = window.location.search;
const { locale = "en" } = getQuery(search);
const messages = translations[locale];

const sw = window.screen.width;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <IntlProvider locale={locale} key={locale} messages={messages}>
      <Suspense fallback={null}>
        <Desktop />
      </Suspense>
    </IntlProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
