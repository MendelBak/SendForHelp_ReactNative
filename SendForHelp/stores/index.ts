import EmergencyStore from './emergency.stores';

import {
	EMERGENCY_STORE,
} from './storesKeys';

/**
 * Initiate all stores
 */
const emergencyStore = new EmergencyStore();

/**
 * Save the instance in global object
 */
const rootStores = {
	[EMERGENCY_STORE]: emergencyStore,
};

// window['Stores'] = rootStores;

export default rootStores;
