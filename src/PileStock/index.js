import React from 'react';

import { CardFaceDown } from '../Card';
import Pile, { PileEmpty, PileStack } from '../Pile';
import { Card, CardStacked } from '../Card';

import './styles.css';

const PileStock = ({ pile, onClick, reRunDeck }) => {
  if (pile.length === 0) {
    return <PileEmpty onClick={reRunDeck} />
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => (
        // cardIndex === 0 ? (
        //   <CardFaceDown onClick={() => onClick({ card })} />
        // ) : (
          <CardStacked key={card.key}>
            <CardFaceDown onClick={() => onClick({ card })} />
          </CardStacked>
        // )
      ))}
    </Pile>
  );
}

export default PileStock;
