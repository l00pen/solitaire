import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components';

import Dashboard from './Dashboard';
import Spider from './Spider';
import Klondike from './Klondike';
import Yukon from './Yukon';

import './App.css';

const getSelectedGameComponent = (game) => {
  switch(game) {
    case 'klondike':
      return <Klondike />;
    case 'spider':
      return <Spider />;
    case 'yukon':
      return <Yukon />;
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
};

function App(props) {
  const [selectedGame, setSelectedGame] = useState('spider');

  console.log(selectedGame)

  const selectedGameComponent = getSelectedGameComponent(selectedGame);

  return (
    <ThemeProvider theme={theme}>
      <div className="Game">
        <div className="Game__dashboard">
          <Dashboard selectedGame={selectedGame} setSelectedGame={setSelectedGame} {...props} />
        </div>
        <section className='Game__section'>
          {selectedGameComponent}
        </section>
      </div>
    </ThemeProvider>
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
