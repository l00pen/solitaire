import React from 'react';

import { CardFaceUp } from '../Card';
import { CardDroppable, CardEmpty } from '../Card';

export const PileFoundationDropppable = ({ pile, pileId, onDrop }) => {
  let cardComponent = null;
  
  if (pile.length === 0) {
    cardComponent = <CardEmpty />
  } else {
    const card = pile[pile.length - 1];
    cardComponent = <CardFaceUp {...card} />
  }

  return (
    <CardDroppable
      data={{ destinationPile: pileId }}
      dropHandler={onDrop}
    >
      {cardComponent}
    </CardDroppable>
  )
}

const PileFoundation = ({ pile, pileId }) => {
  if (pile.length === 0) {
    return <CardEmpty />;
  }

  const card = pile[pile.length - 1];
  return (
    <CardFaceUp {...card} />
  )
}

export default PileFoundation;
