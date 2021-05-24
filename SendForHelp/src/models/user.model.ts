import { makeAutoObservable } from 'mobx';
import EmergencyLocationModel from './emergencyLocation.model';
import SymptomModel from './symptom.model';

export default class UserModel {
  _id?: string;
  firstName!: string;
  middleName?: string;
  lastName!: string;
  preferredName?: string;
  age!: number;
  email!: string;
  googleId!: string;
  isHero: boolean = true;

  constructor(userModel?: UserModel) {
    makeAutoObservable(this);
    if (userModel) {
      this._id = userModel?._id;
      this.firstName = userModel.firstName;
      this.middleName = userModel.middleName;
      this.lastName = userModel.lastName;
      this.preferredName = userModel.preferredName;
      this.age = userModel.age;
      this.email = userModel.email;
      this.googleId = userModel.googleId;
      this.isHero = userModel.isHero;
    }
  }
}
