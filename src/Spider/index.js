import React from 'react';
import { connect } from 'react-redux'

import PileStock from '../PileStock';
import PileFoundation from '../PileFoundation';
import PileTableau from '../PileTableau';
import styled from 'styled-components';

import './styles.css';

const SpiderBoard = styled.div`
  display: flex;
  flex-direction: column;
`;

const Foundation = styled.section`
  min-height: 20vh;
  display: flex;
`;

const Stock = styled.section`
  display: flex;
`;

const Tableau = styled.section`
  min-height: 60vh;
  display: flex;
`;

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

  return (
    <SpiderBoard>
      <Foundation>
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
      </Foundation>
      <Stock>
        <PileStock
          onClick={onStockClick}
          pile={game.stock}
        />
      </Stock>
      <Tableau>
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
      </Tableau>
    </SpiderBoard>
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
