import AsyncStorage from "@react-native-async-storage/async-storage";

import { COMPANY_COLLECTION } from "../storage/storageConfig";

export async function clearSpendingStorage() {
  try {
    await AsyncStorage.removeItem(COMPANY_COLLECTION);
  } catch (error) {
    throw error;
  }
}
