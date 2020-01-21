import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';

import './styles.css';

const PileWaste = ({ pile, onDragStart }) => {
  if (pile.length === 0) {
    return <PileEmpty />
  }
  return (
    <Pile>
      {pile.map((card, i) => {
        return (
          <li className='App-card Waste-card' key={card.id}>
            <CardTableau
              {...card}
              onDragStart={(event) => onDragStart(event, {
                card,
                cardIndexInPile: i,
                sourcePile: 'waste',
              })}
              draggable={!!card.isFaceUp}
            />
          </li>
        );
      })}
    </Pile>
  );
}

export default PileWaste;
