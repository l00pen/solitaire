import React from 'react';

import {Pile} from '../StyledComponents/Pile'
import {
  CardFan,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardEmpty,
} from 'Components/Card';

const renderPile = (list, cardIndex, pileKey, onDrop, onClick) => {
  if (list.length === 0) {
    return null;
  }

  const [card, ...rest] = list;
  const dragAndDropData = { card, cardIndexInPile: cardIndex, sourcePile: pileKey };

  const cardList = renderPile(rest, cardIndex + 1, pileKey, onDrop, onClick);
  return (
    <CardFan cardIndex={cardIndex}>
      <CardDraggable
        data={dragAndDropData}
        draggable={!!card.isFaceUp}
      >
        <CardToggleFaceUp {...card} onClick={() => onClick(dragAndDropData)} />
        {cardList}
      </CardDraggable>
    </CardFan>
  );
}

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
  const lastCardInPile = pile.length > 0 ? pile[pile.length - 1] : {};
  const lastCardInPileIndex = pile.length > 0 ? pile.length - 1 : 0;

  const pileComponents = pile.length > 0 ? renderPile(pile, 0, pileKey, onDrop, onClick) : <CardEmpty />;

  return (
    <Pile pile={pile}>
      <CardDroppable
        data={{ card: lastCardInPile, cardIndex: lastCardInPileIndex, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        {pileComponents}
      </CardDroppable>
    </Pile>
  );
}

export default PileTableau;
