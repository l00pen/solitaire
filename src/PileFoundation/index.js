import React from 'react';

import { CardFaceUp } from '../Card';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked, CardDroppable, CardEmpty } from '../Card';

import './styles.css';

const PileFoundation = ({ pile, pileId, onDrop }) => {
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

    return (
      <CardDroppable
        data={{ destinationPile: pileId }}
        dropHandler={onDrop}
      >
        <Pile>
          {pile.map((card, cardIndex) => (
            <CardStacked key={card.key}>
              <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
            </CardStacked>
          ))}
        </Pile>
      </CardDroppable>
    )
  }

  if (pile.length === 0) {
    return <CardEmpty />;
  }

  return (
    <Pile>
      {pile.map((card, cardIndex) => (
        <CardStacked key={card.key}>
          <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
        </CardStacked>
      ))}
    </Pile>
  )
}

export default PileFoundation;
