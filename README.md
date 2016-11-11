# react-redux-mvc
Implementation of MVC pattrern based on React-Redux bunch keeping one direction data flow (flux pattern)


![alt tag](https://github.com/welljs/react-redux-mvc/blob/master/mvc-scheme.png)

index.js

```javascript
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

```


ProfileForm.js (View)
```javascript
import React, { Component, PropTypes } from 'react';
import {withController} from 'react-redux-mvc';
import ProfileController from './ProfileController';
import {STORE_KEY} from './common';

@withController(ProfileController)
export default class ProfileForm extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.controller.submit(this.props[STORE_KEY].userData);
  };
  render () {
    const {[STORE_KEY]: {userData: {firstName, lastName, age, department, phone, email}, isSaved}} = this.props;
    const isSubmitWaiting = this.controller.isSubmitWaiting();
    return (
      <div>
        {isSaved && <h1>Data saved!</h1>}
        <form onSubmit={this.onSubmit}>
          <input type="text" value={firstName} onChange={e => this.controller.updateUserData('firstName', e.target.value)} placeholder="First name"/><br/>
          <input type="text" value={lastName} onChange={e => this.controller.updateUserData('lastName', e.target.value)} placeholder="Last name"/><br/>
          <input type="text" value={age} onChange={e => this.controller.updateUserData('age', e.target.value)} placeholder="Age"/><br/>
          <input type="text" value={email} onChange={e => this.controller.updateUserData('email', e.target.value)} placeholder="Email"/><br/>
          <input type="text" value={phone} onChange={e => this.controller.updateUserData('phone', e.target.value)} placeholder="Phone"/><br/>
          <input type="text" value={department} onChange={e => this.controller.updateUserData('department', e.target.value)} placeholder="Department"/><br/>
          <input type="submit" value={isSubmitWaiting ? 'Saving...' : 'Save'} disabled={isSubmitWaiting}/>
        </form>
      </div>
    );
  }
}
```

ProfileController.js
```javascript
import {PropTypes} from 'react';
import {Controller} from 'react-redux-mvc';
import {STORE_KEY, ACTION_UPDATE_PROFILE, ASYNC_ACTION_SUBMIT_PROFILE} from './common';
import actions from './actions';
import UserModel from './UserModel';

export default class ProfileController extends Controller {
  static storeKey = STORE_KEY;
  static actions = actions;
  static propTypes = UserModel.shape;
  static connectedState = [STORE_KEY];

  constructor () {
    super(UserModel);
  }

  updateUserData = (prop, value) => {
    this.updateProp('userData', {[prop]: value});
  };

  updateProp = (prop, value) => {
    this.action(ACTION_UPDATE_PROFILE, {[prop]: value});
  };

  submit = (userData) => {
    this.action(ASYNC_ACTION_SUBMIT_PROFILE, userData);
  };

  isSubmitWaiting = () => {
    this.isWaiting(ASYNC_ACTION_SUBMIT_PROFILE)
  };
}
```

UserModel.js

```javascript
import {PropTypes} from 'react';
import {Model} from 'react-redux-mvc';
import {ASYNC_ACTION_SUBMIT_PROFILE} from './common';

const {number, string, bool} = PropTypes;

export default class UserModel extends Model {
  static shape = {
    userData: PropTypes.shape({
      firstName: string,
      lastName: string,
      age: number,
      phone: string,
      email: string.isRequired,
      department: string
    }),
    errorMsg: string,
    isSaved: bool
  };
  static defaults = {
    userData: {
      firstName: '',
      lastName: '',
      age: null,
      department: '',
      email: '',
      phone: ''
    },
    errorMsg: null,
    isSaved: false
  };
  constructor(state){
    super(state);
  }

  onUpdate (updates) {
    return this.update(updates).getState();
  }

  onSubmitWaiting () {
    return this
      .update({isSaved: false})
      .setWaiting(ASYNC_ACTION_SUBMIT_PROFILE)
      .resetFailed(ASYNC_ACTION_SUBMIT_PROFILE)
      .getState();
  }

  onSubmitFailed (errorMsg) {
    return this
        .update({errorMsg})
        .setWaiting(ASYNC_ACTION_SUBMIT_PROFILE)
        .resetFailed(ASYNC_ACTION_SUBMIT_PROFILE)
        .getState();
  }

  onSubmitComplete (updates) {
    return this
      .update({userData: updates, isSaved: true })
      .resetWaiting(ASYNC_ACTION_SUBMIT_PROFILE)
      .getState();
  }
}
```

actions.js
```javascript
import {createAction} from 'easy-redux';
import {STORE_KEY, ACTION_UPDATE_PROFILE, ASYNC_ACTION_SUBMIT_PROFILE} from './common';
import UserModel from './UserModel';

const initialState = Object.assign({}, UserModel.defaults);
export default {
  [ASYNC_ACTION_SUBMIT_PROFILE]: createAction(ASYNC_ACTION_SUBMIT_PROFILE, {
    async: true,
    storeKey: STORE_KEY,
    initialState,
    action: (userData) => ({
      promise: asyncExec => asyncExec(userData)
    }),
    handlers: {
      onWait: state => new UserModel(state).onSubmitWaiting(),
      onFail: (state, {error}) => new UserModel(state).onSubmitFailed(error),
      onSuccess: (state, {result}) => new UserModel(state).onSubmitComplete(result)
    }
  }),
  [ACTION_UPDATE_PROFILE]: createAction(ACTION_UPDATE_PROFILE, {
    storeKey: STORE_KEY,
    initialState,
    action: (updates) => ({updates}),
    handler: (state, {updates}) => new UserModel(state).onUpdate(updates)
  })
};
```

Installation
------------

`npm i react-redux-mvc -S`


Example
------

Для того, чтобы посмотреть рабочий пример, нужно собрать его командой `npm run example` из корневой директории проекта, затем открыть файл `./example/index.html` Пример работает локально, без веб-сервера


Documentation wiki
-------

[Overview](https://github.com/welljs/react-redux-mvc/wiki/Overview)

[Model](https://github.com/welljs/react-redux-mvc/wiki/Model)

[View](https://github.com/welljs/react-redux-mvc/wiki/View)

[Controller](https://github.com/welljs/react-redux-mvc/wiki/Controller)

