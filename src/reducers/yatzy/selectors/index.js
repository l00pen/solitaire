import { createSelector } from 'reselect';

const getDices = (state) => {
  return state.dices
};

const getProtocol = (state) => {
  return state.protocol;
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

const getTotal = createSelector([getProtocol], (protocol) => {
  return protocol.reduce((mem, { total }) => {
    return mem + total;
  }, 0);
});

const getIsGameFinished = createSelector([getProtocol], (protocol) => {
  return protocol.reduce((mem, { id, isUsed }) => {
    return mem && isUsed;
  }, true);
});

export {
  getProtocol,
  getCurrentRoundCombination,
  getTotal,
  getIsGameFinished,
}
