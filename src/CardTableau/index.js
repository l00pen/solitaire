import React from 'react';

import { CardFaceUp, CardFaceDown } from '../Card';

import './styles.css';

const CardTableau = ({ label, suite, isFaceUp, onClick, ...props }) => {
  if (isFaceUp) {
    return <CardFaceUp suite={suite} label={label} onClick={onClick} {...props} />;
  }
  return <CardFaceDown />;
}

export default CardTableau;