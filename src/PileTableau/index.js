import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';
import { CardFan, CardDroppable, CardDraggable } from '../Card';

import './styles.css';

const PileTableau = ({ pile, pileKey, onDrop }) => {
  if (pile.length === 0) {
    return (
      <CardDroppable
        data={{ card: {}, cardIndex: 0, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        <PileEmpty />
      </CardDroppable>
    )
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => {
        return (
          <CardDroppable
            key={card.id + pileKey}
            data={{ card, cardIndex, destinationPile: pileKey }}
            dropHandler={onDrop}
          >
            <CardFan cardIndex={cardIndex}>
              <CardDraggable
                data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
                draggable={!!card.isFaceUp}
              >
                <CardTableau {...card} />
              </CardDraggable>
            </CardFan>
          </CardDroppable>
        );
      })}
    </Pile>
  );
}

export default PileTableau;
