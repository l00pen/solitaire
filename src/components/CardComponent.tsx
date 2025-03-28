import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/types";
import { CardFaceUp, CardFaceDown } from "./Card";

interface CardComponentProps {
  card: Card;
  cardIndex: number;
  columnIndex: number;
  cardsInColumn: Card[];
}

const CardComponent = ({
  card,
  cardIndex,
  columnIndex,
  cardsInColumn,
}: CardComponentProps) => {
  console.log("Card droppable ID:", `col-${columnIndex}`);

  const stack = cardsInColumn.slice(cardIndex);

  const isValidStack = () => {
    for (let i = 0; i < stack.length - 1; i++) {
      const a = stack[i];
      const b = stack[i + 1];
      if (!b.faceUp || a.suit !== b.suit || a.value !== b.value + 1) {
        return false;
      }
    }
    return true;
  };

  const isTop = cardIndex === cardsInColumn.length - 1;
  const canDrag = card.faceUp && isValidStack();

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `${columnIndex}-${card.id}`,
    disabled: !canDrag,
    data: {
      card,
      columnIndex,
      stack,
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `${columnIndex}-top`,
    disabled: !(isTop && card.faceUp),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : undefined,
    zIndex: isDragging ? 999 : cardIndex,
    opacity: isDragging ? 0 : 1,
    cursor: canDrag ? (isDragging ? "grabbing" : "grab") : "not-allowed",
  };

  return (
    <div
      ref={(el) => {
        setDragRef(el);
        setDropRef(el);
      }}
      {...attributes}
      {...listeners}
      style={style}
      className={`relative w-full ${isOver ? "ring-2 ring-blue-400" : ""}`}
    >
      {card.faceUp ? <CardFaceUp card={card} /> : <CardFaceDown />}
    </div>
  );
};

export default CardComponent;
