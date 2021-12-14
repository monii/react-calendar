import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import App from "./App";
import calenderReducer from "./store";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

const store = createStoreWithMiddleware(
  calenderReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
