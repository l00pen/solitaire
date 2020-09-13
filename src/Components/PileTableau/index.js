import React from 'react';
import styled from 'styled-components/macro';

import {Pile} from 'Components/Pile'
import PileContext from '../../Contexts/PileProvider';
import {
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardEmpty,
} from 'Components/Card';

const SubPile = styled.div`
  position: absolute;
  width: 100%;
  top: ${(props) => props.cardIndex === 0 ? 0 : props.containerWidth * 0.54}px;
`;

const renderPile = (list, cardIndex, pileKey, onDrop, onClick) => {
  if (list.length === 0) {
    return <CardEmpty />;
  }

  const [card, ...rest] = list;
  const dragAndDropData = { card, cardIndexInPile: cardIndex, sourcePile: pileKey };
  const cardList = rest.length > 0 ? renderPile(rest, cardIndex + 1, pileKey, onDrop, onClick) : null;
  return (
    <PileContext.Consumer>
      { value => (
        <SubPile cardIndex={cardIndex} containerWidth={value.width}>
          <CardDraggable
            data={dragAndDropData}
            draggable={!!card.isFaceUp}
          >
            <CardToggleFaceUp {...card} onClick={() => onClick(dragAndDropData)} />
            {cardList}
          </CardDraggable>
        </SubPile>)
      }
    </PileContext.Consumer>
  );
}

const PileTableau = ({ pile, pileKey, onDrop, onClick }) => {
  const lastCardInPile = pile.length > 0 ? pile[pile.length - 1] : {};
  const lastCardInPileIndex = pile.length > 0 ? pile.length - 1 : 0;

  const pileComponents = renderPile(pile, 0, pileKey, onDrop, onClick);

  return (
    <Pile pile={pile}>
      <CardDroppable
        data={{ card: lastCardInPile, cardIndex: lastCardInPileIndex, destinationPile: pileKey }}
        dropHandler={onDrop}
      >
        {pileComponents}
      </CardDroppable>
    </Pile>
  );
}

export default PileTableau;
