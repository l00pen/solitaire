import React from 'react';
import { connect } from 'react-redux'

import ContentSection from 'Components/ContentSection';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import {PileGroup} from 'Components/Pile';

function Yukon(props) {
  const {
    game,
    tableauDropHandler,
    foundationDropHandler,
    tableauClickHandler,
    onHasWon,
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

  if (game.hasWon) {
    return (
      <ContentSection>
        CONGRATULATION YOU HAVE WON THE GAME
      </ContentSection>
    );
  }

  return (
    <React.Fragment>
      <section className='Game-top'>
        <PileGroup>
          {foundationPilesKeys.map((pileKey) => {
            const pile = game[pileKey];
            return (
              <PileFoundationDropppable
                key={pileKey}
                pile={pile}
                pileId={pileKey}
                onDrop={onDropFoundation}
              />
            )
          })}
        </PileGroup>
      </section>
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
    </React.Fragment>
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
  tableauClickHandler: (payload) => dispatch({ type: 'YUKON_CLICK_TABLEAU', payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Yukon)
