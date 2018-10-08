import * as MVC from '../../../src/';
import {UserModel} from './UserModel';
import {update, storeKey, submit} from './actions';
import {SUBMIT_ACTION_NAME} from './common';

export default class ProfileController<T extends UserModel> extends MVC.Controller<T> {
  public static storeKey = storeKey;
  public static actions = {};
  public static connectedState = [storeKey];
  public static Model = UserModel;

  public constructor(props, context) {
    super(UserModel, props, context);
  }

  public componentWillReceiveProps(currentProps, nextProps) {
  }

  public updateUserData = (prop, value): void => {
    this.updateProp('userData', {[prop]: value});
  };

  public updateProp = (prop, value): void => {
    this.action(update, {[prop]: value});
  };

  public submit = (userData) => {
    this.action(submit, userData);
  };

  public isSubmitWaiting = () => this.isWaiting(SUBMIT_ACTION_NAME);
}
