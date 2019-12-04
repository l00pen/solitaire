import React from 'react';

import { CardFaceUp, CardFaceDown } from '../Card';

import './styles.css';

const CardTableau = ({ label, suite, isFaceUp, onClick }) => {
  if (isFaceUp) {
    return <CardFaceUp suite={suite} label={label} onClick={onClick} />;
  }
  return <CardFaceDown />;
}

export default CardTableau;