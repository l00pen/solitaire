import React from 'react';
import useUndo from 'use-undo';

import { klondike, foundationDropHandler, tableauDropHandler, stockClickHandler } from './utils/klondike';
import { allowDrop, draggable } from './utils/';
import PileWaste from './PileWaste';
import PileStock from './PileStock';
import PileFoundation from './PileFoundation';
import PileTableau from './PileTableau';

import './App.css';

function App() {
  const initGame = klondike;
  const [ gameState, { set: setGame, undo } ] = useUndo(initGame);
  const { present: game } = gameState;

  const { tableauPilesKeys, foundationPilesKeys } = initGame;

  const onDropTableau = (dropData, dragData) => {
    const newGameState = tableauDropHandler(game, dropData, dragData);
    setGame(newGameState)
  }

  const onDropFoundation = (dropData, dragData) => {
    const newGameState = foundationDropHandler(game, dropData, dragData)
    setGame(newGameState)
  }

  const onStockClick = (ev, clickData) => {
    setGame(stockClickHandler(ev, game, clickData));
  }

  return (
    <div className="Game">
      <button onClick={undo}>UNDO</button>
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
                allowDrop={allowDrop}
              />
            )
          })}
        </section>
        <div className='Game-stockAndWaste'>
          <section className='Game-Waste'>
            <PileWaste
              pile={game.waste}
              onDragStart={draggable} 
            />
          </section>
          <section className='Game-Stock'>
            <PileStock
              onClick={onStockClick}
              pile={game.stock}
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

export default App;
