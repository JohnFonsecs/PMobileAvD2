import {
  Container,
  Title,
  Amount
} from './styles'

interface Props {
  func: string;
  salario: string;
}

export function HistoryCard({
  func,
  salario,
}: Props) {
  return (
    <Container>
      <Title>{func}</Title>
      <Amount>{salario}</Amount>
    </Container>
  )
}