import styled from 'styled-components/macro';

import {sectionTopDistance} from 'Components/StyledComponents/ContentSection';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr)};
  grid-gap: 1vw;
  ${sectionTopDistance}
  grid-row-gap: ${({theme}) => theme.spacing.xxsmall};
  grid-rows: 2;
`

export const GridItem = styled.div`
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`