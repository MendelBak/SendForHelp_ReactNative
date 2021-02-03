// External
import {makeAutoObservable} from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import {Alert} from 'react-native';
import {configure} from 'mobx';
import axios from 'axios';

// Internal
import EmergencyLocationModel from '../models/emergencyLocation.model';
import SymptomsModel from '../models/symptoms.model';
import EmergencyModel from '../models/emergency.model';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

export default class EmergencyStore {
  // private isEmergency = false;

  private emergency: EmergencyModel = new EmergencyModel();

  // private firstResponder: string = '';

  // private location: EmergencyLocationModel = new EmergencyLocationModel();
  // private symptoms: SymptomsModel = new SymptomsModel();

  constructor() {
    makeAutoObservable(this);
  }

  declareEmergency(): void {
    const newEmergency = new EmergencyModel();

    // this.emergency.active = true;
    this.getCurrentPosition();
    axios({
      method: 'post',
      url: '/emergency/createEmergency',
      data: this.getIsEmergency,
    });
  }

  cancelEmergency(): void {
    this.emergency.active = false;
    this.clearFirstResponder();
    // TODO: Probably need to save these for historica; reporting purposes. Just clear them for independent events but save overall.
    this.clearLocation();
    this.clearSymptoms();
  }

  get getIsEmergency(): boolean {
    return this.emergency.active;
  }

  setFirstResponder(id: string): void {
    this.emergency.firstResponders.push(id);
  }

  clearFirstResponder(id: string): void {
    this.emergency.firstResponders.splice(
      this.emergency.firstResponders.findIndex(
        (responderId) => responderId === id,
      ),
      1,
    );
  }

  get getFirstResponder() {
    return this.emergency.firstResponder;
  }
  //#region location
  async getCurrentPosition() {
    Geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.setEmergencyLocation(position);
        console.log(position);
      },
      (error: any) => {
        Alert.alert(
          `Code ${error.code}`,
          `You must allow GPS tracking: ${error.message}`,
        );
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  }

  setEmergencyLocation(position: GeolocationPosition): void {
    this.emergency.location = new EmergencyLocationModel(position);
  }

  get getLocation(): EmergencyLocationModel {
    return this.emergency.location;
  }

  clearLocation(): void {
    this.emergency.location = new EmergencyLocationModel();
  }
  //#endregion location

  //#region symptoms
  saveSymptoms(symptoms: SymptomsModel) {
    this.emergency.symptoms = new SymptomsModel(symptoms);
  }

  get getSymptoms(): SymptomsModel {
    return this.emergency.symptoms;
  }

  clearSymptoms(): void {
    this.emergency.symptoms = new SymptomsModel();
  }
  //#endregion symptoms
}
