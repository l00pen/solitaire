import React from 'react';

import Pile from '../Pile';
import { CardFan, CardDroppable, CardDraggable, CardToggleFaceUp, CardEmpty } from '../Card';

import { cardFanOffset } from '../styleVariables.js'

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
  const createRecursiveList = (list, cardIndex) => {
    const [card, ...rest] = list;

    if (rest.length === 0 && card) {
      console.log('hej hej hej hej', card, cardIndex, pileKey)
      const baseCase = (
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
              <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
            </CardFan>
          </CardDraggable>
        </CardDroppable>
      );
      return baseCase;
    }

    const pip = createRecursiveList(rest, cardIndex + 1);

    const tmp = (
      <CardFan cardIndex={cardIndex}>
        <CardDraggable
          data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
          draggable={!!card.isFaceUp}
        >
          <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
          {pip}
        </CardDraggable>
      </CardFan>
    );

    return tmp;
  }

  if (pile.length === 0) {
    console.log('jabba hej hej')
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
