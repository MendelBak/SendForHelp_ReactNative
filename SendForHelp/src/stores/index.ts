import EmergencyStore from './emergency.store';

import { EMERGENCY_STORE, USER_STORE } from './storesKeys';
import UserStore from './user.store';

/**
 * Initiate all stores
 */
const emergencyStore = new EmergencyStore();
const userStore = new UserStore();

/**
 * Save the instance in global object
 */
const rootStores = {
  [EMERGENCY_STORE]: emergencyStore,
  [USER_STORE]: userStore,
};

// window['Stores'] = rootStores;

export default rootStores;
