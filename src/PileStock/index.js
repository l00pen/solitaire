import React from 'react';

import { CardFaceDown } from '../Card';
import Pile, { PileEmpty } from '../Pile';

import './styles.css';

const PileStock = ({ pile, onClick }) => {
  if (pile.length === 0) {
    return <PileEmpty />
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => (
        <li className='Stock-card' key={card.id}>
          <CardFaceDown {...card} onClick={(event) => onClick(event, { card })} />
        </li>
      ))}
    </Pile>
  );
}

export default PileStock;
