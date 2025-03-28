// Column.tsx
import { useDroppable } from "@dnd-kit/core";
import { Card } from "@/types";
import CardComponent from "./CardComponent";

const Column = ({ index, cards }: { index: number; cards: Card[] }) => {
  const isEmpty = cards.length === 0;

  const { setNodeRef, isOver } = useDroppable({
    id: `empty-${index}`,
    disabled: !isEmpty,
  });

  const CARD_OFFSET = 50;

  return (
    <div
      ref={isEmpty ? setNodeRef : undefined}
      className="relative w-full"
      style={{ minHeight: `${cards.length * CARD_OFFSET + 100}px` }}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          className="absolute w-full"
          style={{ top: `${i * CARD_OFFSET}px`, zIndex: i }}
        >
          <CardComponent
            card={card}
            cardIndex={i}
            columnIndex={index}
            cardsInColumn={cards}
          />
        </div>
      ))}

      {isEmpty && isOver && (
        <div className="absolute h-24 w-full border-2 border-blue-400 rounded" />
      )}
    </div>
  );
};

export default Column;
