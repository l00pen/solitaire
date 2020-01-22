import React from 'react';

import { CardFaceDown } from '../Card';
import Pile, { PileEmpty } from '../Pile';
import { CardStacked } from '../Card';

import './styles.css';

const PileStock = ({ pile, onClick }) => {
  if (pile.length === 0) {
    return <PileEmpty />
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => (
        <CardStacked key={card.id}>
          <CardFaceDown {...card} onClick={(event) => onClick(event, { card })} />
        </CardStacked>
      ))}
    </Pile>
  );
}

export default PileStock;
