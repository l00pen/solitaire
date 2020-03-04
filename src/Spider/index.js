import React from 'react';
import { connect } from 'react-redux'
import { Grid, Cell } from 'styled-css-grid';

import PileStock from '../PileStock';
import PileFoundation from '../PileFoundation';
import PileTableau from '../PileTableau';

import './styles.css';

export function Spider(props) {
  const {
    game,
    stockClickHandler,
    tableauDropHandler,
    onHasWon,
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

  if (game.hasWon) {
    onHasWon();
  }

  const nrOfColumns = Math.max(tableauPilesKeys.length, foundationPilesKeys.length);
  const maxNrOfCardsInTableau = tableauPilesKeys.reduce((mem, pileKey) => {
    return Math.max(game[pileKey].length, mem);
  }, 0);

  return (
    <Grid columns={1}>
      <Cell>
        <Grid columns={nrOfColumns}>
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
        </Grid>
      </Cell>
      <Cell>
        <Grid columns={nrOfColumns}>
          <PileStock
            onClick={onStockClick}
            pile={game.stock}
          />
        </Grid>
      </Cell>
      <Cell>
        <Grid columns={nrOfColumns}>
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
        </Grid>
      </Cell>
    </Grid>
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
