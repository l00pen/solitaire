import React from 'react';

import { CardFaceUp } from '../Card';
import { CardDraggable, CardEmpty } from '../Card';

const PileWaste = ({ pile, onClick }) => {
  if (pile.length === 0) {
    return <CardEmpty />
  }

  const cardIndexInPile = pile.length - 1;
  const card = pile[cardIndexInPile]
  const clickAndDragData = { card, cardIndexInPile: cardIndexInPile, sourcePile: 'waste' };
  return (
    <CardDraggable
      key={card.id}
      data={clickAndDragData}
      draggable={!!card.isFaceUp}
    >
      <CardFaceUp onClick={() => onClick(clickAndDragData)} {...card} />
    </CardDraggable>
  );
}

export default PileWaste;
