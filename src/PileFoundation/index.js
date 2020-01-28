import React from 'react';

import { CardFaceUp } from '../Card';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked, CardDroppable } from '../Card';

import './styles.css';

const PileFoundation = ({ pile, pileId, onDrop }) => {
  if (onDrop) {
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
            <CardStacked key={card.key}>
              <CardFaceUp id={card.id} label={card.label} suite={card.suite} />
            </CardStacked>
          ))}
        </Pile>
      </CardDroppable>
    )
  }

  if (pile.length === 0) {
    return <PileEmpty />;
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
