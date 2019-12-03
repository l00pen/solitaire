import React, { useState } from 'react';
import './App.css';

const cardBack = '🂠';

const Card = ({ value, suite }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  if (isVisible) {
    return <div className={`Card Card-suite-${suite}`} onClick={toggleVisibility}>{value}</div>;
  }
  return <div className={`Card`} onClick={toggleVisibility}>{cardBack}</div>;
}

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
          <ul key={id} className={`App-suite`}>
            {suite.map((card) => (
              <li className='App-card' key={card}>
                <Card
                  value={card}
                  suite={id}
                />
              </li>
            ))}
          </ul>
        ))}
      </header>
    </div>
  );
}

export default App;
