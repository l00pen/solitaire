import React from 'react';

import Pile from '../Pile';
import {
  CardFan,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardEmpty,
} from '../Card';

import { cardFanOffset } from '../styleVariables.js'

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
  const createRecursiveList = (list, cardIndex) => {
    const [card, ...rest] = list;
    const dragAndDropData = { card, cardIndexInPile: cardIndex, sourcePile: pileKey };

    if (rest.length === 0 && card) {
      console.log('card', card, cardIndex)
      return (
        <CardDroppable
          key={card.key + pileKey}
          data={{ destinationPile: pileKey }}
          dropHandler={onDrop}
        >
          <CardDraggable
            data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
            draggable={!!card.isFaceUp}
          >
            <CardFan cardIndex={cardIndex}>
              <CardToggleFaceUp {...card} onClick={() => onClick(dragAndDropData)} />
            </CardFan>
          </CardDraggable>
        </CardDroppable>
      );
    }

    const cardList = createRecursiveList(rest, cardIndex + 1);
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

  if (pile.length === 0) {
    return (
      <CardDroppable
        data={{ card: {}, cardIndex: 0, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        <CardEmpty />
      </CardDroppable>
    )
  }

  const result = createRecursiveList(pile, 0);

  return (
    <Pile minHeight={cardFanOffset * minHeight + 125}>
      {result}
    </Pile>
  );
}

export default PileTableau;
