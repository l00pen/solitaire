import styled from 'styled-components/macro';

import {
  cardMinWidth,
  cardMaxWidth
} from 'utils/styleVariables';

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

export const PileGroup = styled.div`
  display: flex;
  justify-content: space-between;
  
  & > * {
    margin: 0 0.5em 0 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export default Pile;
  // height: 5.17em;  should be a min height or someting from a "pile" 