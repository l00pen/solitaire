import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro'

import {
  getCurrentRoundCombination
} from 'reducers/yatzy/selectors';

const ProtocolKey = styled.div`
  padding: ${({ theme }) => theme.spacing.xxsmall};
  grid-column-start: 1;
  align-self: center;
  text-transform: capitalize;
`;

const ProtocolValue = styled.div`
  padding: ${({ theme }) => theme.spacing.xxsmall};
  grid-column-start: 2;
  align-self: center;
  text-align: center;
`

const ProtocolKeySelectable = styled(ProtocolKey)`
  background: ${props => props.hasBeenSelected ? 'aliceblue' : props.isChoosable ? props.theme.palette.common.pink : 'inherit' };
`;

const ProtocolValueSelectable = styled(ProtocolValue)`
  cursor: ${props => props.hasBeenSelected ? 'auto' : 'pointer' };
  background: ${props => props.hasBeenSelected ? 'aliceblue' : props.isChoosable ? props.theme.palette.common.pink : 'inherit' };
`;

const ProtocolItem = ({
    id,
    label,
    isUsed: hasBeenSelected,
    selectable,
    currentSum,
    total: score,
    setProtocolItemSum,
    sum,
    dices,
  }) => {  

  const onProtocolValueClick = () => {
    if (!hasBeenSelected && selectable) {
      setProtocolItemSum({ id, newScore: currentSum });
    }
  }

  if (!selectable) {
    return (
      <React.Fragment>
        <ProtocolKey>{label}</ProtocolKey>
        <ProtocolValue>
          {score}
        </ProtocolValue>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ProtocolKeySelectable hasBeenSelected={hasBeenSelected}>{label}</ProtocolKeySelectable>
      <ProtocolValueSelectable
        onClick={onProtocolValueClick}
        hasBeenSelected={hasBeenSelected}
        isChoosable={currentSum > 0}
      >
        {hasBeenSelected ? `${score}` : `${currentSum}`}
      </ProtocolValueSelectable>
    </React.Fragment>
  );
}

const mapStateToProps = ({ yatzyReducer: state}, item) => {
  const dices = getCurrentRoundCombination(state);
  return {
    ...item,
    currentSum: item.selectable ? item.sum(dices) : 0,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setProtocolItemSum: (protocolItem) => dispatch({ type: 'YATZY_SET_PROTOCOL_ITEM_SUM', data: { ...protocolItem }}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtocolItem);