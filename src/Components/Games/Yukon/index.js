import React from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components/macro';

import { Grid, GridItem } from 'Components/StyledComponents/Grid';
import Dashboard from 'Components/Dashboard';
import ContentSection, { GameTop } from 'Components/StyledComponents/ContentSection';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import {PileGroup} from 'Components/Pile';

function Yukon(props) {
  const {
    undo,
    redeal,
    game,
    tableauDropHandler,
    foundationDropHandler,
    tableauClickHandler,
    foundationPilesKeys,
    tableauPilesKeys,
  } = props;

  const onDropFoundation = (dropData, dragData) => {
    foundationDropHandler({ dropData, dragData })
  }

  const onDropTableau = (dropData, dragData) => {
    tableauDropHandler({ dropData, dragData })
  }

  const onClickTableau = (clickData) => {
    tableauClickHandler(clickData)
  }

  const nrOfPiles = 7;

  return (
    <React.Fragment>
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
              <PileFoundationDropppable
                pile={pile}
                pileId={pileKey}
                onDrop={onDropFoundation}
              />
            </GridItem>
          )
        })}
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
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  game: state.yukon.present,
  foundationPilesKeys: state.yukon.present.foundationPilesKeys,
  tableauPilesKeys: state.yukon.present.tableauPilesKeys,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch({ type: 'UNDO' }),
  redeal: () => dispatch({ type: 'RE_DEAL' }),
  foundationDropHandler: (payload) => dispatch({ type: 'YUKON_DROP_FOUNDATION', payload }),
  tableauDropHandler: (payload) => dispatch({ type: 'YUKON_DROP_TABLEAU', payload }),
  tableauClickHandler: (payload) => dispatch({ type: 'YUKON_CLICK_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Yukon)
