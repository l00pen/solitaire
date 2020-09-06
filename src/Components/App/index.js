import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

import {theme} from '../../Themes';

import {BreakpointProvider} from 'Contexts/BreakpointProvider'

import Spider from 'Components/Games/Spider';
import Klondike from 'Components/Games/Klondike';
import Yukon from 'Components/Games/Yukon';
import Yatzy from 'Components/Games/Yatzy';
import { Select, Option } from 'Components/StyledComponents/Select';

const GAMES = {
  YUKON: 'yukon',
  KLONDIKE: 'klondike',
  SPIDER: 'spider',
  YATZY: 'yatzy',
}

const getSelectedGameComponent = (game) => {
  switch(game) {
    case GAMES.KLONDIKE:
      return <Klondike />;
    case GAMES.SPIDER:
      return <Spider />;
    case GAMES.YUKON:
      return <Yukon />;
    case GAMES.YATZY:
      return <Yatzy />;
    default:
      return <div>No valid game selected</div>;
  }
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${props => props.theme.spacing.medium};
  }
  body {
    margin: 0;
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: #282c34;
  }
`;

const Game = styled.div`
  text-align: center;
  height: 100vh;
`;

const Dashboard = styled.div`
  display: flex;
  margin: ${(props) => props.theme.spacing.medium} ${(props) => props.theme.spacing.xxsmall};

  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: ${(props) => props.theme.spacing.medium} auto;
    align-items: center;
  }
`
const GameSection = styled.div`
  display: inline-block;
  margin: 0 ${(props) => props.theme.spacing.xxsmall};
  width: 100%;
  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: 0 auto;
  }
`

function App(props) {
  const [selectedGame, setSelectedGame] = useState(GAMES.KLONDIKE);

  const selectedGameComponent = getSelectedGameComponent(selectedGame);

  return (
    <BreakpointProvider queries={theme.breakpoints}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Game>
          <Dashboard>
            <Select
              value={selectedGame}
              onChange={e => setSelectedGame(e.target.value)}
            >
              {Object.values(GAMES).map((game) => (
                <Option key={game} value={game}>
                  {game}
                </Option>
              ))}
            </Select>
          </Dashboard>
          <GameSection>
            {selectedGameComponent}
          </GameSection>
        </Game>
      </ThemeProvider>
    </BreakpointProvider>
  );
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
