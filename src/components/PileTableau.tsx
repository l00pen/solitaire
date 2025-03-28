"use client";

import React from "react";
import { Pile } from "@/components/Pile";
import {
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardEmpty,
} from "@/components/Card";
import { usePileContext } from "@/contexts/PileContext";

type Card = {
  isFaceUp: boolean;
  [key: string]: any;
};

type DragData = {
  card: Card;
  cardIndexInPile: number;
  sourcePile: string;
};

type PileTableauProps = {
  pile: Card[];
  pileKey: string;
  onDrop: (dropData: any, dragData: DragData) => void;
  onClick: (dragData: DragData) => void;
};

const SubPile = ({
  cardIndex,
  children,
}: {
  cardIndex: number;
  children: React.ReactNode;
}) => {
  const { width: containerWidth } = usePileContext();

  return (
    <div
      className="absolute w-full"
      style={{
        top: cardIndex === 0 ? 0 : containerWidth * 0.54,
      }}
    >
      {children}
    </div>
  );
};

const renderPile = (
  list: Card[],
  cardIndex: number,
  pileKey: string,
  onDrop: PileTableauProps["onDrop"],
  onClick: PileTableauProps["onClick"]
): React.ReactNode => {
  if (list.length === 0) return <CardEmpty />;

  const [card, ...rest] = list as [Card, ...Card[]];
  const dragAndDropData = {
    card,
    cardIndexInPile: cardIndex,
    sourcePile: pileKey,
  };

  const cardList =
    rest.length > 0
      ? renderPile(rest, cardIndex + 1, pileKey, onDrop, onClick)
      : null;

  return (
    <SubPile cardIndex={cardIndex}>
      <CardDraggable data={dragAndDropData} draggable={!!card.isFaceUp}>
        <CardToggleFaceUp {...card} onClick={() => onClick(dragAndDropData)} />
        {cardList}
      </CardDraggable>
    </SubPile>
  );
};

const PileTableau: React.FC<PileTableauProps> = ({
  pile,
  pileKey,
  onDrop,
  onClick,
}) => {
  const lastCardInPile = pile.length > 0 ? pile[pile.length - 1] : {};
  const lastCardInPileIndex = pile.length > 0 ? pile.length - 1 : 0;

  const pileComponents = renderPile(pile, 0, pileKey, onDrop, onClick);

  return (
    <Pile pile={pile}>
      <CardDroppable
        data={{
          card: lastCardInPile,
          cardIndex: lastCardInPileIndex,
          destinationPile: pileKey,
        }}
        dropHandler={onDrop}
      >
        {pileComponents}
      </CardDroppable>
    </Pile>
  );
};

export default PileTableau;
