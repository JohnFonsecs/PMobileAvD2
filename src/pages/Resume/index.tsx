import { useCallback, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Content,
  Header,
  Title
} from "./style";
import { companyGetAll } from "../../company/companyGetAll";
import { useFocusEffect } from "@react-navigation/native";

type EmpresaData = {
  func: string
  salario: number
}

export function Resume() {
  const [totalByCompanys, SetTotalByCompanys] = useState<EmpresaData[]>([])

  async function loadData() {
    const data = await companyGetAll()
    const empresas = ['Microsoft' , 'Google' , 'Meta']

    const TotalByCompany : EmpresaData[] = []

    empresas.forEach(empresa => {
      let totalSalario = 0

      data.forEach(dat => {
        if (dat.empresa === empresa) {
          totalSalario += dat.salario
        }
      })

      TotalByCompany.push({
        func: empresa,
        salario: parseFloat(totalSalario.toFixed(2)), 
      })
    })

    SetTotalByCompanys(TotalByCompany)
  }
  useFocusEffect(useCallback(() => {
      loadData()
    }, []))
  return (
    <Container>
      <Header>
        <Title>Resumo por Funcionario</Title>
      </Header>

      <Content contentContainerStyle={{ padding: 24 }}>
        {
          totalByCompanys.map(item => {
            return (
              <HistoryCard
                key={item.func}
                func={item.func}
                salario={`R$ ${item.salario}`}
              />
            )
          })
        }
      </Content>

    </Container>
  )
}