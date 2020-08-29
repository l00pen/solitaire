import React from 'react';

import { Pile } from '../StyledComponents/Pile'
import { CardFaceUp } from 'Components/Card';
import { CardDraggable, CardEmpty } from 'Components/Card';

const PileWaste = ({ pile, onClick }) => {
  let comp = <CardEmpty />
  if (pile.length > 0) {
    const cardIndexInPile = pile.length - 1;
    const card = pile[cardIndexInPile]
    const clickAndDragData = { card, cardIndexInPile: cardIndexInPile, sourcePile: 'waste' };
    comp = (
      <CardDraggable
        key={card.id}
        data={clickAndDragData}
        draggable={!!card.isFaceUp}
      >
        <CardFaceUp onClick={() => onClick(clickAndDragData)} {...card} />
      </CardDraggable>
    );
  }

  return (
    <Pile>
      {comp}
    </Pile>
  );
}

export default PileWaste;
