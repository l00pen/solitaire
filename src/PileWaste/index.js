import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked } from '../Card';

import './styles.css';

const PileWaste = ({ pile, onDragStart }) => {
  if (pile.length === 0) {
    return <PileEmpty />
  }
  return (
    <Pile>
      {pile.map((card, i) => {
        return (
          <CardStacked key={card.id}>
            <CardTableau
              {...card}
              onDragStart={(event) => onDragStart(event, {
                card,
                cardIndexInPile: i,
                sourcePile: 'waste',
              })}
              draggable={!!card.isFaceUp}
            />
          </CardStacked>
        );
      })}
    </Pile>
  );
}

export default PileWaste;
