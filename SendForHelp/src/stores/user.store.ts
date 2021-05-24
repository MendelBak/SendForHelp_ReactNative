// External
import { makeAutoObservable } from 'mobx';

// Internal
import UserModel from '../models/user.model';

export default class UserStore {
  user: UserModel = new UserModel();

  constructor() {
    makeAutoObservable(this);
  }
}
