import {makeAutoObservable} from 'mobx';
import EmergencyLocationModel from './emergencyLocation.model';
import SymptomsModel from './symptoms.model';

export default class EmergencyModel {
  _id?: string;
  active: boolean = false;
  responderOnScene: boolean = false;
  // User who initated the emergency
  userId: string = '';
  symptoms: SymptomsModel = new SymptomsModel();
  emergencyLocation: EmergencyLocationModel = new EmergencyLocationModel();
  // Should contain userId of first responders.
  firstResponders: string[] = [];

  constructor(emergencyModel?: EmergencyModel) {
    makeAutoObservable(this);
    if (emergencyModel) {
      this._id = emergencyModel?._id;
      this.active = emergencyModel.active;
      this.responderOnScene = emergencyModel.responderOnScene;
      this.userId = emergencyModel.userId;
      this.symptoms = emergencyModel.symptoms;
      this.emergencyLocation = emergencyModel.emergencyLocation;
      this.firstResponders = emergencyModel.firstResponders;
    }
  }
}
