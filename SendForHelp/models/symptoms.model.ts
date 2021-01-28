export default class SymptomsModel {
    choking: boolean = false;
    drowning: boolean = false;
    hemmoraging: boolean = false;
    bluntTrauma: boolean = false;
    other: boolean = false;
  
    constructor(symptomsModel?: SymptomsModel) {
      if (symptomsModel) {
        this.choking = symptomsModel.choking;
        this.drowning = symptomsModel.drowning;
        this.hemmoraging = symptomsModel.hemmoraging;
        this.bluntTrauma = symptomsModel.bluntTrauma;
        this.other = symptomsModel.other;
      }
    }
  }
  