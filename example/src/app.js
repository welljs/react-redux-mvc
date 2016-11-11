import React from 'react';
import ReactDOM from 'react-dom';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {combine as combineReducers, middleware as requestMiddleware} from 'easy-redux';
import {ProfileForm} from './ProfileForm';
import {ReactReduxMvc} from 'react-redux-mvc';

/*
* in place of this helper can be superagent.js for example, or other asynс function. It is used by middleware to
* support async actions functionality
* */
function promiseHelper (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 3000);
    });
}


const appStore = function () {
    return applyMiddleware(requestMiddleware(promiseHelper))(reduxCreateStore)(combineReducers({}), {});
}();

ReactDOM.render(
    <Provider store={appStore}>
        <ReactReduxMvc store={appStore}>
            <ProfileForm/>
        </ReactReduxMvc>
    </Provider>, document.getElementById('content')
);