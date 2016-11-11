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