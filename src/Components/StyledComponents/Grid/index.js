import styled from 'styled-components/macro';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr)};
  grid-gap: 1vw;
  margin: 2vh 0;
  grid-template-rows: 2;
`

export const GridItem = styled.div`
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`