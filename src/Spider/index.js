import React from 'react';
import { connect } from 'react-redux'

import PileStock from '../PileStock';
import PileFoundation from '../PileFoundation';
import PileTableau from '../PileTableau';

function Spider(props) {
  const {
    game,
    stockClickHandler,
    tableauDropHandler,
    tableauClickHandler,
    foundationPilesKeys,
    tableauPilesKeys,
  } = props;

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData })
  }

  const onStockClick = (clickData) => {
    stockClickHandler(clickData);
  }

  const onClickTableau = (clickData) => {}

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
              />
            )
          })}
        </section>
        <section className='Game-stock'>
          <PileStock
            onClick={onStockClick}
            pile={game.stock}
          />
        </section>
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
  game: state.spider.present,
  foundationPilesKeys: state.spider.present.foundationPilesKeys,
  tableauPilesKeys: state.spider.present.tableauPilesKeys,
})

const mapDispatchToProps = dispatch => ({
  stockClickHandler: (payload) => dispatch({ type: 'SPIDER_CLICK_STOCK', payload }),
  tableauClickHandler: (payload) => dispatch({ type: 'SPIDER_CLICK_TABLEAU', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'SPIDER_DROP_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spider)
