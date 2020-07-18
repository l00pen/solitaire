const getRandomFaceValue = () => {
 return Math.floor(Math.random() * 6);
}

const rollDice = (dices) => {
  return dices.map((dice) => ({
    ...dice,
    value: dice.shouldReRoll ? getRandomFaceValue() : dice.value,
  }))
}

const toggleDiceRoll = (dices, id) => {
  return dices.map(dice => {
    if (dice.id === id) {
      return {...dice, shouldReRoll: !dice.shouldReRoll};
    }
    return dice;
  })
}

const initialDiceState = [
  { id: 1, shouldReRoll: true, value: 0 },
  { id: 2, shouldReRoll: true, value: 0 },
  { id: 3, shouldReRoll: true, value: 0 },
  { id: 4, shouldReRoll: true, value: 0 },
  { id: 5, shouldReRoll: true, value: 0 },
];

const dices = (state = rollDice(initialDiceState), action) => {
  switch(action.type) {
    case 'NEW_USER':
    case 'YATZY_NEW_GAME':
      return rollDice(initialDiceState);
    case 'YATZY_ROLL_DICES':
      return rollDice(state)
    case 'YATZY_TOGGLE_DICE':
      return toggleDiceRoll(state, action.data.id);
    case 'YATZY_SET_PROTOCOL_ITEM_SUM':
      return rollDice(initialDiceState);
    default:
      return state;
  }
  return state;
}

export default dices;