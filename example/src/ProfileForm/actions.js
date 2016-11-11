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