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

const spades = [
{ 
  id: 's1',
  label: '🂡',
  value: 1,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's13',
  label: '🂮',
  value: 13,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's12',
  label: '🂭',
  value: 12,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's11',
  label: '🂫',
  value: 11,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's10',
  label: '🂪',
  value: 10,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's9',
  label: '🂩',
  value: 9,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's8',
  label: '🂨',
  value: 8,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's7',
  label: '🂧',
  value: 7,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's6',
  label: '🂦',
  value: 6,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's5',
  label: '🂥',
  value: 5,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's4',
  label: '🂤',
  value: 4,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's3',
  label: '🂣',
  value: 3,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
{ 
  id: 's2',
  label: '🂢',
  value: 2,
  suite: 'spades',
  color: 'black',
  isFaceUp: false,
},
];

const hearts = [
  {
    id: 'h1',
    label: '🂱',
    value: 1,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h13',
    label: '🂾',
    value: 13,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h12',
    label: '🂽',
    value: 12,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h11',
    label: '🂻',
    value: 11,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h10',
    label: '🂺',
    value: 10,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h9',
    label: '🂹',
    value: 9,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h8',
    label: '🂸',
    value: 8,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h7',
    label: '🂷',
    value: 7,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h6',
    label: '🂶',
    value: 6,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h5',
    label: '🂵',
    value: 5,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h4',
    label: '🂴',
    value: 4,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h3',
    label: '🂳',
    value: 3,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
  {
    id: 'h2',
    label: '🂲',
    value: 2,
    suite: 'hearts',
    color: 'red',
    isFaceUp: false,
  },
];

const diamonds = [
  { 
    id: 'd1',
    label: '🃁',
    value: 1,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd13',
    label: '🃎',
    value: 13,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd12',
    label: '🃍',
    value: 12,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd11',
    label: '🃋',
    value: 11,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd10',
    label: '🃊',
    value: 10,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd9',
    label: '🃉',
    value: 9,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd8',
    label: '🃈',
    value: 8,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd7',
    label: '🃇',
    value: 7,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd6',
    label: '🃆',
    value: 6,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd5',
    label: '🃅',
    value: 5,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd4',
    label: '🃄',
    value: 4,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd3',
    label: '🃃',
    value: 3,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
  { 
    id: 'd2',
    label: '🃂',
    value: 2,
    suite: 'diamonds',
    color: 'red',
    isFaceUp: false,
  },
];

const clubs = [
  { 
    id: 'c1',
    label: '🃑',
    value: 1,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c13',
    label: '🃞',
    value: 13,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c12',
    label: '🃝',
    value: 12,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c11',
    label: '🃛',
    value: 11,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c10',
    label: '🃚',
    value: 10,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c9',
    label: '🃙',
    value: 9,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c8',
    label: '🃘',
    value: 8,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c7',
    label: '🃗',
    value: 7,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c6',
    label: '🃖',
    value: 6,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c5',
    label: '🃕',
    value: 5,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c4',
    label: '🃔',
    value: 4,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c3',
    label: '🃓',
    value: 3,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  },
  { 
    id: 'c2',
    label: '🃒',
    value: 2,
    suite: 'clubs',
    color: 'black',
    isFaceUp: false,
  }
];

const setLastIsFaceUp = (cards) => {
  if (cards.length === 0) {
    return cards;
  }

  const reverseCards = [...cards];
  const [last, ...allCards] = reverseCards.reverse();

  return [
    ...allCards,
    setFaceIsUp(last),
  ];
}

const setFaceIsUp = (card) => {
  return {
    ...card,
    isFaceUp: true,
  }
}

const moveToPile = (cards, pile) => {
  const newPile = [...pile].concat(cards);
  return newPile;
}

const moveFromPile = (cardSourceIndex, pile) => {
  const newPile = [...pile];
  newPile.splice(cardSourceIndex, newPile.length);
  if (newPile.length > 0 && newPile[cardSourceIndex - 1].isFaceUp) {
    return newPile;
  }
  return setLastIsFaceUp(newPile);
}

const grabCardsToBeMoved = (cardSourceIndex, pile) => {
  return pile.slice(cardSourceIndex, pile.length);
}

const getLastCardInPile = (cards) => {
  const reverseCards = [...cards];
  const [last, ] = reverseCards.reverse();
  return last;
}

const deck = shuffleArray([clubs, diamonds, hearts, spades].flat());

export {
  shuffleArray,
  deck,
  clubs,
  spades,
  diamonds,
  hearts,
  setLastIsFaceUp,
  moveToPile,
  moveFromPile,
  grabCardsToBeMoved,
  getLastCardInPile,
  setFaceIsUp,
};
