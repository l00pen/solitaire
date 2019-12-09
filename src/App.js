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
  foundation: [
    [],
    [],
    [],
    [],
  ],
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

  const stockPileCardClickHandler = (cardIndex) => {
    const newStock = [...game.stock];
    const newWaste = [...game.waste];

    if (cardIndex === newStock.length - 1) {
      const wasteCard = newStock.splice(cardIndex, 1);
      newWaste.push({
        ...wasteCard[0],
        isFaceUp: true,
      });

      setGame({
        ...game,
        waste: newWaste,
        stock: newStock,
      })
    }
  }

  const moveToPile = (card, pileType) => {
    console.log(card, pileType)
    switch(pileType) {
      case 'foundation':
        console.log('not fixed')
        return [];
      default:
        const newPile = [...game[pileType]];
        newPile.push(card);
        return newPile;
    }
  }

  const moveFromPile = (cardSourceIndex, pileType) => {
    switch(pileType) {
      case 'foundation':
        console.log('not fixed')
        return [];
      default:
        const newPile = [...game[pileType]];
        newPile.splice(cardSourceIndex);
        return newPile;
    }
  }

  // const getCardFromSource = (cardSourceIndex, type, id) => {
  //   switch(type) {
  //     case 'tableau':
  //     case 'foundation':
  //       return game[type][id].findIndex(sC => sC.id === cardSourceIndex);
  //     default:
  //       return game[type].findIndex(sC => sC.id === cardSourceIndex);
  //   }
  // }

  // const getCardIndexFromSource = (cardSourceIndex, type, id) => {
  //   switch(type) {
  //     case 'tableau':
  //     case 'foundation':
  //       return game[type][id].find(sC => sC.id === cardSourceIndex);
  //     default:
  //       return game[type].find(sC => sC.id === cardSourceIndex);
  //   }
  // }

  const onDrop = (ev, { destinationPile }) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const {
      card,
      cardIndexInPile,
      sourcePile,
    } = JSON.parse(data);
    
    const newDestination = moveToPile(card, destinationPile);
    const newSource = moveFromPile(cardIndexInPile, sourcePile);

    setGame({
      ...game,
      [destinationPile]: newDestination,
      [sourcePile]: newSource,
    })
  }

  const allowDrop = (ev) => {
    console.log('allowDrop')
    ev.preventDefault();
  }

  const onDragStart = (ev, { card, cardIndexInPile, sourcePile }) => {
    ev.dataTransfer.setData("text/plain", JSON.stringify({ card, cardIndexInPile, sourcePile }));
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
              <PileWaste pile={game.waste} />
            </section>
            <section className='Stock'>
              <ul className={`Stock-pile ${getEmptyClass(game.stock)}`}>
                {game.stock.map((card, cardIndex) => (
                  <li className='App-card Stock-card' key={card.id}>
                    <CardFaceDown {...card} onClick={() => { stockPileCardClickHandler(cardIndex) }} />
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
                  if (cardIndex === pile.length - 1) {
                    return (
                      <li
                        className='Tableau-card'
                        key={card.id + pileKey}
                        onDrop={(event) => onDrop(event, { destinationPile: pileKey })}
                        onDragOver={allowDrop}
                      >
                        <CardTableau
                          {...card}
                          // onClick={() => { tableauCardClickHandler(card, cardIndex, pileIndex) } }
                          onDragStart={(event) => onDragStart(event, {
                            card,
                            cardIndexInPile: cardIndex,
                            sourcePile: pileKey
                          })}
                          draggable="true"
                        />
                      </li>
                    );
                  }
                  return (
                    <li className='Tableau-card' key={card.id + pileKey}>
                      <CardTableau {...card} onClick={() => { tableauCardClickHandler(card, cardIndex, pileKey) } } />
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </section>
    </div>
  );
}

export default App;
