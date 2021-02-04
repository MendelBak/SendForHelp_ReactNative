import EmergencyLocationModel from './emergencyLocation.model';
import SymptomsModel from './symptoms.model';

export default class EmergencyModel {
  active: boolean = false;
  responderOnScene: boolean = false;
  // User who initated the emergency
  userId: string = '';
  symptoms: SymptomsModel = new SymptomsModel();
  location: EmergencyLocationModel = new EmergencyLocationModel();
  // Should contain userId of first responders.
  firstResponders: string[] = [];

  constructor(emergencyModel?: EmergencyModel) {
    if (emergencyModel) {
      this.active = emergencyModel.active;
      this.responderOnScene = emergencyModel.responderOnScene;
      this.userId = emergencyModel.userId;
      this.symptoms = emergencyModel.symptoms;
      this.location = emergencyModel.location;
      this.firstResponders = emergencyModel.firstResponders;
    }
  }
}
