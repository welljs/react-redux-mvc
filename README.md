# react-redux-mvc
Implementation of MVC pattrern based on React-Redux bunch keeping one direction data flow (flux pattern)


![alt tag](https://github.com/welljs/react-redux-mvc/blob/master/mvc-scheme.png)


Exapmle:

```javascript 
import React, {Component, PropTypes} from 'react';
import {withController} from 'react-redux-mvc';
import LoginFormController from './controller';
import {userShape} from './model';

@withController(LoginFormController)
export default class ProfileForm extends Component {
	render () {
		const {name: {first, last}, department, email, phone} = this.props;
		<form onSubmit={this.controller.submit}>\
			<input type="text" value={first} onChange={e => this.controller.onInputChange(e, 'name.first')}>
			<input type="text" value={phone} onChange={e => this.controller.onInputChange(e, 'phone')}>
			<input type="text" value={department} onChange={e => this.controller.onInputChange(e, 'department')}>
		</form>
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
