import { Card, Suit } from "../types";

const SUITS = ["♠︎", "♥"] as Suit[];
export function generateSpiderDeck(): Card[] {
  const deck: Card[] = [];

  for (let i = 0; i < 8; i++) {
    for (let v = 1; v <= 13; v++) {
      deck.push({
        suit: SUITS[0],
        value: v,
        faceUp: false,
        id: `${v}-${i}`,
        label: `${getCardValue(v)} ${SUITS[0]}`,
        color: getSuitColor(SUITS[0]),
      });
    }
  }

  // Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
export function generateSpiderDeck2Suit(): Card[] {
  const deck: Card[] = [];

  for (let s = 0; s < SUITS.length; s++) {
    for (let i = 0; i < 4; i++) {
      for (let v = 1; v <= 13; v++) {
        deck.push({
          suit: SUITS[s],
          value: v,
          faceUp: false,
          color: getSuitColor(SUITS[s]),
          id: `${v}-${i}-${SUITS[s]}`,
          label: `${getCardValue(v)} ${SUITS[s]}`,
        });
      }
    }
  }

  // Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

function getCardValue(value: number): string {
  switch (value) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return value.toString(); // For "2"–"10"
  }
}
function getSuitColor(suit: string): string {
  switch (suit) {
    case "♥":
      return "red";
    case "♠︎":
      return "black";
    default:
      return "green";
  }
}
