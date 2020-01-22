import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked, CardDroppable } from '../Card';

import './styles.css';

const PileFoundation = ({ pile, pileId, onDrop }) => {
  if (pile.length === 0) {
    return (
      <CardDroppable
        data={{ destinationPile: pileId }}
        dropHandler={onDrop}
      >
        <PileEmpty />
      </CardDroppable>
    )
  }

  return (
    <CardDroppable
      data={{ destinationPile: pileId }}
      dropHandler={onDrop}
    >
      <Pile>
        {pile.map((card, cardIndex) => (
          <CardStacked key={card.id}>
            <CardTableau {...card} />
          </CardStacked>
        ))}
      </Pile>
    </CardDroppable>
  )
}

export default PileFoundation;
