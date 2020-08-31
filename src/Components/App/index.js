import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

import {BreakpointProvider} from 'Contexts/BreakpointProvider'

import Spider from 'Components/Games/Spider';
import Klondike from 'Components/Games/Klondike';
import Yukon from 'Components/Games/Yukon';
import Yatzy from 'Components/Games/Yatzy';
import { Select, Option } from 'Components/StyledComponents/Select';

const queries = {
  xs: '(max-width: 320px)',
  sm: '(max-width: 720px)',
  md: '(max-width: 1024px)',
  l: '(min-width: 1024px)',
  or: '(orientation: portrait)', // we can check orientation also
}

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

const theme = {
  secondaryColor: "#fefefe",
  primaryColor: "#40b4de",
  primaryTextColor: '#0a3458',
  borderRadius: 0.125,
  baseSize: 1.75,
  padding: 0.5,
  breakpoints: queries,
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #282c34;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  svg {
    width: 100%;
  }
`;

const Game = styled.div`
  text-align: center;
  height: 100vh;
`;

const Dashboard = styled.div`
  display: flex;
  margin: 1em 0.25em;
  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: 1em auto;
    align-items: center;
  }
`
const GameSection = styled.div`
  display: inline-block;
  margin: 0 0.25em;
  width: 100%;
  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: 0 auto;
  }
`

function App(props) {
  const [selectedGame, setSelectedGame] = useState(GAMES.YUKON);

  const selectedGameComponent = getSelectedGameComponent(selectedGame);

  return (
    <BreakpointProvider queries={queries}>
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
