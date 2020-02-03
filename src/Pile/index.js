import styled from 'styled-components';

import {
  cardMinHeight,
  cardMaxHeight,
  cardMinWidth,
  cardMaxWidth
} from '../styleVariables';

const Pile = styled.div`
  min-width: ${cardMinWidth}px;
  max-width: ${cardMaxWidth}px;

  min-height: ${cardMinHeight}px;
  max-height: ${cardMaxHeight}px;
  position: relative;

  flex: 1 1 auto;
`;

export const PileStack = styled(Pile)`

`;

export const PileEmpty = styled(Pile)`
  height: 5.17em; /* should be a min height or someting from a "pile" */
  border: 1px solid aliceblue;
`;


export default Pile;