import { useState } from 'react'
import { Header } from '../../components/Header'
import { Container, Transactions } from './styles'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Alert } from 'react-native'
import { companyGetAll } from '../../company/companyGetAll'
import { CompanyStorageDTO } from '../../company/companyStorageDTO'
import { FlatList } from 'react-native'
import { TransactionCard } from '../../components/TransactionCard'

export function SearchExpenses() {
  const [matricula, setMatricula] = useState('')
  const [dataExpenses, setDataExpenses] = useState <CompanyStorageDTO[]>([])

  async function handleSearchCompany() {
    if (matricula.trim() === '') {
      return Alert.alert('Atenção','Favor digite a matricula.')
    }
    const data = await companyGetAll()
    const newData = data.filter(dat => dat.matricula.toLowerCase().includes(matricula.toLowerCase()))
    if (newData.length === 0) {
      Alert.alert ('Atenção','Matricula inexistente!')
      setMatricula('')
      setDataExpenses([])
      return
    }
    setDataExpenses(newData)
  }

  return (
    <Container>
      <Header title='Pesquisa Funcionários' />

      <Input
        placeholder='Matricula'
        placeholderTextColor='#363F5F'
        value={matricula}
        onChangeText={value => setMatricula(value)}
      />

      <Button
        title='Pesquisa'
        onPress={handleSearchCompany}
      />

      <Transactions>
      <FlatList data={dataExpenses} keyExtractor={item => item.id} 
      renderItem={({ item }) => <TransactionCard data={item}/>}
      showsVerticalScrollIndicator={false}/>

      </Transactions>

    </Container>
  )
}

