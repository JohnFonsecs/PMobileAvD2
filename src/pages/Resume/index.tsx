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

    let totalSalarioGoogleGerenteCoordenador = 0;
    data.forEach(dat => {
      if (dat.empresa === 'Google' && (dat.func === 'Gerente' || dat.func === 'Coordenador')) {
        totalSalarioGoogleGerenteCoordenador += dat.salario;
      }
    });

    TotalByCompany.push({
      func: 'Google - Gerente e Coordenador',
      salario: parseFloat(totalSalarioGoogleGerenteCoordenador.toFixed(2)),
    });

    let totalSalarioMicrosoftRH = 0;
    let totalSalarioMicrosoftTI = 0;
    data.forEach(dat => {
      if (dat.empresa === 'Microsoft' && dat.depart === 'RH') {
        totalSalarioMicrosoftRH += dat.salario;
      }
      if (dat.empresa === 'Microsoft' && dat.depart === 'TI') {
        totalSalarioMicrosoftTI += dat.salario;
      }
    });

    TotalByCompany.push({
      func: 'Microsoft - RH',
      salario: parseFloat(totalSalarioMicrosoftRH.toFixed(2)),
    });

    TotalByCompany.push({
      func: 'Microsoft - TI',
      salario: parseFloat(totalSalarioMicrosoftTI.toFixed(2)),
    });

    let totalSalarioMetaTI = 0;
    data.forEach(dat => {
      if (dat.empresa === 'Meta' && dat.depart === 'TI' && (dat.func === 'Gerente' || dat.func === 'Coordenador')) {
        totalSalarioMetaTI += dat.salario;
      }
    });

    TotalByCompany.push({
      func: 'Meta - TI - Gerente e Coordenador',
      salario: parseFloat(totalSalarioMetaTI.toFixed(2)),
    });

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
