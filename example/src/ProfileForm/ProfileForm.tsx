import React, {Component} from 'react';
import {withController} from '../../../src';
import ProfileController from './ProfileController';
import {STORE_KEY} from './common';
import {IUserModelState, default as UserModel} from './UserModel';

interface IProfileFormProps {
  [STORE_KEY]: IUserModelState;
}

@withController(ProfileController)
export class ProfileForm extends Component<IProfileFormProps> {
  public controller: ProfileController<UserModel>;

  public componentWillReceiveProps() {
  };

  public onSubmit = (e) => {
    e.preventDefault();
    this.controller.submit(this.props[STORE_KEY].userData);
  };

  render() {
    const {[STORE_KEY]: {userData: {firstName, lastName, age, department, phone, email}, isSaved}} = this.props;
    const isSubmitWaiting = this.controller.isSubmitWaiting();
    return (
      <div>
        {
          isSaved &&
          (<div>
              <h1>Data saved</h1>
              <ul>
                <li>{firstName}</li>
                <li>{lastName}</li>
                <li>{age}</li>
                <li>{phone}</li>
                <li>{email}</li>
                <li>{department}</li>
              </ul>
              <button onClick={e => this.controller.updateProp('isSaved', false)}>Edit</button>
            </div>
          )

        }
        {
          !isSaved &&
          <form onSubmit={this.onSubmit}>
            <input type="text" value={firstName}
                   onChange={e => this.controller.updateUserData('firstName', e.target.value)}
                   placeholder="First name"/><br/>
            <input type="text" value={lastName}
                   onChange={e => this.controller.updateUserData('lastName', e.target.value)}
                   placeholder="Last name"/><br/>
            <input type="text" value={age || 0} onChange={e => this.controller.updateUserData('age', e.target.value)}
                   placeholder="Age"/><br/>
            <input type="text" value={email} onChange={e => this.controller.updateUserData('email', e.target.value)}
                   placeholder="Email"/><br/>
            <input type="text" value={phone} onChange={e => this.controller.updateUserData('phone', e.target.value)}
                   placeholder="Phone"/><br/>
            <input type="text" value={department}
                   onChange={e => this.controller.updateUserData('department', e.target.value)}
                   placeholder="Department"/><br/>
            <input type="submit" value={isSubmitWaiting ? 'Saving...' : 'Save'} disabled={isSubmitWaiting}/>
          </form>
        }
      </div>
    );
  }
}


