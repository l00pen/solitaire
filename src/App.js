import React, { useState } from 'react';

import { deck } from './utils/';
import CardTableau from './CardTableau';
import PileWaste from './PileWaste';
import PileStock from './PileStock';
import PileFoundation from './PileFoundation';
import PileTableau from './PileTableau';

import './App.css';

const getEmptyClass = (list) => {
  return list.length === 0 ? 'empty' : '';
};

const getLastCardInPile = (cards) => {
  const reverseCards = [...cards];
  const [last, ...rest] = reverseCards.reverse();
  return last;
} 

const setLastIsFaceUp = (cards) => {
  if (cards.length === 0) {
    return cards;
  }

  const reverseCards = [...cards];
  const [last, ...allCards] = reverseCards.reverse();

  return [
    ...allCards,
    {
      ...last,
      isFaceUp: true,
    }
  ];
}

const initGame = {
  foundation0: [],
  foundation1: [],
  foundation2: [],
  foundation3: [],
  tableau0: setLastIsFaceUp(deck.slice(0, 1)),
  tableau1: setLastIsFaceUp(deck.slice(1, 3)),
  tableau2: setLastIsFaceUp(deck.slice(3, 6)),
  tableau3: setLastIsFaceUp(deck.slice(6, 10)),
  tableau4: setLastIsFaceUp(deck.slice(10, 15)),
  tableau5: setLastIsFaceUp(deck.slice(15, 21)),
  tableau6: setLastIsFaceUp(deck.slice(21, 28)),
  stock: deck.slice(28),
  waste: [],
}

function App() {
  const [ game, setGame ] = useState(initGame);
  const tableauPilesKeys = Object.keys(game).filter(entry => RegExp('tableau').test(entry));
  const foundationPilesKeys = Object.keys(game).filter(entry => RegExp('foundation').test(entry));

  const moveToPile = (cards, pileType) => {
    const newPile = [...game[pileType]].concat(cards);
    return newPile;
  }

  const moveFromPile = (cardSourceIndex, pileType) => {
    const newPile = [...game[pileType]];
    newPile.splice(cardSourceIndex, newPile.length);
    if (newPile.length > 0 && newPile[cardSourceIndex - 1].isFaceUp) {
      return newPile;
    }
    return setLastIsFaceUp(newPile);
  }

  const grabCardsToBeMoved = (cardSourceIndex, pileType) => {
    return game[pileType].slice(cardSourceIndex, game[pileType].length);
  }

  const allowDropTableau = (cardsToBeMoved, destCardIndex, destinationPile, destCard) => {
    if (game[destinationPile].length === 0) {
      return true;
    }

    const firstCardToBeMoved = cardsToBeMoved[0];
    const lastCardInPile = destCardIndex === game[destinationPile].length - 1;
    const isOppositeColor = destCard.color !== firstCardToBeMoved.color;
    const isRightValue = destCard.value === firstCardToBeMoved.value + 1;

    return destCard.isFaceUp && lastCardInPile && isOppositeColor && isRightValue;
  };

  const onDropTableau = (ev, { card: destCard, cardIndex: destCardIndex, destinationPile }) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("pip");
    const {
      cardIndexInPile,
      sourcePile,
    } = JSON.parse(data);
    
    const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, sourcePile);

    if (allowDropTableau(cardsToBeMoved, destCardIndex, destinationPile, destCard)) {
      const newDestination = moveToPile(cardsToBeMoved, destinationPile);
      const newSource = moveFromPile(cardIndexInPile, sourcePile);
      setGame({
        ...game,
        [destinationPile]: newDestination,
        [sourcePile]: newSource,
      })
    }
  }

  const allowFoundationDrop = (cardsToBeMoved, destPile) => {
    const cardToBeMoved = cardsToBeMoved[0];

    if (cardsToBeMoved.length > 1) {
      return false;
    }

    if(cardToBeMoved.value === 1 && !destPile.length) {
      return true;
    }

    if (destPile.length) {
      const lastCardInPile = getLastCardInPile(destPile);

      const isSameSuite = lastCardInPile.suite === cardToBeMoved.suite;
      const isRightValue = lastCardInPile.value === (cardToBeMoved.value - 1);

      if(isSameSuite && isRightValue ) {
        return true;
      };
    }


    return false;
  }

  const onDropFoundation = (ev, { destinationPile }) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("pip");
    const {
      cardIndexInPile,
      sourcePile,
    } = JSON.parse(data);

    const destPile = game[destinationPile];
    const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, sourcePile);
    
    if (allowFoundationDrop(cardsToBeMoved, destPile)) {
      const newDestination = moveToPile(cardsToBeMoved, destinationPile);
      const newSource = moveFromPile(cardIndexInPile, sourcePile);
      setGame({
        ...game,
        [destinationPile]: newDestination,
        [sourcePile]: newSource,
      });
    }
  }

  const allowDrop = (ev) => {
    ev.preventDefault();
  }

  const onDragStart = (ev, { card, cardIndexInPile, sourcePile }) => {
    ev.dataTransfer.setData("pip", JSON.stringify({ card, cardIndexInPile, sourcePile }));
  }

  const onStockClickHandler = (ev, { card }) => {
    console.log('onStockClickHandler', card)
    const newCard = { ...card, isFaceUp: true };
    const newDestination = moveToPile([newCard], 'waste');
    const newSource = moveFromPile(game.stock.length - 1, 'stock');
  
    setGame({
      ...game,
      waste: newDestination,
      stock: newSource,
    });
  }

  return (
    <div className="Game">
        <section className='Game-top'>
          <section className='Game-Foundation'>
            {foundationPilesKeys.map((pileKey) => {
              const pile = game[pileKey];
              return (
                <PileFoundation
                  key={pileKey}
                  pile={pile}
                  pileId={pileKey}
                  onDropFoundation={onDropFoundation}
                  allowDrop={allowDrop}
                />
              )
            })}
          </section>
          <div className='Game-stockAndWaste'>
            <section className='Game-Waste'>
              <PileWaste
                pile={game.waste}
                onDragStart={onDragStart} 
              />
            </section>
            <section className='Game-Stock'>
              <PileStock
                onClick={onStockClickHandler}
                pile={game.stock}
              />
            </section>
          </div>
        </section>
        <section className='Game-Tableau'>
          {tableauPilesKeys.map((pileKey) => {
            const pile = game[pileKey];
            return (
              <PileTableau
                key={pileKey}
                pile={pile}
                pileKey={pileKey}
                allowDrop={allowDrop}
                onDropTableau={onDropTableau}
                onDragStart={onDragStart}
              />
            )
          })}
        </section>
    </div>
  );
}

export default App;
