import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components/macro';

import {theme} from '../../Themes';

import {BreakpointProvider} from 'Contexts/BreakpointProvider'
import {sectionTopDistance} from 'Components/StyledComponents/ContentSection';

import Spider from 'Components/Games/Spider';
import Klondike from 'Components/Games/Klondike';
import Yukon from 'Components/Games/Yukon';
import Yatzy from 'Components/Games/Yatzy';
import Napoleon from 'Components/Games/Napoleon';
import { Select, Option } from 'Components/StyledComponents/Select';

const GAMES = {
  YUKON: 'yukon',
  KLONDIKE: 'klondike',
  SPIDER: 'spider',
  YATZY: 'yatzy',
  NAPOLEON: 'napoleon',
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
    case GAMES.NAPOLEON:
      return <Napoleon />;
    default:
      return <div>No valid game selected</div>;
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    font-size: ${props => props.theme.spacing.medium};
    touch-action: manipulation;
  }

  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: #282c34;
    overflow: hidden;
  }
`;

const Game = styled.div`
  height: 100vh;
`;

const Row = styled.div`
  margin: 0 ${(props) => props.theme.spacing.xxsmall};

  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: 0 auto;
  }
`
const GameSection = styled.div`
  margin: 0 ${(props) => props.theme.spacing.xxsmall};

  @media ${(props) => props.theme.breakpoints.l} {
    width: 50%;
    margin: 0 auto;
  }
`

const AppSelect = styled(Select)`
  width: 100%;
  ${sectionTopDistance};

  @media ${(props) => props.theme.breakpoints.l} {
    width: inherit;
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
          <Row>
            <AppSelect
              value={selectedGame}
              onChange={e => setSelectedGame(e.target.value)}
            >
              {Object.values(GAMES).map((game) => (
                <Option key={game} value={game}>
                  {game}
                </Option>
              ))}
            </AppSelect>
          </Row>
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
