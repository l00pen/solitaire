import React from 'react';

import Pile, { PileEmpty } from '../Pile';
import { CardFan, CardDroppable, CardDraggable, CardToggleFaceUp } from '../Card';

import './styles.css';

const PileTableau = ({ pile, pileKey, onDrop, onClick }) => {
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
            key={card.key + pileKey}
            data={{ card, cardIndex, destinationPile: pileKey }}
            dropHandler={onDrop}
          >
            <CardFan cardIndex={cardIndex}>
              <CardDraggable
                data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
                draggable={!!card.isFaceUp}
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
