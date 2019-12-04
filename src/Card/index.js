import React from 'react';

import './styles.css';

const cardBack = '🂠';

const CardFaceUp = ({ label, suite, onClick }) => (
  <div className={`Card Card-suite-${suite}`} onClick={onClick}>
    {label}
  </div>
)

const CardFaceDown = ({ onClick }) => (
  <div className={`Card`} onClick={() => onClick ? onClick() : null}>
    {cardBack}
  </div>
);

export {
  CardFaceUp,
  CardFaceDown
};
