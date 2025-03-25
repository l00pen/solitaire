// types/index.ts
export type Suit = "♠︎" | "♥" | "♦" | "♣";

export interface Card {
  suit: string;
  value: number; // 1-13
  faceUp: boolean;
  id: string;
  color: string;

  suiteSymbol?: string;
  label?: string;
}
