import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro'

import Dashboard from 'Components/Dashboard';
import ContentSection from 'Components/StyledComponents/ContentSection';
import { Button, ButtonSecondaryAction } from 'Components/StyledComponents/Buttons';

import {
  getCurrentRoundCombination,
  getCurrentProtocol,
  getTotal,
  getIsGameFinished,
} from 'reducers/yatzy/selectors';

const DiceBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Dice = styled.div`
  font-size: 5rem;
  cursor: pointer;
  color: ${({ theme, selected }) => selected ? theme.palette.common.pink : 'inherit'};
  flex: 1 1 0;
`;

const Wrapper = styled.div`
  flex: 2;
  margin-left: ${(props) => props.theme.spacing.medium};
`;

const Container = styled.div`
  margin: 0 auto;
  color: ${props => props.theme.palette.primary.light};
`;

const Game = styled.div`
  display: flex;
  justify-content: space-between;
`

const Protocol = styled.div`
  display: grid;
  grid-template-columns: auto ${({ theme }) => theme.spacing.xlarge};
  grid-gap: 1px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.common.black};
`;

const ProtocolKey = styled.div`
  padding: ${({ theme }) => theme.spacing.xsmall};
  grid-column-start: 1;
  align-self: center;
  text-transform: capitalize;
  background: ${props => props.isUsed ? 'aliceblue' : props.isValid ? props.theme.palette.common.papayawhip : props.theme.palette.common.white };
`;

const ProtocolValue = styled.div`
  padding: ${({ theme }) => theme.spacing.xsmall};
  grid-column-start: 2;
  text-align: end;
  align-self: center;
  cursor: ${props => props.isUsed ? 'auto' : 'pointer' };
  background: ${props => props.isUsed ? 'aliceblue' : props.isValid ? props.theme.palette.common.papayawhip : props.theme.palette.common.white };
`;

const Yatzy = ({
    undo,
    redeal,
    game,
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
    newGameHandler,
  }) => {  

  const diceClickHandler = (id) => toggleDice(id);
  const onProtocolValueClick = (obj) => {
    if (obj.label !== 'bonus') {
      setProtocolItemSum(obj);
    }
  }

  return (
    <Container>
      <Game>        
        <Protocol>
          { protocol.map((obj) => {
            return (
              <React.Fragment key={obj.key}>
                <ProtocolKey isUsed={obj.isUsed}>{`${obj.label}: `}</ProtocolKey>
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
          <Dashboard>
            <div>
              { !highScore.length &&
                `Current highscore: 0`
              }
              {!!highScore.length &&
                <div>
                  {`Current highscore: `}
                  {highScore.map(({ score, userName }, i) => (
                    <div key={`${userName}${i}`}>{`${userName}: ${score}`}</div>
                  ))}
                </div>
              }
            </div>
            <ButtonSecondaryAction onClick={newGameHandler}>New game</ButtonSecondaryAction>
          </Dashboard>
          {gameFinished &&
            <ContentSection>
              {`CONGRATULATION YOU HAVE WON THE GAME WITH A TOTAL OF: ${total}`}
            </ContentSection>
          }
          {!gameFinished &&
            <div>
              <p>{`Total: ${total}`}</p>
              <p>Rolls left: {availableRolls}</p>
              <DiceBoard>
                <Button onClick={rollDices} disabled={availableRolls === 0}>Roll Dices</Button>
                { dices.map(({ id, value, shouldReRoll }, i) => (
                  <Dice
                    selected={!shouldReRoll}
                    key={`dice-${id}`}
                    onClick={diceClickHandler.bind(this, id)}
                    dangerouslySetInnerHTML={{ __html: `&#x268${value}`}}
                  />
                ))}
              </DiceBoard>
            </div>
          }
        </Wrapper>
      </Game>
    </Container>
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
    undo: () => dispatch({ type: 'UNDO' }),
    redeal: () => dispatch({ type: 'RE_DEAL' }),
    rollDices: () => dispatch({ type: 'YATZY_ROLL_DICES' }),
    toggleDice: (id) => dispatch({ type: 'YATZY_TOGGLE_DICE', data: { id } }),
    setProtocolItemSum: (protocolItem) => dispatch({ type: 'YATZY_SET_PROTOCOL_ITEM_SUM', data: { ...protocolItem }}),
    newGameHandler: () => dispatch({ type: 'YATZY_NEW_GAME' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Yatzy);