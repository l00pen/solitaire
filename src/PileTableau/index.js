import React from 'react';

import CardTableau from '../CardTableau';
import Pile, { PileEmpty } from '../Pile';
// import { CardAsListItem } from '../Card';

import './styles.css';

const PileTableau = ({ pile, pileKey, allowDrop, onDropTableau, onDragStart }) => {
  if (pile.length === 0) {
    return (
      <PileEmpty
        onDrop={(event) => onDropTableau(event, { card: {}, cardIndex: 0, destinationPile: pileKey })}
        onDragOver={allowDrop}
      />
    )
  }
  return (
    <Pile>
      {pile.map((card, cardIndex) => {
        return (
          <li
            key={card.id + pileKey}
            onDrop={(event) => onDropTableau(event, { card, cardIndex, destinationPile: pileKey })}
            onDragOver={allowDrop}
            style={{
              position: 'absolute',
              width: '50px',
              top: `${cardIndex * 10}px`,
            }}
          >
            <CardTableau
              {...card}
              onDragStart={(event) => onDragStart(event, {
                card,
                cardIndexInPile: cardIndex,
                sourcePile: pileKey
              })}
              draggable={!!card.isFaceUp}
            />
          </li>
        );
      })}
    </Pile>
  );
}

export default PileTableau;
