const shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// const spades = {
//   id: 'spades',
//   suite: shuffleArray(['🂡','🂮','🂭','🂫','🂪','🂩','🂨','🂧','🂦','🂥','🂤','🂣','🂢']),
// };

// const hearts = {
//   id: 'hearts',
//   suite: shuffleArray(['🂱','🂾','🂽','🂻','🂺','🂹','🂸','🂷','🂶','🂵','🂴','🂳','🂲']),
// };

// const diamonds = {
//   id: 'diamonds',
//   suite: shuffleArray(['🃁','🃎','🃍','🃋','🃊','🃉','🃈','🃇','🃆','🃅','🃄','🃃','🃂']),
// };

const clubs = shuffleArray([
    { 
      label: '🃑',
      value: 1,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃞',
      value: 13,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃝',
      value: 12,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃛',
      value: 11,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃚',
      value: 10,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃙',
      value: 9,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃘',
      value: 8,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃗',
      value: 7,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃖',
      value: 6,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃕',
      value: 5,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃔',
      value: 4,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃓',
      value: 3,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    },
    { 
      label: '🃒',
      value: 2,
      suite: 'clubs',
      color: 'black',
      isFaceUp: false,
    }
  ]);

const deck = [clubs, clubs, clubs, clubs].flat();

export {
  shuffleArray,
  deck,
};
