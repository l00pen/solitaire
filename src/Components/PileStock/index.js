import React from 'react';

import { Pile } from 'Components/Pile'
import { CardFaceDown, CardEmpty } from 'Components/Card';

const PileStock = ({ pile, onClick, reRunDeck }) => {
  let comp = <CardEmpty onClick={reRunDeck} />
  if (pile.length > 0) {
    comp = <CardFaceDown onClick={() => onClick({ card: pile[0] })} />
  }
  return (
    <Pile>
      {comp}
    </Pile>
  );
}

export default PileStock;
