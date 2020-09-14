import styled from 'styled-components/macro';

import {sectionTopDistance} from 'Components/StyledComponents/ContentSection';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({columns}) => columns}, 1fr)};
  grid-template-rows: repeat(${({rows = 2}) => rows}, 1fr)};
  grid-gap: ${({theme}) => theme.spacing.xxsmall};
  ${sectionTopDistance}
  grid-row-gap: ${({theme}) => theme.spacing.xxsmall};
`

export const GridItem = styled.div`
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`