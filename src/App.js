import React from 'react';
import { connect } from 'react-redux'


import PileWaste from './PileWaste';
import PileStock from './PileStock';
import PileFoundation from './PileFoundation';
import PileTableau from './PileTableau';

import './App.css';

function App({ game, undo, redeal, reRunDeck, stockClickHandler, foundationDropHandler, tableauDropHandler }) {
  const { tableauPilesKeys, foundationPilesKeys } = game;

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData });
  }

  const onDropFoundation = (dropData, dragData) => {
    foundationDropHandler({ dropData, dragData })
  }

  const onStockClick = (ev, clickData) => {
    stockClickHandler(clickData);
  }

  return (
    <div className="Game">
      <button onClick={undo}>Undo</button>
      <button onClick={redeal}>New Deal</button>
      <section className='Game-top'>
        <section className='Game-Foundation'>
          {foundationPilesKeys.map((pileKey) => {
            const pile = game[pileKey];
            return (
              <PileFoundation
                key={pileKey}
                pile={pile}
                pileId={pileKey}
                onDrop={onDropFoundation}
              />
            )
          })}
        </section>
        <div className='Game-stockAndWaste'>
          <section className='Game-Waste'>
            <PileWaste pile={game.waste} />
          </section>
          <section className='Game-Stock'>
            <PileStock
              onClick={onStockClick}
              pile={game.stock}
              reRunDeck={reRunDeck}
            />
          </section>
        </div>
      </section>
      <section className='Game-Tableau'>
        {tableauPilesKeys.map((pileKey) => {
          const pile = game[pileKey];
          return (
            <PileTableau
              key={pileKey}
              pile={pile}
              pileKey={pileKey}
              onDrop={onDropTableau}
            />
          )
        })}
      </section>
    </div>
  );
}

const mapStateToProps = state => ({
  game: state.klondike.present,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch({ type: 'UNDO' }),
  redeal: () => dispatch({ type: 'RE_DEAL' }),
  reRunDeck: () => dispatch({ type: 'RE_RUN_DECK'}),
  stockClickHandler: (payload) => dispatch({ type: 'CLICK_STOCK', payload }),
  foundationDropHandler: (payload) => dispatch({ type: 'DROP_FOUNDATION', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'DROP_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
