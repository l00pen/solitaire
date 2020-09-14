const PROTOCOL = {
  ONES: 'ones',
  TWOS: 'twos',
  THREES: 'threes',
  FOURS: 'fours',
  FIVES: 'fives',
  SIXES: 'sixes',
  BONUS: 'bonus',
  ONE_PAIR: 'onePair',
  TWO_PAIRS: 'twoPairs',
  THREE_OF_A_KIND: 'threeOfAKind',
  FOUR_OF_A_KIND: 'fourOfAKind',
  SMALL_STRAIGHT: 'smallStraight',
  LARGE_STRAIGHT: 'largeStraight',
  FULL_HOUSE: 'fullHouse',
  CHANCE: 'chance',
  YATZY: 'yatzy',
  YATZY_BONUS: 'yatzyBonus',
}

const UPPER_SECTION = [PROTOCOL.ONES, PROTOCOL.TWOS, PROTOCOL.THREES, PROTOCOL.FOURS, PROTOCOL.FIVES, PROTOCOL.SIXES];

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
  return [
    getUpperSection(1, PROTOCOL.ONES,'Ones'),
    getUpperSection(2, PROTOCOL.TWOS,'Twos'),
    getUpperSection(3, PROTOCOL.THREES,'Threes'),
    getUpperSection(4, PROTOCOL.FOURS,'Fours'),
    getUpperSection(5, PROTOCOL.FIVES,'Fives'),
    getUpperSection(6, PROTOCOL.SIXES,'Sixes'),
    getProtocolItem(PROTOCOL.BONUS, 'Bonus'),
    getXOfAKind(PROTOCOL.ONE_PAIR, 'One pair', 2),
    getTwoPairs(PROTOCOL.TWO_PAIRS, 'Two pairs'),
    getXOfAKind(PROTOCOL.THREE_OF_A_KIND, 'Three of a kind', 3),
    getXOfAKind(PROTOCOL.FOUR_OF_A_KIND, 'Four of a kind', 4),
    getSmallStraight(PROTOCOL.SMALL_STRAIGHT, 'Small straight'),
    getLargeStraight(PROTOCOL.LARGE_STRAIGHT, 'Large straight'),
    getFullHouse(PROTOCOL.FULL_HOUSE, 'FullHouse'),
    {
      ...getProtocolItem(PROTOCOL.CHANCE, 'Chance'),
      selectable: true,
      sum: (combos) => {
        return combos.reduce((mem, nr, faceValue) => {
          return mem + (nr * (faceValue + 1));
        }, 0)
      }
    },
    getXOfAKind(PROTOCOL.YATZY, 'Yatzy', 5),
    getProtocolItem(PROTOCOL.YATZY_BONUS, 'Bonus'),
  ]
};


const getBonus = (protocolItem, _, protocol) => {
  if(protocolItem.id === PROTOCOL.BONUS) {
    let total = 0;
    let isUsed = false;
    debugger;
    const currentTotal = protocol.reduce((mem, item) => {
      if (UPPER_SECTION.includes(item.id)) {
        isUsed = mem.isUsed && item.isUsed;
        return mem + item.total;
      }
      return mem;
    }, 0);

    if (currentTotal >= 63 ) {
      total = 50;
    }
    return {
      ...protocolItem,
      isUsed,
      total,
    }
  }

  return protocolItem;
}

const getYatzyBonus = (protocolItem, _, protocol) => {
  if(protocolItem.id === PROTOCOL.YATZY_BONUS) {
    const yatzy = protocol.find(({id}) => id === PROTOCOL.YATZY);
    const hasYatzy = yatzy.total > 0;
    return {
      ...protocolItem,
      isUsed: yatzy.isUsed,
      total: hasYatzy ? 50 : 0,
    }
  }
  return protocolItem;
};


const protocol = (state = initialState(), action) => {
  switch(action.type) {
    case 'NEW_USER':
    case 'YATZY_NEW_GAME':
      return initialState();
    case 'YATZY_SET_PROTOCOL_ITEM_SUM':
      const { id, newScore } = action.data;
      return state
        .map((protocolItem) => {
          if (protocolItem.id === id) {
            return {
              ...protocolItem,
              total: newScore,
              isUsed: true,
            }
          }
          return protocolItem;
        })
        .map(getBonus)
        .map(getYatzyBonus);
    default:
      return state
  }
};

export default protocol;