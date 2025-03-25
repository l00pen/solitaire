import { useDndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/types";
import { CardFaceUp } from "./Card";

const DragOverlayContent = ({ cards }: { cards: Card[] }) => {
  const { active } = useDndContext();
  const { transform } = useDraggable({
    id: active?.id ?? "",
  });

  return (
    <div
      className="relative w-[60px]"
      style={{
        transform: CSS.Transform.toString(transform),
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          className="absolute w-full"
          style={{
            top: `${i * 50}px`,
            pointerEvents: "none",
          }}
        >
          <CardFaceUp card={card} />
        </div>
      ))}
    </div>
  );
};

export default DragOverlayContent;
