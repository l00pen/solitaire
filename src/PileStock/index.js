import React from 'react';

import { CardFaceDown, CardEmpty } from '../Card';

import './styles.css';

const PileStock = ({ pile, onClick, reRunDeck }) => {
  if (pile.length === 0) {
    return <CardEmpty onClick={reRunDeck} />
  }
  return (
    <CardFaceDown onClick={() => onClick({ card: pile[0] })} />
  );
}

export default PileStock;
