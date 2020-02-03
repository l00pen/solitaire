import React from 'react';

import Pile from '../Pile';
import { CardFan, CardDroppable, CardDraggable, CardToggleFaceUp, CardEmpty } from '../Card';

import { cardFanOffset } from '../styleVariables.js'

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
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

  return (
    <Pile minHeight={cardFanOffset * minHeight + 125}>
      {pile.map((card, cardIndex) => {
        return (
          <CardDroppable
            key={card.key + pileKey}
            data={{ destinationPile: pileKey }}
            dropHandler={onDrop}
          >
            <CardFan cardIndex={cardIndex}>
              <CardDraggable
                data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
                draggable={!!card.isFaceUp /* TODO move to reducers isDraggable function */}
              >
                <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
              </CardDraggable>
            </CardFan>
          </CardDroppable>
        );
      })}
    </Pile>
  );
}

export default PileTableau;
