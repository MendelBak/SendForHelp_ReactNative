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

  async declareEmergency() {
    // HACK: This is kinda weird. GetCurrentPosition is not returning asyncronously and this is a hack.
    // Hack is setting it later, instead of setting it during emergency creation. This causes two backend calls instead of one.
    // This also messes with how to inform firstResponders of an emergency event (best to do during creation, not update).
    this.getCurrentPosition();
    const emergencyLocation = new EmergencyLocationModel();

    const symptoms = new SymptomsModel();

    this.emergency = new EmergencyModel({
      active: true,
      responderOnScene: false,
      firstResponders: [],
      location: emergencyLocation,
      symptoms: symptoms,
      userId: '123',
    });

    console.log('this.emergency object', this.emergency);

    // await axios({
    //   method: 'post',
    //   url: '/emergency/createEmergency',
    //   data: this.emergency,
    // });

    // await fetch('http://10.0.0.2:8000/emergency/')
    //   .then((response) => console.log('asdlkjfahsdlkjfhasdl'))
    //   .then((data) => {
    //     console.log('data' + JSON.stringify(data));
    //   })
    //   .catch(() => {
    //     console.log('asdlfkahsdlfkjashdlkfj');
    //   });

    // TODO: Uncomment when using react device. This network is only for emulator.
    // axios.get('https://10.0.2.2:8000/emergency').then((response) => {

    fetch('http://b13fbd188cf7.ngrok.io/emergency')
      .then(async (res) => console.log(await res.json()))
      .catch((error) => console.log(error));
      
    // const data = await test.json();
    // console.log('🚀 ~ //axios.get ~ test', data);

    // axios
    //   .get('http://127.0.0.1:4040/emergency')
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch(() => {
    //     console.log('error');
    //   });

    // axios
    //   .post('localhost:8000/emergency/createEmergency', this.emergency), "Content-Type": "application/x-www-form-urlencoded",
    // Accept: 'application/json';
    //   .then((response) => console.log('response', response))
    //   .catch((error) => {
    //     console.error('There was an error!', error);
    //   });
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
        this.setEmergencyLocation(position);
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
