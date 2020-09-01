import React from 'react';

import { Pile } from 'Components/Pile'
import { CardFaceUp, CardDroppable, CardEmpty } from 'Components/Card';

export const PileFoundationDropppable = ({ pile, pileId, onDrop }) => {
  let cardComponent = null;
  
  if (pile.length === 0) {
    cardComponent = <CardEmpty />
  } else {
    const card = pile[pile.length - 1];
    cardComponent = <CardFaceUp {...card} />
  }

  return (
    <Pile>
      <CardDroppable
        data={{ destinationPile: pileId }}
        dropHandler={onDrop}
      >
        {cardComponent}
      </CardDroppable>
    </Pile>
  )
}

const PileFoundation = ({ pile, pileId }) => {
  let comp = <CardEmpty />
  if (pile.length > 0) {
    const card = pile[pile.length - 1];
    comp = <CardFaceUp {...card} />;
  }
  return (
    <Pile>
      {comp}
    </Pile>
  );
}

export default PileFoundation;
