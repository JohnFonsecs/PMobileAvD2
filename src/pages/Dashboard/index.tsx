import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage
  from "@react-native-async-storage/async-storage";

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Container } from './styles'
import { InputAmount } from '../../components/InputAmount'
import { InputDate } from '../../components/InputDate'
import { companyCreate } from '../../company/companyCreate'
import { companyGetAll } from '../../company/companyGetAll';
import { clearSpendingStorage } from '../../company/Delete';
import { formatAmount } from '../../utils/formatAmount';

const validationRules = {
  empresas: ['Microsoft', 'Google', 'Meta',],
  departs: ['RH', 'TI',],
  funcs: ['Gerente', 'Coordernador']
};

export function Dashboard() {

  const [empresa, setEmpresa] = useState('')
  const [matricula, setMatricula] = useState('')
  const [nome, setNome] = useState('')
  const [func, setFunc] = useState('')
  const [depart, setDepart] = useState('')
  const [salario, setSalario] = useState('')

  async function handleAddNewCompany() {


    if (empresa.trim() === '' || matricula.trim() === ''
      || nome.trim() === '' || func.trim() === ''
      || depart.trim().toUpperCase() === '' || salario.trim() === '') {
        return Alert.alert('Atencao', 'Todos os campos devem ser preenchidos')
    }

    if (!validationRules.funcs.includes(func)) {
      return Alert.alert('Função', 'Aceita somente as funções: Gerente e Coordernador	')}

    if (!validationRules.departs.includes(depart.toUpperCase().trim())) {
      return Alert.alert('Departamento', 'Aceita somente os departamentos: RH e TI')}
      
    if (!validationRules.empresas.includes(empresa.trim())) {
      return Alert.alert('Empresa', 'Aceita somente as empresas: Microsoft, Google e Meta')}


    const data = {
      id: String(new Date().getTime()),
      empresa,
      matricula,
      nome,
      func,
      depart: depart.toUpperCase(),
      salario: formatAmount(salario)
    }

    setEmpresa('')
    setMatricula('')
    setNome('')
    setFunc('')
    setDepart('')
    setSalario('')

    await companyCreate(data)
    const result = await companyGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='Registrar Empresa' />

      <Input
        placeholder='Empresa'
        placeholderTextColor='#363F5F'
        value={empresa}
        onChangeText={value => setEmpresa(value)}
      />

      <Input
        placeholder='Matrícula'
        placeholderTextColor='#363F5F'
        value={matricula}
        onChangeText={value => setMatricula(value)}
      />

      <Input
        placeholder='Nome'
        placeholderTextColor='#363F5F'
        value={nome}
        onChangeText={value => setNome(value)}
      />

      <Input
        placeholder='Função'
        placeholderTextColor='#363F5F'
        value={func}
        onChangeText={value => setFunc(value)}
      />


      <Input
        placeholder='Departamento'
        placeholderTextColor='#363F5F'
        value={depart}
        onChangeText={value => setDepart(value)}
      />

      <InputAmount
        placeholder='Salário'
        placeholderTextColor='#363F5F'
        value={salario}
        onChangeText={value => setSalario(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewCompany}
      />
            {/* <Button title='Limpar dados'
      onPress={clearSpendingStorage}
      /> */}


    </Container>
  )
}