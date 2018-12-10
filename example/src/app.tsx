import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ProfileForm} from './ProfileForm';
import * as MVC from '../../src';
import {UserModel} from './ProfileForm/UserModel';
import {createStore} from './utils';

if (!(window as any).__initialData) {
  (window as any).__initialData = {};
}

const appStore = createStore({data: (window as any).__initialData.store || {}});

ReactDOM.render(
  <Provider store={appStore}>
    <MVC.ReactReduxMvc store={appStore}>
      <ProfileForm user={UserModel.defaults}/>
    </MVC.ReactReduxMvc>
  </Provider>, document.getElementById('content')
);
