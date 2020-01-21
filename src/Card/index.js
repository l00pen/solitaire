import React from 'react';
import styled from 'styled-components';

import './styles.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
  return images;
}

const images = importAll(require.context('./images/cards', false, /\.(png|jpe?g|svg)$/));

const CardAsListItem = styled.li``;

const CardFaceUp = ({ id, label, suite, onClick, ...props }) => {
  const newId = id.match(/[a-z]+|[^a-z]+/gi);
  const idSuite = newId[0].toUpperCase();
  let idValue = newId[1];
  if (idValue === '1') {
    idValue = 'A';
  }

  if (idValue === '13') {
    idValue = 'K';
  }

  if (idValue === '12') {
    idValue = 'Q';
  }

  if (idValue === '11') {
    idValue = 'J';
  }

  return(
    <div className={`Card Card-suite-${suite}`} onClick={onClick} {...props}>
      <img src={images[`${idValue}${idSuite}.png`]} alt='card background' />
    </div>
  )}

const CardFaceDown = ({ onClick }) => (
  <div className={`Card`} onClick={() => onClick ? onClick() : null}>
    <img src={images['green_back.png']} alt='card background' />
  </div>
);

const CardEmpty = () => (
  <div className={`Card`}>
    <img src={images['purple_back.png']} alt='card background' />
  </div>
);

export {
  CardFaceUp,
  CardFaceDown,
  CardEmpty,
  CardAsListItem
};
