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

const UPPER_SECTION = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

const getBonus = createSelector([getProtocol], (protocol) => {
  let total = 0;
  let isUsed = false;

  const currentTotal = Object.values(protocol).reduce((mem, item) => {
    if (UPPER_SECTION.includes(item.id)) {
      return mem + item.total;
    }
    return mem;
  }, 0);

  isUsed =  Object.values(protocol).reduce((mem, item) => {
    if (UPPER_SECTION.includes(item.id)) {
      return mem && item.isUsed;
    }
    return mem;
  }, true);

  if (currentTotal >= 63 ) {
    total = 50;
  }

  return {
    ...protocol.bonusForUpper,
    isUsed,
    total,
  };
})

const getYatzyBonus = createSelector([getProtocol], (protocol) => {
  const hasYatzy = protocol.yatzy.total > 0;
  return {
    ...protocol.yatzyBonus,
    isUsed: protocol.yatzy.isUsed,
    total: hasYatzy ? 50 : 0,
  };
});


const getCurrentProtocol = createSelector([getProtocol, getBonus, getYatzyBonus], (protocol, bonus, yatzyBonus) => {
  return {
    ...protocol,
    bonusForUpper: bonus,
    yatzyBonus,
  }
});

const getIsGameFinished = createSelector([getCurrentProtocol], (protocol) => {
  const { total, ...protocolRest} = protocol;
  return Object.values(protocolRest).reduce((mem, { id, isUsed }) => {
    return mem && isUsed;
  }, true);
});

export {
  getProtocol,
  getCurrentProtocol,
  getCurrentRoundCombination,
  getBonus,
  getIsGameFinished,
}
