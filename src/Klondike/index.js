import React from 'react';
import { connect } from 'react-redux'

import PileWaste from '../PileWaste';
import PileStock from '../PileStock';
import { PileFoundationDropppable } from '../PileFoundation';
import PileTableau from '../PileTableau';
import {PileGroup} from '../Pile';

function Klondike({ game, reRunDeck, stockClickHandler, foundationDropHandler, tableauDropHandler, tableauClickHandler, wasteClickHandler, onHasWon }) {
  const { tableauPilesKeys, foundationPilesKeys } = game;

  if (game.hasWon) {
    onHasWon();
  }

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData });
  }

  const onDropFoundation = (dropData, dragData) => {
    foundationDropHandler({ dropData, dragData })
  }

  const onStockClick = (clickData) => {
    stockClickHandler(clickData);
  }

  const onClickTableau = (clickData) => {
    tableauClickHandler(clickData);
  }

  const maxNrOfCardsInTableau = tableauPilesKeys.reduce((mem, pileKey) => {
    return Math.max(game[pileKey].length, mem);
  }, 0);

  return (
    <div>
      <section className='Game-top'>
        <PileGroup>
          {foundationPilesKeys.map((pileKey) => {
            const pile = game[pileKey];
            return (
              <PileFoundationDropppable
                key={pileKey}
                pile={pile}
                pileId={pileKey}
                onDrop={onDropFoundation}
              />
            )
          })}
        </PileGroup>
        <PileGroup>
          <section className='Game-Waste'>
            <PileWaste pile={game.waste} onClick={wasteClickHandler} />
          </section>
          <section className='Game-Stock'>
            <PileStock
              onClick={onStockClick}
              pile={game.stock}
              reRunDeck={reRunDeck}
            />
          </section>
        </PileGroup>
      </section>
      <PileGroup>
        {tableauPilesKeys.map((pileKey) => {
          const pile = game[pileKey];
          return (
            <PileTableau
              key={pileKey}
              pile={pile}
              pileKey={pileKey}
              onDrop={onDropTableau}
              onClick={onClickTableau}
              minHeight={maxNrOfCardsInTableau}
            />
          )
        })}
      </PileGroup>
    </div>
  );
}

const mapStateToProps = state => ({
  game: state.klondike.present,
})

const mapDispatchToProps = dispatch => ({
  reRunDeck: () => dispatch({ type: 'RE_RUN_DECK'}),
  stockClickHandler: (payload) => dispatch({ type: 'CLICK_STOCK', payload }),
  tableauClickHandler: (payload) => dispatch({ type: 'CLICK_TABLEAU', payload }),
  wasteClickHandler: (payload) => dispatch({ type: 'CLICK_WASTE', payload }),
  foundationDropHandler: (payload) => dispatch({ type: 'DROP_FOUNDATION', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'DROP_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Klondike)
