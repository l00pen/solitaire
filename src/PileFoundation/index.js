import React from 'react';

import { CardFaceUp } from '../Card';
import { CardDroppable, CardEmpty } from '../Card';

const PileFoundation = ({ pile, pileId, onDrop }) => {
  let card = {};
  // TODO Split component in two
  if (onDrop) {
    if (pile.length === 0) {
      return (
        <CardDroppable
          data={{ destinationPile: pileId }}
          dropHandler={onDrop}
        >
          <CardEmpty />
        </CardDroppable>
      )
    }
    card = pile[pile.length - 1];

    return (
      <CardDroppable
        data={{ destinationPile: pileId }}
        dropHandler={onDrop}
      >
        <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
      </CardDroppable>
    )
  }

  if (pile.length === 0) {
    return <CardEmpty />;
  }

  card = pile[pile.length - 1];
  return (
    <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
  )
}

export default PileFoundation;
