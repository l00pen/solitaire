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

const getBonus = createSelector([getProtocol], (protocol) => {
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

  isUsed = UPPER_SECTION.reduce((mem, key) => {
    return mem && protocol[key].isUsed;
  }, true);

  if (currentTotal >= 63 ) {
    total = 50;
  }

  return {
    label: 'bonus',
    isUsed,
    isValid: false,
    total,
    currentSum: 0,
  };
})

const getYatzyBonus = createSelector([getProtocol], (protocol) => {
  console.log(protocol)
  const hasYatzy = protocol.yatzy.total > 0;

  return {
    label: 'bonus',
    isUsed: hasYatzy,
    isValid: false,
    total: hasYatzy ? 50 : 0,
    currentSum: 0,
  };
});


const getCurrentProtocol = createSelector([getCurrentRoundCombination, getBonus, getYatzyBonus, getProtocol], (combintationHelper, bonus, yatzyBonus, protocol) => {
  return Object.keys(protocol).map(key => {
    if (key === 'bonus') {
      return bonus;
    };
    if (key === 'yatzyBonus') {
      return yatzyBonus;
    };
    const item = protocol[key];
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
