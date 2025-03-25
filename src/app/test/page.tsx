// CardGame.tsx
"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

type Card = {
  id: string;
  label: string;
};

type Column = {
  id: string;
  cards: Card[];
};

const initialColumns: Column[] = [
  {
    id: "col-1",
    cards: [
      { id: "card-1", label: "A♠" },
      { id: "card-2", label: "2♠" },
    ],
  },
  {
    id: "col-2",
    cards: [{ id: "card-3", label: "K♦" }],
  },
  {
    id: "col-3",
    cards: [],
  },
];

export default function CardGame() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedCard(null);
    const { active, over } = event;
    if (!over || !draggedCard) return;

    const sourceColumn = columns.find((col) =>
      col.cards.some((card) => card.id === active.id)
    );
    const targetColumn = columns.find((col) => col.id === over.id);

    if (!sourceColumn || !targetColumn || sourceColumn.id === targetColumn.id)
      return;

    const draggedIndex = sourceColumn.cards.findIndex(
      (c) => c.id === draggedCard.id
    );
    const stackToMove = sourceColumn.cards.slice(draggedIndex);

    // 🛑 Check rule: dragged card must be less than target column top
    const targetTopCard = targetColumn.cards[targetColumn.cards.length - 1];
    if (targetTopCard) {
      const fromValue = getCardValue(draggedCard);
      const toValue = getCardValue(targetTopCard);

      if (fromValue >= toValue) {
        console.log("Invalid move: must be less than target card");
        return; // 🚫 Do not allow move
      }
    }

    const newSourceCards = sourceColumn.cards.slice(0, draggedIndex);
    const newTargetCards = [...targetColumn.cards, ...stackToMove];

    setColumns((cols) =>
      cols.map((col) => {
        if (col.id === sourceColumn.id)
          return { ...col, cards: newSourceCards };
        if (col.id === targetColumn.id)
          return { ...col, cards: newTargetCards };
        return col;
      })
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            setDraggedCard={setDraggedCard}
            draggedCard={draggedCard}
          />
        ))}
      </div>
      {/* The overlay follows the cursor while dragging */}
      <DragOverlay>
        {draggedCard && <StackPreview card={draggedCard} columns={columns} />}
      </DragOverlay>
    </DndContext>
  );
}

function Column({
  column,
  setDraggedCard,
  draggedCard,
}: {
  column: Column;
  setDraggedCard: (card: Card | null) => void;
  draggedCard: Card | null;
}) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const isSourceColumn = draggedCard
    ? column.cards.some((c) => c.id === draggedCard.id)
    : false;

  const draggedIndex =
    draggedCard && isSourceColumn
      ? column.cards.findIndex((c) => c.id === draggedCard.id)
      : -1;

  return (
    <div
      ref={setNodeRef}
      className="w-32 min-h-40 border border-gray-400 rounded p-2 bg-green-100 relative"
    >
      {column.cards.map((card, index) => {
        if (isSourceColumn) {
          console.log("pip", index, draggedIndex);
        }
        // ❌ Skip rendering dragged stack
        if (draggedCard && isSourceColumn && index >= draggedIndex) {
          return null;
        }

        return (
          <DraggableCard
            key={card.id}
            card={card}
            stack={
              isSourceColumn
                ? column.cards.slice(index, draggedIndex)
                : column.cards.slice(index)
            }
            setDraggedCard={setDraggedCard}
            style={{ top: index * 20 }}
          />
        );
      })}
    </div>
  );
}

function DraggableCard({
  card,
  stack,
  setDraggedCard,
  style,
  isGhost,
  draggedIndex,
}: {
  card: Card;
  stack: Card[];
  setDraggedCard: (card: Card | null) => void;
  style: any;
  isGhost?: boolean | null;
  draggedIndex?: any;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });

  const localStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : undefined,
    // opacity: isGhost ? 0.4 : 1,

    pointerEvents: isGhost ? "none" : undefined,
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={localStyle}
      className="relative"
      onMouseDown={() => {
        setDraggedCard(card);
      }}
    >
      {stack.map((c, i) => {
        if (draggedIndex > -1 && draggedIndex <= i) {
          return null;
        }
        return (
          <div
            key={c.id}
            className="absolute top-0 left-0 w-24 h-10  border rounded shadow text-center"
            style={{ top: i * 20, backgroundColor: isGhost ? "pink" : "white" }}
          >
            {c.label}
          </div>
        );
      })}
    </div>
  );
}

function StackPreview({ card, columns }: { card: Card; columns: Column[] }) {
  const sourceColumn = columns.find((col) =>
    col.cards.some((c) => c.id === card.id)
  );
  if (!sourceColumn) return null;

  const index = sourceColumn.cards.findIndex((c) => c.id === card.id);
  const stack = sourceColumn.cards.slice(index);

  return (
    <div className="relative w-24">
      {stack.map((c, i) => (
        <div
          key={c.id}
          className="absolute w-24 h-10 bg-white border rounded shadow text-center"
          style={{ top: i * 20 }}
        >
          {c.label}
        </div>
      ))}
    </div>
  );
}

function getCardValue(card: Card): number {
  const value = card.label.slice(0, -1); // Remove suit symbol
  switch (value) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return parseInt(value, 10); // For "2"–"10"
  }
}
