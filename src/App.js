import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components';

import Dashboard from './Dashboard';
import Spider from './Spider';
import Klondike from './Klondike';
import Yukon from './Yukon';

import './App.css';

const getSelectedGameComponent = (game, hasWonHandler) => {
  switch(game) {
    case 'klondike':
      return <Klondike onHasWon={hasWonHandler} />;
    case 'spider':
      return <Spider onHasWon={hasWonHandler} />;
    case 'yukon':
      return <Yukon onHasWon={hasWonHandler} />;
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

const ContentSection = styled.section`
  background-color: rgba(245,245,245,0.7);
  color: rgba(3,2,20,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: 1em;
  min-height: 20em;
`;

function App(props) {
  const [selectedGame, setSelectedGame] = useState('klondike');
  const [hasWon, setHasWon] = useState(false);

  const hasWonHandler = () => {
    setHasWon(true);
  }

  const selectedGameComponent = getSelectedGameComponent(selectedGame, hasWonHandler);

  return (
    <ThemeProvider theme={theme}>
      <div className="Game">
        <div className="Game__dashboard">
          <Dashboard selectedGame={selectedGame} setSelectedGame={setSelectedGame} {...props} />
        </div>
        { hasWon &&
          <ContentSection>
            CONGRATULATION YOU HAVE WON THE GAME
          </ContentSection>
        }
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
