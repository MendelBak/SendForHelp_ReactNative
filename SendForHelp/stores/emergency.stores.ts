import {makeAutoObservable} from 'mobx';
import EmergencyLocationModel from '../models/emergencyLocation.model';
import Geolocation from 'react-native-geolocation-service';

import {configure} from 'mobx';
import {Alert} from 'react-native';
import SymptomsModel from '../models/symptoms.model';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

export default class EmergencyStore {
  private isEmergency = false;

  private location: EmergencyLocationModel = new EmergencyLocationModel();

  private firstResponder: string = '';

  private symptoms: SymptomsModel = new SymptomsModel();

  constructor() {
    makeAutoObservable(this);
  }

  declareEmergency(): void {
    this.isEmergency = true;
    this.getCurrentPosition();
  }

  cancelEmergency(): void {
    this.isEmergency = false;
    this.clearFirstResponder();
    // Probably need to save these for historica; reporting purposes. Just clear them for independent events but save overall.
    this.clearLocation();
    this.clearSymptoms();
  }

  get getEmergency(): boolean {
    return this.isEmergency;
  }

  setFirstResponder(id: string): void {
    this.firstResponder = id;
  }

  clearFirstResponder(): void {
    this.firstResponder = '';
  }

  get getFirstResponder() {
    return this.firstResponder;
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
    this.location = new EmergencyLocationModel(position);
  }

  get getLocation(): EmergencyLocationModel {
    return this.location;
  }

  clearLocation(): void {
    this.location = new EmergencyLocationModel();
  }
  //#endregion location

  //#region symptoms
  saveSymptoms(symptoms: SymptomsModel) {
    this.symptoms = new SymptomsModel(symptoms);
  }

  get getSymptoms(): SymptomsModel {
    return this.symptoms;
  }

  clearSymptoms(): void {
    this.symptoms = new SymptomsModel();
  }
  //#endregion symptoms
}
