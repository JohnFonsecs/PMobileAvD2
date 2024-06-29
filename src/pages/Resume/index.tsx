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
  const [totalSalario, setTotalSalario] = useState(0);
  async function loadData() {
    const data = await companyGetAll()
    const empresas = ['Microsoft' , 'Google' , 'Meta']

    const TotalByCompany : EmpresaData[] = []
    let totalSalarioGeral = 0; 

    empresas.forEach(empresa => {
      let totalSalario = 0

      data.forEach(dat => {
        if (dat.empresa === empresa) {
          totalSalario += dat.salario
          totalSalarioGeral += dat.salario;
        }
      })

      TotalByCompany.push({
        func: empresa,
        salario: parseFloat(totalSalario.toFixed(2)), 
      })
    })

    SetTotalByCompanys(TotalByCompany)
    setTotalSalario(totalSalarioGeral); 
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
                salario={`R$ ${item.salario.toFixed(2)}`}
              />
            )
          })
        }
        
        <HistoryCard
          func="Total Geral"
          salario={`R$ ${totalSalario.toFixed(2)}`}
        />
      </Content>

    </Container>
  )
}
