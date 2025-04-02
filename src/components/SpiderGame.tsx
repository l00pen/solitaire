"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { generateSpiderDeck, generateSpiderDeck2Suit } from "@/utils/deck";

import { Card } from "@/types";

type Column2 = {
  id: string;
  cards: Card[];
};

const CARD_OFFSET_PERCENT = 30;

const SpiderGame = () => {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);
  const [columns, setColumns] = useState<Column2[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [completedStacks, setCompletedStacks] = useState<number>(0);
  const [history, setHistory] = useState<Column2[][]>([]);

  useEffect(() => {
    dealNewGame();
  }, []);

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

    // ✅ Only allow moving stack if it's a valid descending sequence of same suit
    const isValidStack = stackToMove.every((card, i, arr) => {
      if (i === 0) return true;
      const prev = arr[i - 1];
      return (
        card.faceUp && card.suit === prev.suit && card.value === prev.value - 1
      );
    });

    if (!isValidStack) return;

    const targetCard = targetColumn.cards[targetColumn.cards.length - 1];

    if (targetCard) {
      const valid =
        targetCard.faceUp && draggedCard.value === targetCard.value - 1;

      if (!valid) return;
    }

    const newSourceCards = sourceColumn.cards.slice(0, draggedIndex);

    // 🔁 Flip the new top card in source column if it's face-down
    if (newSourceCards.length > 0) {
      const topCard = newSourceCards[newSourceCards.length - 1];
      if (!topCard.faceUp) {
        topCard.faceUp = true;
      }
    }

    const newTargetCards = [...targetColumn.cards, ...stackToMove];

    const updatedColumns = columns.map((col) => {
      if (col.id === sourceColumn.id) return { ...col, cards: newSourceCards };
      if (col.id === targetColumn.id) return { ...col, cards: newTargetCards };
      return col;
    });

    setHistory((prev) => [...prev, columns]);

    const [cleaned, removed] = removeCompletedSequences(updatedColumns);

    setColumns(cleaned);

    if (removed > 0) {
      setCompletedStacks((prev) => prev + removed);
    }
  };

  const handleCardClick = (clickedCard: Card) => {
    const sourceColumn = columns.find((col) =>
      col.cards.some((c) => c.id === clickedCard.id)
    );

    if (!sourceColumn) return;

    const draggedIndex = sourceColumn.cards.findIndex(
      (c) => c.id === clickedCard.id
    );
    const stackToMove = sourceColumn.cards.slice(draggedIndex);

    // only allow face-up cards to auto-move
    if (!clickedCard.faceUp) return;

    // ✅ Only allow moving stack if it's a valid descending sequence of same suit
    const isValidStack = stackToMove.every((card, i, arr) => {
      if (i === 0) return true;
      const prev = arr[i - 1];
      return (
        card.faceUp && card.suit === prev.suit && card.value === prev.value - 1
      );
    });

    if (!isValidStack) return;

    for (const targetColumn of columns) {
      if (targetColumn.id === sourceColumn.id) continue;

      const targetCard = targetColumn.cards[targetColumn.cards.length - 1];

      const validMove = targetCard
        ? targetCard.faceUp && clickedCard.value === targetCard.value - 1
        : false;

      if (validMove) {
        // 👇 same logic as drag move
        const newSourceCards = sourceColumn.cards.slice(0, draggedIndex);
        if (newSourceCards.length > 0) {
          const topCard = newSourceCards[newSourceCards.length - 1];
          if (!topCard.faceUp) topCard.faceUp = true;
        }

        const newTargetCards = [...targetColumn.cards, ...stackToMove];

        const updatedColumns = columns.map((col) => {
          if (col.id === sourceColumn.id)
            return { ...col, cards: newSourceCards };
          if (col.id === targetColumn.id)
            return { ...col, cards: newTargetCards };
          return col;
        });

        setHistory((prev) => [...prev, columns]);

        const [cleaned, removed] = removeCompletedSequences(updatedColumns);

        setColumns(cleaned);

        if (removed > 0) {
          setCompletedStacks((prev) => prev + removed);
        }

        return; // ✅ done, stop after first valid move
      }
    }
  };

  const removeCompletedSequences = (cols: Column2[]): [Column2[], number] => {
    let removed = 0;

    const cleaned = cols.map((col) => {
      for (let i = 0; i <= col.cards.length - 13; i++) {
        const slice = col.cards.slice(i, i + 13);
        const isFullSequence = slice.every(
          (card, idx) =>
            card.faceUp &&
            card.suit === slice[0].suit &&
            card.value === 13 - idx
        );

        if (isFullSequence) {
          removed += 1;
          const before = col.cards.slice(0, i);
          const after = col.cards.slice(i + 13);
          const newCards = [...before, ...after];

          if (newCards.length > 0) {
            const top = newCards[newCards.length - 1];
            if (!top.faceUp) top.faceUp = true;
          }

          return {
            ...col,
            cards: newCards,
          };
        }
      }
      return col;
    });

    return [cleaned, removed];
  };

  const dealNewGame = () => {
    setCompletedStacks(0);
    const fullDeck = generateSpiderDeck();
    const dealDeck = fullDeck.splice(0, 50);

    const cols: Column2[] = Array.from({ length: 10 }, (_, i) => ({
      id: `col-${i}`,
      cards: [],
    }));

    while (fullDeck.length) {
      for (let i = 0; i < cols.length; i++) {
        const card = fullDeck.pop();
        if (card) {
          cols[i].cards.push(card);
        }
      }
    }

    cols.forEach((col) => {
      if (col.cards.length > 0) col.cards[col.cards.length - 1].faceUp = true;
    });

    setColumns(cols);
    setDeck(dealDeck);
  };

  const dealNew2SuitGame = () => {
    setCompletedStacks(0);
    const fullDeck = generateSpiderDeck2Suit();
    const dealDeck = fullDeck.splice(0, 50);

    const cols: Column2[] = Array.from({ length: 10 }, (_, i) => ({
      id: `col-${i}`,
      cards: [],
    }));

    while (fullDeck.length) {
      for (let i = 0; i < cols.length; i++) {
        const card = fullDeck.pop();
        if (card) {
          cols[i].cards.push(card);
        }
      }
    }

    cols.forEach((col) => {
      if (col.cards.length > 0) col.cards[col.cards.length - 1].faceUp = true;
    });

    setColumns(cols);
    setDeck(dealDeck);
  };

  const dealNextRow = () => {
    if (deck.length < 10) return;

    const newCols = [...columns];
    const newDeck = [...deck];

    for (let i = 0; i < 10; i++) {
      const card = newDeck.shift();
      if (card) {
        card.faceUp = true;
        newCols[i].cards.push(card);
      }
    }

    setDeck(newDeck);
    setColumns(newCols);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setColumns(last);
    setHistory((prev) => prev.slice(0, -1));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center gap-2">
        <button
          onClick={dealNewGame}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          New Game
        </button>
        <button
          onClick={dealNew2SuitGame}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          New 2 suit Game
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center gap-2">
        <div className="mb-4 flex justify-start items-center gap-2">
          <button
            onClick={dealNextRow}
            disabled={deck.length < 10}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Deal Next Row ({deck.length / 10} left)
          </button>

          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Undo
          </button>
        </div>

        <div className="text-white">Completed Stacks: {completedStacks}</div>
      </div>
      <div>{completedStacks === 8 && <p>You won!!</p>}</div>

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={(event) => {
          const card = columns
            .flatMap((col) => col.cards)
            .find((c) => c.id === event.active.id);
          if (card) setDraggedCard(card);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setDraggedCard(null)}
      >
        <div className="flex gap-4 p-4">
          {columns.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                draggedCard={draggedCard}
                onCardClick={handleCardClick}
              />
            );
          })}
        </div>
        {/* The overlay follows the cursor while dragging */}
        <DragOverlay>
          {draggedCard && <StackPreview card={draggedCard} columns={columns} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default SpiderGame;

function Column({
  column,
  draggedCard,
  onCardClick,
}: {
  column: Column2;
  draggedCard: Card | null;
  onCardClick: (card: Card) => void;
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
      className={`w-26 min-h-40 relative ${
        column.cards.length
          ? ""
          : "border border-gray-400 rounded p-2 bg-green-100"
      }`}
    >
      <div className="relative w-full h-full gap-2">
        {column.cards.map((card, index) => {
          if (draggedCard && isSourceColumn && index >= draggedIndex) {
            return null;
          }

          return (
            <DraggableCard
              key={card.id}
              card={card}
              style={{
                top: `${index * CARD_OFFSET_PERCENT}%`,
              }}
              onClick={() => onCardClick(card)}
            />
          );
        })}
      </div>
    </div>
  );
}

import { useRef } from "react";

function DraggableCard({
  card,
  style,
  onClick,
}: {
  card: Card;
  style: any;
  onClick?: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
    });

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const threshold = 5;

  const localStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 1000 : 1,
    userSelect: "none",
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={localStyle}
      className="relative"
      onPointerDown={(e) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!pointerStart.current) return;

        const dx = Math.abs(e.clientX - pointerStart.current.x);
        const dy = Math.abs(e.clientY - pointerStart.current.y);

        pointerStart.current = null;

        if (dx < threshold && dy < threshold) {
          onClick?.();
        }
      }}
    >
      {/* 👇 This inner div is the actual draggable element */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-0 left-0 h-full"
      >
        <CardComponent key={card.id} card={card} />
      </div>
    </div>
  );
}

