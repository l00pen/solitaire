import React from 'react';
import './App.css';

const spades = {
  id: 'spades',
  suite: ['🂡','🂮','🂭','🂫','🂪','🂩','🂨','🂧','🂦','🂥','🂤','🂣','🂢'],
};

const hearts = {
  id: 'hearts',
  suite: ['🂱','🂾','🂽','🂻','🂺','🂹','🂸','🂷','🂶','🂵','🂴','🂳','🂲'],
};

const diamonds = {
  id: 'diamonds',
  suite: ['🃁','🃎','🃍','🃋','🃊','🃉','🃈','🃇','🃆','🃅','🃄','🃃','🃂'],
};

const clubs = {
  id: 'clubs',
  suite: ['🃑', '🃞', '🃝', '🃛', '🃚', '🃙', '🃘', '🃗', '🃖', '🃕', '🃔', '🃓', '🃒'],
};


const deck = [spades, hearts, diamonds, clubs];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {deck.map(({id, suite}) => (
          <ul key={id} className={`App-suite App-suite-${id}`}>
            {suite.map((card) => (
              <li className='App-card' key={card}>{card}</li>
            ))}
          </ul>
        ))}
      </header>
    </div>
  );
}

export default App;
