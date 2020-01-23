import React from 'react';

import { CardFaceDown } from '../Card';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked } from '../Card';

import './styles.css';

const PileStock = ({ pile, onClick, reRunDeck }) => {
  if (pile.length === 0) {
    return <PileEmpty onClick={reRunDeck} />
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => (
        <CardStacked key={card.id}>
          <CardFaceDown onClick={() => onClick({ card })} />
        </CardStacked>
      ))}
    </Pile>
  );
}

export default PileStock;
