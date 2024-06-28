import { CompanyStorageDTO } from "../../company/companyStorageDTO";
import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

type Props = {
  data: CompanyStorageDTO
}

export function TransactionCard({data}: Props) {
  return (
    <Container>
      <Description>Empresa: {data.empresa}</Description>
      <Description>Funcionário: {data.nome}</Description>
      <Local>Função: {data.func}</Local>
      <Amount>Salário: {data.salario}</Amount>


      <Footer>
        <Category>Matrícula: {data.matricula}</Category>
        <Date>Departamento: {data.depart}</Date>
      </Footer>

    </Container>
  )
}