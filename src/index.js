import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(
  rootReducer, 
  applyMiddleware()
)

// run saga middle ware
sagaMiddleware.run(mySaga)

ReactDOM.render(
  <Provider store = {store} >
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
