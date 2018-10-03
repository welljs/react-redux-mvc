import * as MVC from '../../../src/';
import UserModel from './UserModel';
import {update, storeKey, submit, SUBMIT} from './actions';

export default class ProfileController<T extends UserModel> extends MVC.Controller<T> {
  public storeKey = storeKey;
  public static actions = {};
  public static connectedState = [storeKey];
  public static Model = UserModel;
  public model;

  public constructor(props, context) {
    super(UserModel, props, context);
    this.model = new MVC.Model(props[storeKey]);
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

  public isSubmitWaiting = () => this.isWaiting(SUBMIT);
  // public isSubmitWaiting = () => false;
}
