import React, {useState} from 'react';
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components';

import {BreakpointProvider} from 'Contexts/BreakpointProvider'

import Dashboard from 'Components/Dashboard';
import Spider from 'Components/Games/Spider';
import Klondike from 'Components/Games/Klondike';
import Yukon from 'Components/Games/Yukon';
import Yatzy from 'Components/Games/Yatzy';

import './App.css';

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

function App(props) {
  const [selectedGame, setSelectedGame] = useState(GAMES.YUKON);

  const selectedGameComponent = getSelectedGameComponent(selectedGame);

  return (
    <BreakpointProvider queries={queries}>
      <ThemeProvider theme={theme}>
        <div className="Game">
          <div className="Game__dashboard">
            <Dashboard
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
              games={GAMES}
              {...props}
            />
          </div>
          <section className='Game__section'>
            {selectedGameComponent}
          </section>
        </div>
      </ThemeProvider>
    </BreakpointProvider>
  );
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch({ type: 'UNDO' }),
  redeal: () => dispatch({ type: 'RE_DEAL' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
