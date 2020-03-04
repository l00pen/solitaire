import React from 'react';
import { connect } from 'react-redux'

import PileFoundation from '../PileFoundation';
import PileTableau from '../PileTableau';

function Yukon(props) {
  const {
    game,
    tableauDropHandler,
    foundationDropHandler,
    onHasWon,
    foundationPilesKeys,
    tableauPilesKeys,
  } = props;

  const onDropFoundation = (dropData, dragData) => {
    console.log('hej hej hej yukon comp')
    foundationDropHandler({ dropData, dragData })
  }

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData })
  }

  const onClickTableau = (clickData) => {
    console.log('hej')
  }

  if (game.hasWon) {
    onHasWon();
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
  game: state.yukon.present,
  foundationPilesKeys: state.yukon.present.foundationPilesKeys,
  tableauPilesKeys: state.yukon.present.tableauPilesKeys,
})

const mapDispatchToProps = dispatch => ({
  foundationDropHandler: (payload) => dispatch({ type: 'YUKON_DROP_FOUNDATION', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'YUKON_DROP_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Yukon)
