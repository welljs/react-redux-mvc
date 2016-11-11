# react-redux-mvc
Implementation of MVC pattrern based on React-Redux bunch keeping one direction data flow (flux pattern)


![alt tag](https://github.com/welljs/react-redux-mvc/blob/master/mvc-scheme.png)


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
                    {
	                    isSaved &&
	                    <h1>Data saved!</h1>
                    }
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

