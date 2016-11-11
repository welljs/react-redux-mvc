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

    isSubmitWaiting = () => this.isWaiting(ASYNC_ACTION_SUBMIT_PROFILE);
}