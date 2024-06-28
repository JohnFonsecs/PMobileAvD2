import AsyncStorage
  from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

import { COMPANY_COLLECTION } from "../storage/storageConfig";

import { CompanyStorageDTO }
  from "./companyStorageDTO";

export async function companyGetAll() {
  try {
    const storage = await AsyncStorage.getItem(COMPANY_COLLECTION)

    const company: CompanyStorageDTO[] = storage
      ? JSON.parse(storage)
      : []

    return company
  } catch (error) {
    Alert.alert('Atencao',
      'Não foi possível fazer a leitura dos dados !!')
    throw error;
  }
}