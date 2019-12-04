import React, { useState } from 'react';

import { deck } from './utils/';

import './App.css';

const cardBack = '🂠';

// const CardWaste
// const CardStock
// const CardFoundation

const Card = ({ label, suite }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  if (isVisible) {
    return <div className={`Card Card-suite-${suite}`} onClick={toggleVisibility}>{label}</div>;
  }
  return <div className={`Card`} onClick={toggleVisibility}>{cardBack}</div>;
}

const game = {
  foundation: [
    [],
    [],
    [],
    [],
  ],
  tableau: [
    deck.slice(0, 1),
    deck.slice(1, 3),
    deck.slice(3, 6),
    deck.slice(6, 10),
    deck.slice(10, 15),
    deck.slice(15, 21),
    deck.slice(21, 28),
  ],
  stock: deck.slice(28),
  waste: [],
}

function App() {
  return (
    <div className="App App-header">
      <section className='Game-top'>
        <section className='Foundation'>
          {game.foundation.map((pile) => (
            <ul className={`Foundation-pile ${pile.length === 0 ? 'empty' : ''}`}>
              {pile.map((card) => (
                <li className='App-card' key={card.value}>
                  <Card {...card} />
                </li>
              ))}
            </ul>
          ))}
        </section>
        <div className='Game-stockAndWaste'>
          <section className='Waste'>
            <ul className={`Waste-pile ${game.waste.length === 0 ? 'empty' : ''}`}>
              {game.waste.map((card) => (
                <li className='App-card Waste-card' key={card.value}>
                  <Card {...card} />
                </li>
              ))}
            </ul>
          </section>
          <section className='Stock'>
            <ul className={`Stock-pile ${game.stock.length === 0 ? 'empty' : ''}`}>
              {game.stock.map((card) => (
                <li className='App-card Stock-card' key={card.value}>
                  <Card {...card} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>
      <section className='Tableau'>
        {game.tableau.map((pile) => (
          <ul className={`Tableau-pile ${pile.length === 0 ? 'empty' : ''}`}>
            {pile.map((card) => (
              <li className='App-card' key={card.value}>
                <Card {...card} />
              </li>
            ))}
          </ul>
        ))}
      </section>
    </div>
  );
}

export default App;
