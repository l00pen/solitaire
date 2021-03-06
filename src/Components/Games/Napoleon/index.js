import React from 'react';
import { connect } from 'react-redux'

import { useBreakpoint } from 'Contexts/BreakpointProvider'

import Dashboard from 'Components/Dashboard';
import ContentSection from 'Components/StyledComponents/ContentSection';
import { Grid, GridItem } from 'Components/StyledComponents/Grid';
import PileStock from 'Components/PileStock';
import PileWaste from 'Components/PileWaste';
import PileFoundation from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';

export function Napoleon(props) {
  const {
    undo,
    redeal,
    game,
    stockClickHandler,
    tableauClickHandler,
    tableauDropHandler,
    foundationPilesKeys,
    tableauPilesKeys,
    wasteClickHandler,
  } = props;

  useBreakpoint();

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData })
  }

  const onStockClick = (clickData) => {
    stockClickHandler(clickData);
  }

  const onClickTableau = (clickData) => {
    tableauClickHandler(clickData)
  }

  const nrOfPiles = 12;
  return (
    <div>
      <section>
        <Dashboard undo={game.hasWon ? null : undo} redeal={redeal} />
        {game.hasWon &&
          <ContentSection>
            CONGRATULATION YOU HAVE WON THE GAME
          </ContentSection>
        }
      </section>
      <Grid columns={nrOfPiles}>
        {foundationPilesKeys.map((pileKey, i) => {
          const pile = game[pileKey];
          return (
            <GridItem column={i + 1} key={pileKey}>
              <PileFoundation
                pile={pile}
                pileId={pileKey}
              />
            </GridItem>
          )
        })}
        <GridItem column={11}>
          <PileWaste pile={game.waste} onClick={wasteClickHandler} />
        </GridItem>
        <GridItem column={12}>
          <PileStock
            onClick={onStockClick}
            pile={game.stock}
          />
        </GridItem>
        {tableauPilesKeys.map((pileKey, i) => {
          const pile = game[pileKey];
          return (
            <GridItem row={2} column={i + 1} key={pileKey}>
              <PileTableau
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
  game: state.napoleon.present,
  foundationPilesKeys: state.napoleon.present.foundationPilesKeys,
  tableauPilesKeys: state.napoleon.present.tableauPilesKeys,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch({ type: 'UNDO' }),
  redeal: () => dispatch({ type: 'RE_DEAL' }),
  stockClickHandler: (payload) => dispatch({ type: 'NAPOLEON_CLICK_STOCK', payload }),
  wasteClickHandler: (payload) => dispatch({ type: 'NAPOLEON_CLICK_WASTE', payload }),
  tableauClickHandler: (payload) => dispatch({ type: 'NAPOLEON_CLICK_TABLEAU', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'NAPOLEON_DROP_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Napoleon)