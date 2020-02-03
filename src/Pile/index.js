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
  position: relative;
  height: ${(props) => !!props.minHeight ? `${props.minHeight}px` : '100%'};

  flex: 1 1 auto;
`;

export const PileStack = styled.div`
  min-width: ${cardMinWidth}px;
  max-width: ${cardMaxWidth}px;

  height: 100%;

  flex: 1 1 auto;
`;

export const PileEmpty = styled(Pile)`
  border: 1px solid aliceblue;
  box-sizing: border-box;
`;


export default Pile;
  // height: 5.17em;  should be a min height or someting from a "pile" 