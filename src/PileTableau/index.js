import React from 'react';

import Pile from '../Pile';
import { CardFan, CardDroppable, CardToggleFaceUp, CardEmpty } from '../Card';

import { cardFanOffset } from '../styleVariables.js'

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
  const createRecursiveList = (list, cardIndex) => {
    const [card, ...rest] = list;
  
    const onDragStart = (ev) => {
      console.log('hej hej hej hej', card, cardIndex, pileKey)
      ev.dataTransfer.setData("pip", JSON.stringify({ card, cardIndexInPile: cardIndex, sourcePile: pileKey }));
      ev.dataTransfer.setDragImage(ev.currentTarget, 50, 15);
      ev.stopPropagation();
    }

    if (rest.length === 0 && card) {
      const baseCase = (
        <CardDroppable
          key={card.key + pileKey}
          data={{ destinationPile: pileKey }}
          dropHandler={onDrop}
        >
          <div
            onDragStart={onDragStart}
            draggable={!!card.isFaceUp}
          >
            <CardFan cardIndex={cardIndex}>
              <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
            </CardFan>
          </div>
        </CardDroppable>
      );
      return baseCase;
    }

    const pip = createRecursiveList(rest, cardIndex + 1);

    const tmp = (
      <CardFan cardIndex={cardIndex}>
        <div
          onDragStart={onDragStart}
          draggable={!!card.isFaceUp}
        >
          <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
          {pip}
        </div>
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
