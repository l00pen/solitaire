import React from 'react';

import CardTableau from '../CardTableau';
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
              <CardTableau {...card} />
            </CardStacked>
          </CardDraggable>
        );
      })}
    </Pile>
  );
}

export default PileWaste;
