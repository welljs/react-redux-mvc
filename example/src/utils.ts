import {applyMiddleware, compose, createStore as reduxCreateStore} from 'redux';
import {combine as combineReducers, middleware as requestMiddleware} from 'easy-redux';

export function createStore({data}) {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleWareList = [
    requestMiddleware(promiseHelper)
  ];
  const reducer = combineReducers({});
  const finalCreateStore = composeEnhancers(applyMiddleware(...middleWareList))(reduxCreateStore);
  return finalCreateStore(reducer, data);
}

/*
* in place of this helper can be superagent.js for example, or other asynс function. It is used by middleware to
* support async actions functionality
* */
function promiseHelper(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 3000);
  });
}
