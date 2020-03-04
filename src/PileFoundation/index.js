import React from 'react';

import { CardFaceUp } from '../Card';
import { CardDroppable, CardEmpty } from '../Card';

const PileFoundation = ({ pile, pileId, onDrop }) => {
  let card = {};
  // TODO Split component in two
  if (onDrop) {
    if (pile.length === 0) {
      return (
        <div
          onDragOver={(ev) => {
            ev.preventDefault();
          }}
          onDrop={(ev) => {
            console.log('yumahu', { destinationPile: pileId })
            ev.preventDefault();
            const dataFromTransfer = ev.dataTransfer.getData("pip");

            onDrop({ destinationPile: pileId }, JSON.parse(dataFromTransfer))
          }}
        >
          <CardEmpty />
        </div>
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
