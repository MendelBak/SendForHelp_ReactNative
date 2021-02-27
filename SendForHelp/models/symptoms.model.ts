import {makeAutoObservable} from 'mobx';

export default class SymptomsModel {
  bluntTrauma: boolean = false;
  choking: boolean = false;
  drowning: boolean = false;
  hemmoraging: boolean = false;
  other: boolean = false;

  constructor(symptomsModel?: SymptomsModel) {
    makeAutoObservable(this);
    if (symptomsModel) {
      this.bluntTrauma = symptomsModel.bluntTrauma;
      this.choking = symptomsModel.choking;
      this.drowning = symptomsModel.drowning;
      this.hemmoraging = symptomsModel.hemmoraging;
      this.other = symptomsModel.other;
    }
  }
}
