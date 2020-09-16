import React, {useState} from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components/macro'

import { Grid, GridItem } from 'Components/StyledComponents/Grid';
import {DashboardStyled} from 'Components/Dashboard';
import ContentSection from 'Components/StyledComponents/ContentSection';
import PileWaste from 'Components/PileWaste';
import PileStock from 'Components/PileStock';
import { PileFoundationDropppable } from 'Components/PileFoundation';
import PileTableau from 'Components/PileTableau';
import { ButtonList, ButtonSecondaryAction, ButtonNormalized, SettingsIcon } from 'Components/StyledComponents/Buttons';

const Dashboard = styled(DashboardStyled)``;
const SettingsButton = styled(ButtonNormalized)`
  align-self: center;
  flex: 0 0 auto;
  width: ${({theme}) => theme.spacing.xlarge};
  height: auto;

  & > svg {
    fill: ${({theme}) => theme.palette.primary.light};
  }
`;

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
    wasteClickHandler,
    settingsOnChangeHandler,
  } = props;
  const { tableauPilesKeys, foundationPilesKeys, gameConditions: settings } = game;

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

  const[isSettingsOpen, setIsSettingsOpen] = useState(false);

  const onToggleOpenSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const onChangeSettings = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    settingsOnChangeHandler({ name, value });
  }

  const nrOfPiles = 7;
  return (
    <div>
      <section>
        <Dashboard>
          <ButtonList>
            <ButtonSecondaryAction onClick={redeal}>New game</ButtonSecondaryAction>
            <ButtonSecondaryAction onClick={game.hasWon ? null : undo}>Undo</ButtonSecondaryAction>
          </ButtonList>
          <SettingsButton onClick={onToggleOpenSettings}>
            <SettingsIcon />
          </SettingsButton>
        </Dashboard>
        {game.hasWon &&
          <ContentSection>
            CONGRATULATION YOU HAVE WON THE GAME
          </ContentSection>
        }
        {isSettingsOpen &&
          <ContentSection>
            <form>
              <input type="radio" id='one' name="stockTakes" checked={settings.stockTakes === '1'} value={'1'} onChange={onChangeSettings}/>
              <label htmlFor='one'>1</label>
              <input type="radio" id='three' name="stockTakes" checked={settings.stockTakes === '3'} value={'3'} onChange={onChangeSettings}/>
              <label htmlFor='three'>3</label>
              <label htmlFor={'tableauEmptyAny'}>tableau Empty Any</label>
              <input type='checkbox' id={'tableauEmptyAny'} name={'tableauEmptyAny'} checked={settings.tableauEmptyAny} onChange={onChangeSettings} />
            </form>
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
  settingsOnChangeHandler: (payload) => dispatch({ type: 'SETTINGS_ON_CHANGE', payload})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Klondike)
