import React from 'react';

import { CardFaceUp } from '../Card';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked, CardDraggable } from '../Card';

import './styles.css';

const PileWaste = ({ pile }) => {
  if (pile.length === 0) {
    return <PileEmpty />
  }
  return (
    <Pile>
      {pile.map((card, i) => {
        return (
          <CardDraggable
            key={card.id}
            data={{ card, cardIndexInPile: i, sourcePile: 'waste' }}
            draggable={!!card.isFaceUp}
          >
            <CardStacked>
              <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
            </CardStacked>
          </CardDraggable>
        );
      })}
    </Pile>
  );
}

export default PileWaste;
