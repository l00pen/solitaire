import { createSelector } from 'reselect';

const getDices = (state) => {
  return state.dices
};

const getProtocol = (state) => {
  return state.protocol
};

const getCurrentRoundCombination = createSelector(
  [getDices],
  (dices) => {
    const cb = [0, 0, 0, 0, 0, 0];
    dices.forEach(({ value }) => {
      ++cb[value];
    });
    return cb;
  }
);

const getBonus = createSelector([getProtocol], (protocol, state) => {
  let total = 0;
  let isUsed = false;
  const UPPER_SECTION = [
    'ones',
    'twos',
    'threes',
    'fours',
    'fives',
    'sixes',
  ];

  const currentTotal = UPPER_SECTION.reduce((mem, key) => {
    return mem + protocol[key].total;
  }, 0);

  const allUpperHaveBeenUsed = UPPER_SECTION.reduce((mem, key) => {
    return mem && protocol[key].isUsed;
  }, true);

  if (currentTotal >= 63 ) {
    total = 50;
  }

  if (allUpperHaveBeenUsed) {
    isUsed = true;
  }

  return {
    label: 'bonus',
    isUsed,
    isValid: false,
    total,
    currentSum: 0,
  };
})


const getCurrentProtocol = createSelector([getCurrentRoundCombination, getBonus, getProtocol], (combintationHelper, bonus, state) => {
  return Object.keys(state).map(key => {
    if (key === 'bonus') {
      return bonus;
    };
    const item = state[key];
    if (!item.used) {
      return {
        ...item,
        label: key,
        isValid: item.valid(combintationHelper),
        currentSum: item.sum(combintationHelper),
      };
    }
    return {
      ...item,
      label: key,
    };
  })
});

const getTotal = createSelector([getCurrentProtocol], (state) => {
  return state.reduce((sum, currentItem) => {
    return sum + currentItem.total;
  }, 0);
});

const getIsGameFinished = createSelector([getCurrentProtocol], (protocol) => {
  return protocol.reduce((mem, { isUsed }) => {
    return mem && isUsed;
  }, true);
});

export {
  getCurrentRoundCombination,
  getCurrentProtocol,
  getTotal,
  getBonus,
  getIsGameFinished,
}
