import {Model} from '../../../lib';
import {SUBMIT_ACTION_NAME} from './common';

export interface IUserModelState {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
    age: number | null;
    phone: string;
    department: string;
  },
  errorMsg: string | null;
  isSaved: boolean;
}

export class UserModel extends Model<IUserModelState> {
  public static defaults: IUserModelState = {
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

  constructor(state) {
    super(state);
  }

  public onUpdate(updates): IUserModelState {
    return this.update(updates).getState();
  }

  public onSubmitWaiting(): IUserModelState {
    return this
      .update({isSaved: false})
      .setWaiting(SUBMIT_ACTION_NAME)
      .resetFailed(SUBMIT_ACTION_NAME)
      .getState();
  }

  public onSubmitFailed(errorMsg): IUserModelState {
    return this
      .update({errorMsg})
      .setWaiting(SUBMIT_ACTION_NAME)
      .resetFailed(SUBMIT_ACTION_NAME)
      .getState();
  }

  public onSubmitComplete(updates): IUserModelState {
    return this
      .update({userData: updates, isSaved: true})
      .resetWaiting(SUBMIT_ACTION_NAME)
      .getState();
  }
}