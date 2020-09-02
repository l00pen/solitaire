import React from 'react';
import styled from 'styled-components/macro';

import PileContext from '../../Contexts/PileProvider';
import {Pile} from 'Components/Pile'
import {
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardEmpty,
} from 'Components/Card';

const SubPile = styled.div`
  position: absolute;
  width: 100%;
  top: ${(props) => props.cardIndex === 0 ? 0 : props.topHeightOffset}px;
  height: ${({ subPileHeight }) => subPileHeight}px;
`;

const renderPile = (list, cardIndex, pileKey, onClick, pileProps) => {
  if (list.length === 0) {
    return <CardEmpty />;
  }

  const [card, ...rest] = list;
  const dragAndDropData = { card, cardIndexInPile: cardIndex, sourcePile: pileKey };

  const topHeightOffset = 15;
  const cardList = rest.length > 0 ? renderPile(rest, cardIndex + 1, pileKey, onClick, pileProps) : null;
  const subPileHeight = ((pileProps.pileLength - cardIndex - 1) * topHeightOffset) + pileProps.height;
  return (
    <SubPile cardIndex={cardIndex} topHeightOffset={topHeightOffset} subPileHeight={subPileHeight}>
      <CardDraggable
        data={dragAndDropData}
        draggable={!!card.isFaceUp}
      >
        <CardToggleFaceUp {...card} onClick={() => onClick(dragAndDropData)} />
        {cardList}
      </CardDraggable>
    </SubPile>
  );
}

const PileTableau = ({ pile, pileKey, onDrop, onClick }) => {
  const lastCardInPile = pile.length > 0 ? pile[pile.length - 1] : {};
  const lastCardInPileIndex = pile.length > 0 ? pile.length - 1 : 0;

  return (
    <Pile pile={pile}>
      <CardDroppable
        data={{ card: lastCardInPile, cardIndex: lastCardInPileIndex, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        <PileContext.Consumer>
          { value => {
            return renderPile(pile, 0, pileKey, onClick, value);
          }}
        </PileContext.Consumer>
      </CardDroppable>
    </Pile>
  );
}

export default PileTableau;
