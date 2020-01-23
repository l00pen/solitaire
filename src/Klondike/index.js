import React from 'react';
import { connect } from 'react-redux'


import PileWaste from '../PileWaste';
import PileStock from '../PileStock';
import PileFoundation from '../PileFoundation';
import PileTableau from '../PileTableau';

function Klondike({ game, reRunDeck, stockClickHandler, foundationDropHandler, tableauDropHandler, tableauClickHandler, wasteClickHandler }) {
  const { tableauPilesKeys, foundationPilesKeys } = game;

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

  return (
    <div>
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
            <PileWaste pile={game.waste} onClick={wasteClickHandler} />
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
              onClick={onClickTableau}
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
