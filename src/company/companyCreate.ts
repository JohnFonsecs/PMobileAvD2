import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { CompanyStorageDTO }
  from "./companyStorageDTO";

import {COMPANY_COLLECTION }
  from "../storage/storageConfig";
import { Alert } from "react-native";
import { companyGetAll } from "./companyGetAll";

export async function companyCreate(
  newCompany: CompanyStorageDTO) {

  try {
    const storageCompany = await companyGetAll()

    // ... spread operator / cópia
    const storage = [...storageCompany, newCompany]

    await AsyncStorage.setItem(COMPANY_COLLECTION,
      JSON.stringify(storage))
  } catch (error) {
    Alert.alert('Atencao', 'Não foi possível fazer a gravação')
    console.log('Não foi possível fazer a gravação')
    throw error;
  }
}