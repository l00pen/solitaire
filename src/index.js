import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";

import App from 'Components/App';
import rootReducer from './reducers';
// import SpiderMoveToFoundation from './reducers/states/SpiderMoveToFoundation';

import * as serviceWorker from './serviceWorker';

const initialState = {};
const store = createStore(rootReducer, initialState, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
