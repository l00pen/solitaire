import React, { useState } from 'react';

import { deck } from './utils/';
import CardTableau from './CardTableau';
import { CardFaceDown } from './Card';
import PileWaste from './PileWaste';

import './App.css';

// const CardWaste
// const CardStock
// const CardFoundation

const getEmptyClass = (list) => {
  return list.length === 0 ? 'empty' : '';
}; 

const setLastIsFaceUp = (cards) => {
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
    console.log('moveToPile', cards, pileType)
    const newPile = [...game[pileType]].concat(cards);
    return newPile;
  }

  const moveFromPile = (cardSourceIndex, pileType) => {
    const newPile = [...game[pileType]];
    newPile.splice(cardSourceIndex, newPile.length);
    return newPile.map((card, index) => {
      if (index === newPile.length - 1) {
        return {
          ...card,
          isFaceUp: true,
        }
      }
      return card;
    });
  }

  const grabCardsToBeMoved = (cardSourceIndex, pileType) => {
    return game[pileType].slice(cardSourceIndex, game[pileType].length);
  }

  const onDrop = (ev, { card: destCard, cardIndex: destCardIndex, destinationPile }) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("pip");
    const {
      cardIndexInPile,
      sourcePile,
    } = JSON.parse(data);
    
    const cardsToBeMoved = grabCardsToBeMoved(cardIndexInPile, sourcePile);

    const firstCardToBeMoved = cardsToBeMoved[0];
    const lastCardInPile = destCardIndex === game[destinationPile].length - 1;
    const isOppositeColor = destCard.color !== firstCardToBeMoved.color;
    const isRightValue = destCard.value === firstCardToBeMoved.value + 1;

    if (destCard.isFaceUp && lastCardInPile && isOppositeColor && isRightValue) {
      const newDestination = moveToPile(cardsToBeMoved, destinationPile);
      const newSource = moveFromPile(cardIndexInPile, sourcePile);
    
      setGame({
        ...game,
        [destinationPile]: newDestination,
        [sourcePile]: newSource,
      })
    }
  }

  const allowDropTableau = (ev, card, cardIndex, pile) => {
    ev.preventDefault();
  }

  const onDragStart = (ev, { card, cardIndexInPile, sourcePile }) => {
    ev.dataTransfer.setData("pip", JSON.stringify({ card, cardIndexInPile, sourcePile }));
  }

  return (
    <div className="App App-header">
        <section className='Game-top'>
          <section className='Foundation'>
            {foundationPilesKeys.map((pileKey) => {
              const pile = game[pileKey];
              return (
                <ul className={`Foundation-pile ${getEmptyClass(pile)}`} key={`foundation-${pileKey}`}>
                  {pile.map((card) => (
                    <li className='App-card' key={card.id}>
                      <CardTableau {...card} />
                    </li>
                  ))}
                </ul>
              )
            })}
          </section>
          <div className='Game-stockAndWaste'>
            <section className='Waste'>
              <PileWaste pile={game.waste} />
            </section>
            <section className='Stock'>
              <ul className={`Stock-pile ${getEmptyClass(game.stock)}`}>
                {game.stock.map((card, cardIndex) => (
                  <li className='App-card Stock-card' key={card.id}>
                    <CardFaceDown {...card} onClick={() => { }} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
        <section className='Tableau'>
          {tableauPilesKeys.map((pileKey) => {
            const pile = game[pileKey];
            return (
              <ul className={`Tableau-pile ${getEmptyClass(pile)}`} key={pileKey}>
                {pile.map((card, cardIndex) => {
                  return (
                    <li
                      className='Tableau-card'
                      key={card.id + pileKey}
                      onDrop={(event) => onDrop(event, { card, cardIndex, destinationPile: pileKey })}
                      onDragOver={(event) => allowDropTableau(event, card, cardIndex, pile)}
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
              </ul>
            )
          })}
        </section>
    </div>
  );
}

export default App;
