import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/macro'

import {DashboardStyled} from 'Components/Dashboard';
import ContentSection from 'Components/StyledComponents/ContentSection';
import { Button, ButtonSecondaryAction } from 'Components/StyledComponents/Buttons';
import ProtocolItem from './ProtocolItem';

import {
  getProtocol,
  getTotal,
  getIsGameFinished,
} from 'reducers/yatzy/selectors';

const YatzyDashboard = styled(DashboardStyled)`
  margin-bottom: ${({ theme }) => theme.spacing.xxsmall};
`
const DiceBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: column;
  @media ${(props) => props.theme.breakpoints.l} {
    flex-direction: row;
  }
`;

const Dice = styled.div`
  font-size: 15vw;
  cursor: pointer;
  color: ${({ theme, selected }) => selected ? theme.palette.common.pink : 'inherit'};
  flex: 1 1 0;
  line-height: 0.8;

  @media ${(props) => props.theme.breakpoints.l} {
    font-size: 8vw;
    margin-top: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  color: ${props => props.theme.palette.primary.light};
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${({ theme }) => theme.spacing.xxsmall};
`;

const Protocol = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 1px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({ theme }) => theme.palette.common.black};
`;

const Yatzy = ({
    undo,
    redeal,
    game,
    dices,
    total,
    rollDices,
    availableRolls,
    toggleDice,
    setProtocolItemSum,
    protocol,
    highScore,
    gameFinished,
    newGameHandler,
  }) => {  

  const diceClickHandler = (id) => toggleDice(id);

  return (
    <React.Fragment>
      <YatzyDashboard>
        <ButtonSecondaryAction onClick={newGameHandler}>New game</ButtonSecondaryAction>
        <ButtonSecondaryAction onClick={() => {}}>Undo</ButtonSecondaryAction>
      </YatzyDashboard>
      <Container>   
        <Protocol>
          { protocol.map((item) => {
            return (
              <ProtocolItem key={item.id} {...item} />
            );
          })}
          <ProtocolItem
            key={'total'}
            label={'Total'}
            total={total}
            selectable={false}
          />
        </Protocol>
        <Wrapper>
          {gameFinished &&
            <ContentSection>
              {`CONGRATULATION YOU HAVE WON THE GAME WITH A TOTAL OF: ${total}`}
            </ContentSection>
          }
          {!gameFinished &&
            <div>
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
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = ({ yatzyReducer: state}) => {
  const protocol = getProtocol(state);
  return {
    ...state,
    ...state.yatzy,
    ...state.highScore,
    protocol,
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
    newGameHandler: () => dispatch({ type: 'YATZY_NEW_GAME' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Yatzy);