import * as React from 'react';
import * as MVC from '../../../src';
import ProfileController from './ProfileController';
import {IUserModelState, UserModel} from './UserModel';
import {storeKey} from './actions';

interface IProfileFormProps {
  [storeKey]: IUserModelState;
}

@MVC.withController(ProfileController)
export class ProfileForm extends React.Component<IProfileFormProps> {
  public controller: ProfileController<UserModel>;

  public onSubmit = (e) => {
    e.preventDefault();
    this.controller.submit(this.props[storeKey].userData);
  }

  public render() {
    const {[storeKey]: {userData: {firstName, lastName, age, department, phone, email}, isSaved}} = this.props;
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
              <button onClick={this.controller.updateProp('isSaved', false)}>Edit</button>
            </div>
          )

        }
        {
          !isSaved &&
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={firstName}
              onChange={this.controller.updateUserData('firstName')}
              placeholder="First name"
            />
            <br/>
            <input
              type="text"
              value={lastName}
              onChange={this.controller.updateUserData('lastName')}
              placeholder="Last name"
            />
            <br/>
            <input
              type="text"
              value={age || ''}
              onChange={this.controller.updateUserData('age')}
              placeholder="Age"
            />
            <br/>
            <input
              type="text"
              value={email}
              onChange={this.controller.updateUserData('email')}
              placeholder="Email"
            />
            <br/>
            <input
              type="text"
              value={phone}
              onChange={this.controller.updateUserData('phone')}
              placeholder="Phone"
            />
            <br/>
            <input
              type="text"
              value={department}
              onChange={this.controller.updateUserData('department')}
              placeholder="Department"
            />
            <br/>
            <input type="submit" value={isSubmitWaiting ? 'Saving...' : 'Save'} disabled={isSubmitWaiting}/>
          </form>
        }
      </div>
    );
  }
}
