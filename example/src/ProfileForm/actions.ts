import {createActions} from 'easy-redux';
import {UserModel} from './UserModel';
import {SUBMIT_ACTION_NAME, UPDATE_ACTION_NAME} from './common';

export const storeKey = 'user';
export const SUBMIT_ACTION = SUBMIT_ACTION_NAME;
const UPDATE_ACTION = UPDATE_ACTION_NAME;

const initialState = Object.assign({}, UserModel.defaults);

const actions = createActions({
  storeKey,
  initialState,
  actions: {
    [SUBMIT_ACTION]: {
      action: (userData) => ({
        promise: asyncExec => asyncExec(userData)
      }),
      handlers: {
        onWait: state => new UserModel(state).onSubmitWaiting(),
        onFail: (state, {error}) => new UserModel(state).onSubmitFailed(error),
        onSuccess: (state, {result}) => new UserModel(state).onSubmitComplete(result)
      }
    },
    [UPDATE_ACTION]: {
      action: (updates) => ({updates}),
      handler: (state, {updates}) => new UserModel(state).onUpdate(updates)
    }
  }
});

export const submit = actions[SUBMIT_ACTION];
export const update = actions[UPDATE_ACTION];
