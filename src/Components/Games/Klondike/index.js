import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components/macro';
import Dashboard from 'Components/Dashboard';
import ContentSection, { GameTop } from 'Components/StyledComponents/ContentSection';
import PileWaste from 'Components/PileWaste';
import PileStock from 'Components/PileStock';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import { PileGroup } from 'Components/Pile';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({nrOfColumns}) => nrOfColumns}, 1fr)};
  grid-gap: 2vw;
  margin: 1vh 0;
  grid-template-rows: 2;
`
const GridFoundation = styled.div`
  grid-column: 1 / 4;
  grid-row: 1;
`

const GridStockAndWaste = styled.div`
  grid-column: 5 / 7;
  grid-row: 1;
`

const GridItem = styled.div`
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`

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
  const nrOfPiles = Math.max(tableauPilesKeys.length, foundationPilesKeys.length + stockAndWaste);
  return (
    <div>
      <section>
        <Dashboard undo={undo} redeal={redeal} />
      </section>
      <Grid nrOfColumns={nrOfPiles}>
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
        <div style={{gridColumn: 6}}>
          <PileWaste pile={game.waste} onClick={wasteClickHandler} />
        </div>
        <div style={{gridColumn: 7}}>
          <PileStock
            onClick={onStockClick}
            pile={game.stock}
            reRunDeck={reRunDeck}
          />
        </div>
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