function StackPreview({ card, columns }: { card: Card; columns: Column2[] }) {
  const sourceColumn = columns.find((col) =>
    col.cards.some((c) => c.id === card.id)
  );

  if (!sourceColumn) return null;

  const index = sourceColumn.cards.findIndex((c) => c.id === card.id);
  const stack = sourceColumn.cards.slice(index);

  return (
    <div className="relative aspect-[2/3] w-full">
      {stack.map((c, i) => {
        return (
          <div
            key={c.id}
            className="absolute top-0 left-0 border rounded shadow text-center w-full"
            style={{
              top: `${i * CARD_OFFSET_PERCENT}%`,
              backgroundColor: !c.faceUp ? "papayawhip" : "white",
              color: `${card.color}`,
            }}
          >
            <div className="w-full text-[clamp(1rem,1.5vw,2rem)] border rounded shadow text-center py-1 px-2">
              <div
                className={"flex flex-col justify-between h-full text-[1em]"}
              >
                <div className={"flex justify-start text-[1em]"}>
                  {c.faceUp && c.label}
                </div>
                <div className={"flex justify-center text-[4em] leading-none"}>
                  {c.faceUp && c.suit}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CardComponent({ card }: { card: Card }) {
  return (
    <div
      key={card.id}
      className="absolute top-0 left-0 rounded"
      style={{
        backgroundColor: !card.faceUp ? "papayawhip" : "white",
        color: `${card.color}`,
      }}
    >
      <div className="relative w-full aspect-[2/3]  min-h-[90px] text-[clamp(1rem,1.5vw,2rem)] border border-black rounded shadow text-center py-1 px-2">
        <div className={"flex flex-col justify-between h-full text-[1em]"}>
          <div className={"flex justify-start text-[1em]"}>
            {card.faceUp && card.label}
          </div>
          <div className={"flex justify-center text-[4em] leading-none"}>
            <span className={card.faceUp ? "" : "invisible"}>{card.suit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
