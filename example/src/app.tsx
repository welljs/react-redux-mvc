import React from 'react';
import ReactDOM from 'react-dom';
import {createStore as reduxCreateStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {combine as combineReducers, middleware as requestMiddleware} from 'easy-redux';
import {ProfileForm} from './ProfileForm';
import {ReactReduxMvc} from '../../lib';
import {UserModel} from './ProfileForm/UserModel';

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

export function createStore({data}) {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleWareList = [
    requestMiddleware(promiseHelper)
  ];
  const reducer = combineReducers({});
  const finalCreateStore = composeEnhancers(applyMiddleware(...middleWareList))(reduxCreateStore);
  return finalCreateStore(reducer, data);
}

if (!(window as any).__initialData) {
  (window as any).__initialData = {};
}

const appStore = createStore({data: (window as any).__initialData.store || {}});

ReactDOM.render(
  <Provider store={appStore}>
    <ReactReduxMvc store={appStore}>
      <ProfileForm user={UserModel.defaults}/>
    </ReactReduxMvc>
  </Provider>, document.getElementById('content')
);