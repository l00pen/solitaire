import React, {useState} from 'react';
import { connect } from 'react-redux'


import Klondike from './Klondike';

import './App.css';

const getSelectedGameComponent = (game) => {
  switch(game) {
    case 'klondike':
      console.log('bajs')
      return <Klondike />;
    default:
      return <div>No valid game selected</div>;
  }
}

function App({ undo, redeal }) {
  const [selectedGame, setSelectedGame] = useState('klondike');
  
  const selectedGameComponent = getSelectedGameComponent(selectedGame);
  console.log('hej', selectedGame, selectedGameComponent)
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
        </select>
      </div>
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
