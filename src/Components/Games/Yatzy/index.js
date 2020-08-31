import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro'

import YatzyDashboard from 'Components/YatzyDashboard';
import { Button } from 'Components/StyledComponents/Buttons';

import {
  getCurrentRoundCombination,
  getCurrentProtocol,
  getTotal,
  getIsGameFinished,
} from 'reducers/yatzy/selectors';

const DiceBoard = styled.div`
  display: flex;
`;

const Dice = styled.div`
  font-size: 5rem;
  cursor: pointer;
`;

const Wrapper = styled.div`
  flex: 2;
  margin-left: 1em;
`;

const Container = styled.div`
  font-size: 1em;
  padding: 1em;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Protocol = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
  border: 1px solid #000;
  grid-gap: 1px;
`;

const ProtocolKey = styled.div`
  border: 1px solid aliceblue;
  padding: 0.5em;
  grid-column-start: 1;
  align-self: center;
  text-transform: capitalize;
`;

const ProtocolValue = styled.div`
  padding: 0.5em;
  border: 1px solid aliceblue;
  grid-column-start: 2;
  text-align: end;
  align-self: center;
  cursor: ${props => props.isUsed ? 'auto' : 'pointer' };
  background: ${props => props.isUsed ? 'aliceblue' : props.isValid ? 'papayawhip' : 'white' };
`;

const Yatzy = ({
    total,
    dices,
    rollDices,
    availableRolls,
    toggleDice,
    combintationHelper,
    setProtocolItemSum,
    protocol,
    highScore,
    gameFinished,
  }) => {  

  const diceClickHandler = (id) => toggleDice(id);
  const onProtocolValueClick = (obj) => {
    if (obj.label !== 'bonus') {
      setProtocolItemSum(obj);
    }
  }

  return (
    <React.Fragment>
      <YatzyDashboard />
      <Container>
        <Protocol>
          { protocol.map((obj) => {
            return (
              <React.Fragment key={obj.label}>
                <ProtocolKey>{`${obj.label}: `}</ProtocolKey>
                <ProtocolValue
                  onClick={onProtocolValueClick.bind(this, obj)}
                  isUsed={obj.isUsed}
                  isValid={obj.currentSum > 0}
                  disabled={obj.label === 'bonus'}
                >
                  {obj.isUsed ? `${obj.total}` : `${obj.currentSum}`}
                </ProtocolValue>
              </React.Fragment>
            );
          })}
        </Protocol>
        <Wrapper>
          <div>
            <div>
              <Button onClick={rollDices} disabled={availableRolls === 0}>Roll Dices</Button>
              <p>Rolls left: {availableRolls}</p>
            </div>
          </div>
          <DiceBoard>
            { dices.map(({ id, value, shouldReRoll }, i) => (
              <Dice
                style={{ color: shouldReRoll ? 'black' : 'cyan'}}
                key={`dice-${id}`}
                onClick={diceClickHandler.bind(this, id)}
                dangerouslySetInnerHTML={{ __html: `&#x268${value}`}}
              />
            ))}
          </DiceBoard>
          { gameFinished &&
            <div>
              {`Game finished with a total of: ${total}`}
            </div>
          }
        </Wrapper>
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = ({ yatzyReducer: state}) => {
  return {
    ...state,
    ...state.yatzy,
    ...state.highScore,
    combintationHelper: getCurrentRoundCombination(state),
    protocol: getCurrentProtocol(state),
    total: getTotal(state),
    gameFinished: getIsGameFinished(state),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    rollDices: () => {
      dispatch({
        type: 'YATZY_ROLL_DICES'
      })
    },
    toggleDice: (id) => {
      dispatch({
        type: 'YATZY_TOGGLE_DICE',
        data: {
          id,
        }
      })
    },
    setProtocolItemSum: (protocolItem) => {
      dispatch({
        type: 'YATZY_SET_PROTOCOL_ITEM_SUM',
        data: { ...protocolItem }
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Yatzy);