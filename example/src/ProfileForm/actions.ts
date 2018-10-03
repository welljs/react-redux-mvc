import {createActions} from 'easy-redux';
import UserModel from './UserModel';

export const storeKey = 'user';
export const SUBMIT = `${storeKey}@@SUBMIT`;
const UPDATE = `${storeKey}@@UPDATE`;

const initialState = Object.assign({}, UserModel.defaults);

const actions = createActions({
  storeKey,
  initialState,
  actions: {
    [SUBMIT]: {
      action: (userData) => ({
        promise: asyncExec => asyncExec(userData)
      }),
      handlers: {
        onWait: state => new UserModel(state).onSubmitWaiting(),
        onFail: (state, {error}) => new UserModel(state).onSubmitFailed(error),
        onSuccess: (state, {result}) => new UserModel(state).onSubmitComplete(result)
      }
    },
    [UPDATE]: {
      action: (updates) => ({updates}),
      handler: (state, {updates}) => new UserModel(state).onUpdate(updates)
    }
  }
});

export const submit = actions[SUBMIT];
export const update = actions[UPDATE];
