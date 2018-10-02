import * as MVC from '../../../src/';
import {STORE_KEY, ACTION_UPDATE_PROFILE, ASYNC_ACTION_SUBMIT_PROFILE} from './common';
import UserModel from './UserModel';
import {submit, update} from './actions';

export default class ProfileController<T extends UserModel> extends MVC.Controller<T> {
  public static storeKey = STORE_KEY;
  public static actions = {};
  public static connectedState = [STORE_KEY];
  public static Model = UserModel;
  public model: T;

  public constructor(props, context) {
    super(UserModel, props, context);
  }

  public componentWillReceiveProps() {
  }

  public updateUserData = (prop, value) => {
    this.updateProp('userData', {[prop]: value});
  };

  public updateProp = (prop, value) => {
    this.action(update, {[prop]: value});
  };

  public submit = (userData) => {
    this.action(submit, userData);
  };

  public isSubmitWaiting = () => false;
}
// this.isWaiting(ASYNC_ACTION_SUBMIT_PROFILE)