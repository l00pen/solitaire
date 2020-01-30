import React, {useState} from 'react';
import { connect } from 'react-redux'


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

function App({ undo, redeal }) {
  const [selectedGame, setSelectedGame] = useState('yukon');
  const [hasWon, setHasWon] = useState(false);

  const hasWonHandler = () => {
    setHasWon(true);
  }

  const selectedGameComponent = getSelectedGameComponent(selectedGame, hasWonHandler);

  return (
    <div className="Game">
      <div className="Game__dashboard">
        <button onClick={undo}>Undo</button>
        <button onClick={redeal}>New Deal</button>
        <select
          value={selectedGame}
          onChange={e => setSelectedGame(e.target.value)}
        >
          <option key={'klondike'} value={'klondike'}>
            Klondike
          </option>
          <option key={'spider'} value={'spider'}>
            Spider
          </option>
          <option key={'yukon'} value={'yukon'}>
            Yukon
          </option>
        </select>
      </div>
      { hasWon &&
        <div>CONGRATULATION YOU HAVE WON THE GAME</div>
      }
      <section className='Game__section'>
        {selectedGameComponent}
      </section>
    </div>
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
