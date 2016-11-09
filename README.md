# react-redux-mvc
Implementation of MVC pattrern based on React-Redux bunch

**Model**
===

Структура данных модели имеет следующий формат:

``` javascript
{
	data:{}, // тут хранятся непосредственно данные
	waiting: {}, // тут хранятся ключи асинхронных действий состояния ожидания
	failed: {} // тут хранятся ключи асинхронных действий для состояния ошибок
}
```
Все данные сохраняются в поле `data`,  а `waiting` и `failed` предназначены для хранения состояний 
асинхронных действий.
Как написано выше, асинхронные действия могут быть в трех состояниях: `waiting`, `failed` и формально - `success`. При переходе в каждое из состояний нужно переключить остальные, для этого есть специальные методы. 
Пример использования асинхронных действий

```javascript

//model.js

import {Model as BasicModel} from 'react-redux-mvc';

export initialState = Object.assign({}, {
	userData: {
		name: {
			first: '',
			last: ''
		},
		age: null,
		department: '',
		email: '',
		phone: ''
	},
	errorMsg: null
});

export default class UserModel extends BasicModel {
	constructor(state){
		super(state);
	}

	onLoadWaiting () {
		return this
			.setWaiting('loadUserData')
			.resetFailed('loadUserData')
			.getState();
	}
	
	onLoadFailed (errorMsg) {
		return this
			.setWaiting('loadUserData')
			.resetFailed('loadUserData')
			.updateState({errorMsg})
			.getState();
	}
	
	onLoadComplete (result) {
		return this
			.resetWaiting('loadUserData')
			.updateState({userData: result})
			.getState();
	}
}


//actions.js
import {createAction} from 'easy-redux';
import UserModel, {initialState} from './model';

const loadUserData = createAction('loadUserData', {
	async: true,
	storeKey: 'user',
	initialState,
	action: userId => ({userId}),
	handlers: {
		onWait: state => new UserModel(state).onLoadWaiting(),
		onFail: (state, {error}) => new UserModel(state).onLoadError(error),
		onSuccess: (state, {result}) => new UserModel(state).onLoadComplete(result)
	}
}); 	
```

Детально о них будет ниже


API
---------

**getState (prop:String)**

Возвращает полное состояние модели, или только отдельное его свойство - `prop`

```javascript
const user = new UserModel(getState());
const userName = user.getState('name');
```

**update (newState:Object)** 

Заменяет текущее состояние модели новым - `newState`. 
Возвращает контекст модели `this`


**updateState(updates:Object)**

Обновляет состояний модели, путем сливания `(merge)` с объектом `updates`

```
const userData = {
	name: {
		first: 'John',
		last: 'Doe'
	},
	Age: 23,	
};

const user = new UserModel(userData);
let lastName = user.getState('name').last;
console.log(lastName); // Doe
lastName = user.updateState({name:{last: 'Brown'}}).getState('name').last;
console.log(lastName); // Brown
```

**set(prop:String || Object, value: Any)**

У этого метода две реализации:

 1. Устанавливает свойство `prop` в `value`

```javascript
	const user = new UserModel(getState());
	user.set('department', 'IT');
```

2. Устанавливает целый объект свойств

```javascript
	const user = new UserModel(getState());
	user.set({
		'email': 'john_doe@email.com',
		'phone': '+7-916-666-66-66'
		'department', 'IT',
	});
```


----------
Методы для работы с асинхронными действиями (`async actions`)

Все состояния хранятся в объекте парами. Например:
```javascript
	//ожидающие
	waiting: {
		loadData: true,
		login: false,
		update: false,		
	}
	//с ошибкой
	waiting: {
		loadData: false,
		login: false,
		update: false,		
	}	
```
Соответственно все операции осуществляются в рамках этих объектов

**setWaiting(actionName:String)**

Устанавливает состояние `actionName` как ожидающее (`true`)

**resetWaiting(actionName:String)**

Сбрасывает состояние `actionName` как ожидающее (`false`)

**setFailed(actionName:String)**

Устанавливает состояние `actionName` как с ошибкой (`true`) 

**resetFailed(actionName:String)**

Устанавливает состояние `actionName` как с ошибкой (`false`)

**isWaiting(actionName:String)**

Проверяет находится ли действие `actionName` в статусе ожидания

**isFailed(actionName:String)**

Проверяет находится ли действие `actionName` в статусе ошибки

**getWaiting()**

Возвращает весь объект с состояниями ожидания

**getFailed()**

Возвращает весь объект с состояниями ошибки
