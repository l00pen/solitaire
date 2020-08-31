import React, {useEffect} from 'react';
import styled from 'styled-components/macro'
import { connect } from 'react-redux';
import { ButtonPrimaryAction } from 'Components/StyledComponents/Buttons';

import {
  getTotal,
  getIsGameFinished,
} from 'reducers/yatzy/selectors';

const Dashboard = styled.div`
  background: gold;
  padding: 1em;
  margin-bottom: 1em;

  display: flex;
  justify-content: space-between;
`;

const YatzyDashboard = ({
  total,
  onNewGameClick,
  highScore,
  gameFinished,
  gameFinishedHandler,
  userName,
}) => {
  const newGameHandler = () => {
    onNewGameClick();
  }

  useEffect(() => {
    if (gameFinished) {
      gameFinishedHandler(total, userName);
    }
  }, [gameFinished, gameFinishedHandler, total, userName]);

  return (
    <Dashboard>
      <div>
        <div>{`Total: ${total}`}</div>
        <ButtonPrimaryAction onClick={newGameHandler}>New game</ButtonPrimaryAction>
      </div>
      <div>
        {`Current highScore: `}
        {highScore.map(({score, userName}, i) => (
          <div key={`${userName}${i}`}>{`${userName}: ${score}`}</div>
        ))}
      </div>
    </Dashboard>
  );
}

const mapStateToProps = ({ yatzyReducer: yatzyState, userReducer: userState = {} }) => {
  return {
    ...yatzyState,
    ...yatzyState.yatzy,
    highScore: yatzyState.highScore,
    total: getTotal(yatzyState),
    gameFinished: getIsGameFinished(yatzyState),
    userName: userState.name || 'Navn Ukjent',
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onNewGameClick: () => {
      dispatch({
        type: 'YATZY_NEW_GAME',
      })
    },
    gameFinishedHandler: (total, userName) => {
      dispatch({
        type: 'YATZY_GAME_FINISHED',
        data: {
          total,
          userName,
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YatzyDashboard);