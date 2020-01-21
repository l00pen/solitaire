import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';

import './styles.css';

const PileFoundation = ({ pile, pileId, onDropFoundation, allowDrop }) => {
  if (pile.length === 0) {
    return (
      <PileEmpty
        onDrop={(event) => onDropFoundation(event, { destinationPile: pileId })}
        onDragOver={allowDrop}
      />
    )
  }

  return (
    <Pile
      onDrop={(event) => onDropFoundation(event, { destinationPile: pileId })}
      onDragOver={allowDrop}
    >
      {pile.map((card, cardIndex) => (
        <li
          className='App-card Foundation-card'
          key={card.id}
        >
          <CardTableau {...card} />
        </li>
      ))}
    </Pile>
  )
}

export default PileFoundation;
