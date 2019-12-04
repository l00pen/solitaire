import React from 'react';

import CardTableau from '../CardTableau';

import './styles.css';

const getEmptyClass = (list) => {
  return list.length === 0 ? 'empty' : '';
};

const PileWaste = ({ pile }) => {
  return (
    <ul className={`Waste-pile ${getEmptyClass(pile)}`}>
      {pile.map((card) => {
        return (
          <li className='App-card Waste-card' key={card.id}>
            <CardTableau {...card} />
          </li>
        )
      })}
    </ul>
  );
}

export default PileWaste;