import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components/macro';

import { Grid, GridItem } from 'Components/StyledComponents/Grid';
import Dashboard from 'Components/Dashboard';
import ContentSection, { GameTop } from 'Components/StyledComponents/ContentSection';
import PileWaste from 'Components/PileWaste';
import PileStock from 'Components/PileStock';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import { PileGroup } from 'Components/Pile';

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

  const stockAndWaste = 2;
  const nrOfPiles = 7;
  return (
    <div>
      <section>
        <Dashboard undo={undo} redeal={redeal} />
      </section>
      <Grid columns={nrOfPiles}>
        {foundationPilesKeys.map((pileKey, i) => {
          const pile = game[pileKey];
          return (
            <GridItem column={i + 1} key={pileKey}>
              <PileFoundationDropppable
                pile={pile}
                pileId={pileKey}
                onDrop={onDropFoundation}
              />
            </GridItem>
          )
        })}
        <GridItem column={6}>
          <PileWaste pile={game.waste} onClick={wasteClickHandler} />
        </GridItem>
        <GridItem column={7}>
          <PileStock
            onClick={onStockClick}
            pile={game.stock}
            reRunDeck={reRunDeck}
          />
        </GridItem>
        {tableauPilesKeys.map((pileKey, i) => {
          const pile = game[pileKey];
          return (
            <GridItem row={2} column={i + 1} key={pileKey}>
              <PileTableau
                key={pileKey}
                pile={pile}
                pileKey={pileKey}
                onDrop={onDropTableau}
                onClick={onClickTableau}
              />
            </GridItem>
          )
        })}
      </Grid>
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
