// External
import {makeAutoObservable} from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
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
  private emergency: EmergencyModel = new EmergencyModel();
  // private location: EmergencyLocationModel = new EmergencyLocationModel();
  // private symptoms: SymptomsModel = new SymptomsModel();

  constructor() {
    makeAutoObservable(this);
  }

  // HACK: This is kinda weird. GetCurrentPosition is not returning asyncronously and this is a hack. So I need to start to declare the emergency with the location request, and then initiate creation of an emergency.
  initializeEmergency(): void {
    this.getCurrentPosition();
  }

  async declareEmergency(position: GeolocationPosition) {
    console.log('🚀 ~ declareEmergency ~ position', position);
    // console.log('🚀 ~ declareEmergency ~ testLocation ', testLocation);
    const emergencyLocation = new EmergencyLocationModel(position);

    const symptoms = new SymptomsModel();

    this.emergency = new EmergencyModel({
      active: true,
      responderOnScene: false,
      firstResponders: [],
      location: emergencyLocation,
      symptoms: symptoms,
      userId: '123',
    });

    axios
      .post(
        'http://6c57477693dc.ngrok.io/emergency/createEmergency',
        this.emergency,
      )
      .then(async (response) => console.log('response', response.data))
      .catch((error) => {
        console.error('There was an error creating an emergency event!', error);
      });
  }

  cancelEmergency(): void {
    this.emergency.active = false;
    // TODO: need to add real ID when I create users.
    this.removeFirstResponder('123');
    // TODO: Probably need to save these for historica; reporting purposes. Just clear them for independent events but save overall.
    this.clearLocation();
    this.clearSymptoms();
  }

  get getIsEmergency(): boolean {
    return this.emergency.active;
  }

  async getEmergencies() {
    const emergencies = axios
      .get('http://f3d7d62039d7.ngrok.io/emergency')
      .then(async (response) => {
        const res = await response.data;
        return res;
      })
      .catch(() => {
        console.log('error');
      });
    return emergencies;
  }

  addFirstResponder(id: string): void {
    this.emergency.firstResponders.push(id);
  }

  removeFirstResponder(id: string): void {
    this.emergency.firstResponders.splice(
      this.emergency.firstResponders.findIndex(
        (responderId) => responderId === id,
      ),
      1,
    );
  }

  get getFirstResponders() {
    return this.emergency.firstResponders;
  }

  //#region location
  async getCurrentPosition() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }

    Geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.declareEmergency(position);
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

  get getEmergencyLocation(): EmergencyLocationModel {
    return this.emergency.location;
  }

  clearLocation(): void {
    this.emergency.location = new EmergencyLocationModel();
  }
  //#endregion location

  //#region symptoms
  updateSymptoms(symptoms: SymptomsModel) {
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
