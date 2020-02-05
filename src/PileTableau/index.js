import React from 'react';

import Pile from '../Pile';
import { CardFan, CardDroppable, CardDraggable, CardToggleFaceUp, CardEmpty } from '../Card';

import { cardFanOffset } from '../styleVariables.js'

const PileTableau = ({ pile, pileKey, minHeight, onDrop, onClick }) => {
  
  const createRecursiveList = (list, cardIndex) => {
    const [card, ...rest] = list;
    if (rest.length === 0 && card) {
      console.log('hej hej hej', card, rest, cardIndex)
      return (
        <CardDroppable
          key={card.key + pileKey}
          data={{ destinationPile: pileKey }}
          dropHandler={onDrop}
        >
          <CardFan cardIndex={cardIndex}>
            <CardDraggable
              data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
              draggable={!!card.isFaceUp /* TODO move to reducers isDraggable function */}
            >
              <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
            </CardDraggable>
          </CardFan>
        </CardDroppable>
      );
    }

    const tmp =  (
      <CardDraggable
        data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
        draggable={!!card.isFaceUp /* TODO move to reducers isDraggable function */}
      >
        <CardDroppable
          key={card.key + pileKey}
          data={{ destinationPile: pileKey }}
          dropHandler={onDrop}
        >
          <CardFan cardIndex={cardIndex}>
            <CardDraggable
              data={{ card, cardIndexInPile: cardIndex, sourcePile: pileKey }}
              draggable={!!card.isFaceUp /* TODO move to reducers isDraggable function */}
            >
              <CardToggleFaceUp {...card} onClick={() => onClick({ card, cardIndexInPile: cardIndex, sourcePile: pileKey })} />
            </CardDraggable>
          </CardFan>
        </CardDroppable>
        {createRecursiveList(rest, cardIndex + 1)}
      </CardDraggable>
    );

    console.log(tmp)
    return tmp;
  }

  if (pile.length === 0) {
    return (
      <CardDroppable
        data={{ card: {}, cardIndex: 0, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        <CardEmpty />
      </CardDroppable>
    )
  }

  const result = createRecursiveList(pile, 0);
  console.log(result)
  debugger
  return (
    <Pile minHeight={cardFanOffset * minHeight + 125}>
      {result}
    </Pile>
  );
}

export default PileTableau;
