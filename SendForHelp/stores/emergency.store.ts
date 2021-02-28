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
import {SYMPTOMS} from '../common/enums';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  // reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

const URI = 'http://d28c8a18b568.ngrok.io';

export default class EmergencyStore {
  emergency: EmergencyModel = new EmergencyModel();
  // private location: EmergencyLocationModel = new EmergencyLocationModel();
  // private symptoms: SymptomsModel = new SymptomsModel();

  constructor() {
    makeAutoObservable(this);
  }

  // HACK: This is kinda weird. GetCurrentPosition is not returning asyncronously and this is a hack. So I need to start to declare the emergency with the location request, and then initiate creation of an emergency.
  async initializeEmergency(): Promise<void> {
    await this.getCurrentPositionAndStartEmergency();
  }

  declareEmergency(position: GeolocationPosition): void {
    this.emergency = new EmergencyModel({
      active: true,
      responderOnScene: false,
      firstResponders: [],
      emergencyLocation: new EmergencyLocationModel(position),
      symptoms: new SymptomsModel(),
      userId: '123',
    });

    axios
      .post(`${URI}/emergency/createEmergency`, this.emergency)
      .then((response) => this.setEmergency(response.data))
      .catch((error) => {
        console.error('There was an error creating an emergency event!', error);
      });
  }

  endEmergency(): void {
    if (!this.emergency.active) {
      return;
    }

    this.emergency.active = false;

    axios
      .put(`${URI}/emergency/endEmergency`, {id: this.emergency._id})
      .catch((error) => {
        console.error('Error while ending an emergency event.', error);
      });
  }

  get getIsEmergency(): boolean {
    return this.emergency.active;
  }

  async getEmergencies(): Promise<[EmergencyModel]> {
    const emergencies = axios
      .get(`${URI}/emergency`)
      .then(async (response) => {
        return await response.data;
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
    // TODO: This works (I think). Commented out for ease of testing.
    // this.emergency.firstResponders.splice(
    //   this.emergency.firstResponders.findIndex(
    //     (responderId) => responderId === id,
    //   ),
    //   1,
    // );
  }

  get getFirstResponders(): string[] {
    return this.emergency.firstResponders;
  }

  //#region location
  // This function does two things because the Geolocation.getCurrentPosition function is not returning its values asyncronously, so this is the best way I found to pass the data along, without having a race condition.
  async getCurrentPositionAndStartEmergency(): Promise<void> {
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

  setEmergency(emergency: EmergencyModel): void {
    this.emergency._id = emergency._id;
  }

  setEmergencyLocation(position: GeolocationPosition): void {
    this.emergency.emergencyLocation = new EmergencyLocationModel(position);
  }

  get getEmergencyLocation(): EmergencyLocationModel {
    return this.emergency.emergencyLocation;
  }
  //#endregion location

  //#region symptoms
  updateSymptom(symptom: SYMPTOMS): void {
    this.emergency.symptoms[symptom] = !this.emergency.symptoms[symptom];
  }

  updateSymptoms(): void {
    console.log('before updating emergency with new symptoms', this.emergency);

    axios
      .put(`${URI}/emergency/updateSymptoms`, this.emergency)
      .catch((error) => {
        console.error('Error while updating emergency symptoms.', error);
      });
  }

  get getSymptoms(): SymptomsModel {
    return this.emergency.symptoms;
  }
  //#endregion symptoms
}
