// hooks


import { Header } from '../../components/Header'
import {Container, Transactions} from './styles'
import { TransactionCard } from '../../components/TransactionCard'
import { companyGetAll } from '../../company/companyGetAll'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { CompanyStorageDTO } from '../../company/companyStorageDTO'
import { FlatList } from 'react-native'


export function ListData() {
  const [dataCompanys, setDataCompanys] = useState<CompanyStorageDTO[]>([])

  async function loadDataCompany() {
    try { const data = await companyGetAll()
    setDataCompanys(data)
  } catch(error) {
    console.error('Erro','Não foi possível ler os dados gravados!');
  }
  }

  useFocusEffect(useCallback(() => {
    loadDataCompany()
  },[]))

  return (
    <Container>
      <Header title='Listagem de Cadastros' />

      {/* <Transactions> */}
      <FlatList data={dataCompanys} keyExtractor={item => item.id} 
      renderItem={({ item }) => <TransactionCard data={item}/>}
      showsVerticalScrollIndicator={false}/>
      {/* </Transactions> */}

    </Container>
  )
}
