import React from 'react';
import { connect } from 'react-redux'

import Dashboard from 'Components/Dashboard';
import ContentSection, { GameTop } from 'Components/StyledComponents/ContentSection';
import PileWaste from 'Components/PileWaste';
import PileStock from 'Components/PileStock';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import { PileGroup } from 'Components/Pile';
import { CardDisplayEmpty } from 'Components/Card';

function Klondike(props) {
  const {
    undo,
    redeal,
    game,
    reRunDeck,
    stockClickHandler,
    foundationDropHandler,
    tableauDropHandler,
    tableauClickHandler,
    wasteClickHandler
  } = props;
  const { tableauPilesKeys, foundationPilesKeys } = game;

  if (game.hasWon) {
    return (
      <ContentSection>
        CONGRATULATION YOU HAVE WON THE GAME
      </ContentSection>
    );
  }

  const onDropTableau = (dropData, dragData) => {
    console.log('drop tableau', dragData)
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

  const foundationComp = foundationPilesKeys.map((pileKey) => {
    const pile = game[pileKey];
    return (
      <PileFoundationDropppable
        key={pileKey}
        pile={pile}
        pileId={pileKey}
        onDrop={onDropFoundation}
      />
    )
  });

  const stockAndWaste = [
    <PileWaste key={'waste'} pile={game.waste} onClick={wasteClickHandler} />,
    <PileStock
      key={'stock'}
      onClick={onStockClick}
      pile={game.stock}
      reRunDeck={reRunDeck}
    />
  ];

  const paddComp = new Array(tableauPilesKeys.length - (foundationPilesKeys.length + stockAndWaste.length)).fill(<CardDisplayEmpty key={'none'}/>);
  const topPileRow = [...foundationComp, ...paddComp, ...stockAndWaste]
  return (
    <div>
      <section>
        <Dashboard undo={undo} redeal={redeal} />
      </section>
      <GameTop>
        <PileGroup>
          {topPileRow}
        </PileGroup>
      </GameTop>
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
  undo: () => dispatch({ type: 'UNDO' }),
  redeal: () => dispatch({ type: 'RE_DEAL' }),
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
