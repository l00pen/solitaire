const getProtocolItem = (id, label) => {
  return {
    id,
    label,
    total: 0,
    isUsed: false,
    selectable: false,
    valid: () => false,
    sum: () => 0,
  }
}

const getTwoPairs = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    valid(dices) {
      const overTwo = dices.reduce((mem, obj) => {
        if (obj >= 2) {
          mem = mem + 1;
        }
        return mem;
      }, 0);
      return overTwo >= 2;
    },
    sum(dices) {   
      let pairOfSame = false;
      const pairArray = dices.reduce((mem, obj, idx) => {
        if (obj >= 4) {
          mem.push(idx);
          pairOfSame = true;
          return mem;
        }
        if (obj >= 2) {
          mem.push(idx);
        }
        return mem;
      }, []);

      if (pairOfSame) {
        return (pairArray.pop() + 1) * 4;
      }

      if (pairArray.length >= 2) {
        const idx1 = pairArray.pop() + 1;
        const idx2 = pairArray.pop() + 1;

        return (idx1 * 2) + (idx2 * 2);
      }
    }
  }
}

const getSmallStraight = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    valid(combos) {
      const at = combos.slice(0, combos.length - 1);
      const tmp = at.filter(n => n !== 1);
      return tmp.length === 0;
    },
    sum(combos) {
      const at = combos.slice(0, combos.length - 1);
      const tmp = at.filter(n => n !== 1);
      if (tmp.length === 0) {        
        return 15;
      }
    }
  }
}

const getLargeStraight = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    valid(dices) {
      const at = dices.slice(1);
      const tmp = at.filter(n => n !== 1);
      return tmp.length === 0;
    },

    sum(dices) {
      const at = dices.slice(1);
      const tmp = at.filter(n => n !== 1);
      if (tmp.length === 0) {        
        return 20;
      }
    }
  }
}

const getFullHouse = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    valid: (dices) => {
      let hasFoundThree = false;
      let hasFoundTwo = false
      return dices.reduceRight((isValid, diceCount) => {
        if (!hasFoundThree) {
          hasFoundThree = (diceCount >= 3);
        }
        if (!hasFoundTwo) {
          hasFoundTwo = (diceCount >= 2);
        }
        return hasFoundTwo && hasFoundThree;
      }, false);
    },
    sum(dices) {
      let hasFoundThree = false;
      let hasFoundTwo = false;
      let idx1 = 0;
      let idx2 = 0;
      for (let i = dices.length - 1; i >= 0; i--) {
        if (!hasFoundThree && (dices[i] >= 3)) {
          hasFoundThree = true;
          idx1 = i + 1;
        } else if (!hasFoundTwo && (dices[i] >= 2)) {
          hasFoundTwo = true;
          idx2 = i + 1;
        }
      }
      if (!!idx1 && !!idx2) {
        return (idx1 * 3) + (idx2 * 2);
      }
      return 0;
    }
  }
}

const getXOfAKind = (id, label, nrOfKind) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    valid: (dices) => {
      return !!dices.findIndex((nr) => nr >= nrOfKind);
    },
    sum: (dices) => {
      const faceValueIndex = [...dices].reverse().findIndex((nr) => nr >= nrOfKind);
      if (faceValueIndex >= 0) {
        const faceValue = 6 - faceValueIndex;
        return nrOfKind * faceValue;
      }
      return 0;
    }
  }
}

const getUpperSection = (faceValue, id, label) => {
  const diceIndex = faceValue - 1;
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    diceIndex,
    faceValue,
    valid: (dices) => {
      return dices[diceIndex] >= 0;
    },
    sum: function(dices) {
      return dices[this.diceIndex] * this.faceValue
    },
  }
}

const initialState = () => {
  const upperSection = {
    ones: getUpperSection(1, 'ones','Ones'),
    twos: getUpperSection(2, 'twos','Twos'),
    threes: getUpperSection(3, 'threes','Threes'),
    fours: getUpperSection(4, 'fours','Fours'),
    fives: getUpperSection(5, 'fives','Fives'),
    sixes: getUpperSection(6, 'sixes','Sixes'),
  };

  const bonusForUpper = getProtocolItem('bonus', 'Bonus');
  const yatzyBonus = getProtocolItem('yatzyBonus', 'Bonus')
  const total = getProtocolItem('total', 'Total')
  const chance = {
    ...getProtocolItem('chance', 'Chance'),
    selectable: true,
    valid: () => true,
    sum: (combos) => {
      return combos.reduce((mem, nr, faceValue) => {
        return mem + (nr * (faceValue + 1));
      }, 0)
    }
  }

  return {
    ...upperSection,
    bonusForUpper,
    onePair: getXOfAKind('onePair', 'One pair', 2),
    twoPairs: getTwoPairs('twoPairs', 'Two pairs'),
    threeOfAKind: getXOfAKind('threeOfAKind', 'Three of a kind', 3),
    fourOfAKind: getXOfAKind('fourOfAKind', 'Four of a kind', 4),
    smallStraight: getSmallStraight('smallStraight', 'Small straight'),
    largeStraight: getLargeStraight('largeStraight', 'Large straight'),
    fullHouse: getFullHouse('fullHouse', 'FullHouse'),
    chance,
    yatzy: getXOfAKind('yatzy', 'Yatzy', 5),
    yatzyBonus,
    total,
  }
};

const protocol = (state = initialState(), action) => {
  switch(action.type) {
    case 'NEW_USER':
    case 'YATZY_NEW_GAME':
      return initialState();
    case 'YATZY_SET_PROTOCOL_ITEM_SUM':
      const { id, newScore } = action.data;
      return {
        ...state,
        [id]: {
          ...state[id],
          total: newScore,
          isUsed: true,
        },
        total: {
          ...state.total,
          total: state.total.total + newScore,
        }
      }
    default:
      return state
  }
};

export default protocol;