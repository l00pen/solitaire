const getProtocolItem = (id, label) => {
  return {
    id,
    label,
    total: 0,
    isUsed: false,
    selectable: false,
    sum: () => 0,
  }
}

const getTwoPairs = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
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
      return 0;
    }
  }
}

const getSmallStraight = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    sum(combos) {
      const at = combos.slice(0, combos.length - 1);
      const tmp = at.filter(n => n !== 1);
      if (tmp.length === 0) {        
        return 15;
      }
      return 0;
    }
  }
}

const getLargeStraight = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
    sum(dices) {
      const at = dices.slice(1);
      const tmp = at.filter(n => n !== 1);
      if (tmp.length === 0) {        
        return 20;
      }
      return 0;
    }
  }
}

const getFullHouse = (id, label) => {
  const protocolItem = getProtocolItem(id, label);
  return {
    ...protocolItem,
    selectable: true,
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
    sum: function(dices) {
      return dices[this.diceIndex] * this.faceValue
    },
  }
}

const initialState = () => {
  const bonusForUpper = getProtocolItem('bonus', 'Bonus');
  const yatzyBonus = getProtocolItem('yatzyBonus', 'Bonus')
  const chance = {
    ...getProtocolItem('chance', 'Chance'),
    selectable: true,
    sum: (combos) => {
      return combos.reduce((mem, nr, faceValue) => {
        return mem + (nr * (faceValue + 1));
      }, 0)
    }
  }

  return {
    ones: getUpperSection(1, 'ones','Ones'),
    twos: getUpperSection(2, 'twos','Twos'),
    threes: getUpperSection(3, 'threes','Threes'),
    fours: getUpperSection(4, 'fours','Fours'),
    fives: getUpperSection(5, 'fives','Fives'),
    sixes: getUpperSection(6, 'sixes','Sixes'),
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
  }
};

const UPPER_SECTION = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];

const getBonus = (state) => {
  let total = 0;
  let isUsed = false;

  const currentTotal = Object.values(state).reduce((mem, item) => {
    if (UPPER_SECTION.includes(item.id)) {
      return mem + item.total;
    }
    return mem;
  }, 0);

  isUsed =  Object.values(state).reduce((mem, item) => {
    if (UPPER_SECTION.includes(item.id)) {
      return mem && item.isUsed;
    }
    return mem;
  }, true);

  if (currentTotal >= 63 ) {
    total = 50;
  }

  return {
    ...state.bonusForUpper,
    isUsed,
    total,
  };
}

const getYatzyBonus = (protocol) => {
  const hasYatzy = protocol.yatzy.total > 0;
  return {
    ...protocol.yatzyBonus,
    isUsed: protocol.yatzy.isUsed,
    total: hasYatzy ? 50 : 0,
  };
};


const protocol = (state = initialState(), action) => {
  switch(action.type) {
    case 'NEW_USER':
    case 'YATZY_NEW_GAME':
      return initialState();
    case 'YATZY_SET_PROTOCOL_ITEM_SUM':
      const { id, newScore } = action.data;
      const newState = {
        ...state,
        [id]: {
          ...state[id],
          total: newScore,
          isUsed: true,
        }
      }
      const bonusForUpper = getBonus(newState);
      return {
        ...newState,
        bonusForUpper,
        yatzyBonus: getYatzyBonus(newState),
      }
    default:
      return state
  }
};

export default protocol;