import React, { useState } from 'react';

import { deck } from './utils/';
import CardTableau from './CardTableau';

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
  foundation: [
    [],
    [],
    [],
    [],
  ],
  tableau: [
    setLastIsFaceUp(deck.slice(0, 1)),
    setLastIsFaceUp(deck.slice(1, 3)),
    setLastIsFaceUp(deck.slice(3, 6)),
    setLastIsFaceUp(deck.slice(6, 10)),
    setLastIsFaceUp(deck.slice(10, 15)),
    setLastIsFaceUp(deck.slice(15, 21)),
    setLastIsFaceUp(deck.slice(21, 28)),
  ],
  stock: deck.slice(28),
  waste: [],
}

function App() {
  const [ game, setGame ] = useState(initGame);

  const tableauCardClickHandler = (card, cardIndex, pileIndex) => {
    if (pileIndex === 0) {
      return;
    }

    const firstPile = [...game.tableau[0]];
    const firstPileLastCard = firstPile[firstPile.length - 1];
    if (firstPileLastCard.color !== card.color && firstPileLastCard.value === card.value - 1) {
      const oldPile = [...game.tableau[pileIndex]];
      const movingPile = oldPile.splice(cardIndex, game.tableau.length);
      firstPile.push(...movingPile);
      oldPile[oldPile.length - 1] = {
        ...oldPile[oldPile.length - 1],
        isFaceUp: true,
      }

      const newTableau = [...game.tableau];
      newTableau[0] = firstPile;
      newTableau[pileIndex] = oldPile;
      setGame({
        ...game,
        tableau: newTableau
      })
    }
  }

  return (
    <div className="App App-header">
      <section className='Game-top'>
        <section className='Foundation'>
          {game.foundation.map((pile, pileIndex) => (
            <ul className={`Foundation-pile ${getEmptyClass(pile)}`} key={`foundation-${pileIndex}`}>
              {pile.map((card) => (
                <li className='App-card' key={card.id}>
                  <CardTableau {...card} />
                </li>
              ))}
            </ul>
          ))}
        </section>
        <div className='Game-stockAndWaste'>
          <section className='Waste'>
            <ul className={`Waste-pile ${getEmptyClass(game.waste)}`}>
              {game.waste.map((card) => (
                <li className='App-card Waste-card' key={card.id}>
                  <CardTableau {...card} />
                </li>
              ))}
            </ul>
          </section>
          <section className='Stock'>
            <ul className={`Stock-pile ${getEmptyClass(game.stock)}`}>
              {game.stock.map((card) => (
                <li className='App-card Stock-card' key={card.id}>
                  <CardTableau {...card} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
      <section className='Tableau'>
        {game.tableau.map((pile, pileIndex) => (
          <ul className={`Tableau-pile ${getEmptyClass(pile)}`} key={`tableau-${pileIndex}`}>
            {pile.map((card, cardIndex) => (
              <li className='Tableau-card' key={card.id + pileIndex}>
                <CardTableau {...card} onClick={() => { tableauCardClickHandler(card, cardIndex, pileIndex) } } />
              </li>
            ))}
          </ul>
        ))}
      </section>
    </div>
  );
}

export default App;
