import React from 'react';

import { CardFaceUp } from '../Card';
import Pile from '../Pile';
import { CardStacked, CardDraggable, CardEmpty } from '../Card';

import './styles.css';

const PileWaste = ({ pile, onClick }) => {
  if (pile.length === 0) {
    return <CardEmpty />
  }
  return (
    <Pile>
      {pile.map((card, i) => {
        const clickAndDragData = { card, cardIndexInPile: i, sourcePile: 'waste' };
        return (
          <CardDraggable
            key={card.id}
            data={clickAndDragData}
            draggable={!!card.isFaceUp}
          >
            <CardStacked>
              <CardFaceUp id={card.id} label={card.label} suite={card.suite} onClick={() => onClick(clickAndDragData)} />
            </CardStacked>
          </CardDraggable>
        );
      })}
    </Pile>
  );
}

export default PileWaste;
