"use client";

import React from "react";
import { Card } from "@/types";

type CardProps = {
  card: Card;
  onClick?: () => void;
  children?: React.ReactNode;
};

// Wrappers

const CardOuter = ({ children, ...props }: CardProps) => (
  <div className="text-center w-full" {...props}>
    {children}
  </div>
);

const CardContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full pt-[150%]">{children}</div>
);

const CardInnerBase =
  "absolute inset-0 m-auto max-w-full max-h-full rounded border";

const CardInnerFaceDown = () => (
  <div
    className={`${CardInnerBase} bg-pink-300 border-[1px] border-papayawhip`}
  />
);

const CardInnerEmpty = () => (
  <div
    className={`${CardInnerBase} bg-transparent border-[1px] border-papayawhip`}
  />
);

const CardWrapper = ({ children, ...props }: CardProps) => (
  <CardOuter {...props}>
    <CardContainer>{children}</CardContainer>
  </CardOuter>
);

// Main Face Up Card

const CardFaceUp = (props: CardProps) => {
  const { card, onClick } = props;
  const { color, suit, value } = card;
  const containerWidth = 90;

  const faceMap: Record<number, string> = {
    1: "A",
    11: "J",
    12: "Q",
    13: "K",
  };
  const presentationValue = faceMap[value] || value.toString();

  return (
    <div className="text-center w-full text-black" onClick={onClick}>
      <div className="relative w-full pt-[150%]">
        <div
          className={`absolute inset-0 m-auto max-w-full max-h-full rounded border bg-white border-[1px] border-papayawhip`}
        >
          {/* Top-left value */}
          <div
            className="absolute top-0 left-0 leading-none"
            style={{
              color,
              fontSize: `${containerWidth * 0.54}px`,
              letterSpacing: "-0.1em",
            }}
          >
            {presentationValue}
          </div>

          {/* Top-right small suit */}
          <div
            className="absolute top-0 right-1 leading-none"
            style={{
              color,
              fontSize: `${containerWidth * 0.54}px`,
              letterSpacing: "-0.1em",
            }}
          >
            {suit}
          </div>

          {/* Bottom large suit */}
          <div
            className="absolute bottom-0 w-full leading-none"
            style={{
              color,
              fontSize: `${containerWidth}px`,
            }}
          >
            {suit}
          </div>
        </div>
      </div>
    </div>
  );
};

// Other Card Variants

const CardFaceDown = () => (
  <div className="text-center w-full">
    <CardContainer>
      <CardInnerFaceDown />
    </CardContainer>
  </div>
);

const CardEmpty = (props: CardProps) => (
  <CardWrapper {...props}>
    <CardInnerEmpty />
  </CardWrapper>
);

const CardDroppable = ({
  children,
  data,
  dropHandler,
  ...moreProps
}: {
  children: React.ReactNode;
  data: any;
  dropHandler: (dropData: any, dragData: any) => void;
  [key: string]: any;
}) => {
  const props = {
    onDragOver: (ev: React.DragEvent) => ev.preventDefault(),
    onDrop: (ev: React.DragEvent) => {
      ev.preventDefault();
      const dataFromTransfer = ev.dataTransfer.getData("pip");
      dropHandler(data, JSON.parse(dataFromTransfer));
    },
    ...moreProps,
  };

  return React.Children.map(children, (child) =>
    child ? React.cloneElement(child as React.ReactElement, props) : null
  );
};

const CardDraggable = ({
  children,
  data,
  ...moreProps
}: {
  children: React.ReactNode;
  data: any;
  [key: string]: any;
}) => {
  const props = {
    onDragStart: (ev: React.DragEvent) => {
      ev.dataTransfer.setData("pip", JSON.stringify(data));
      ev.dataTransfer.setDragImage(ev.currentTarget, 50, 15);
      ev.stopPropagation();
    },
    ...moreProps,
  };

  return React.Children.map(children, (child) =>
    child ? React.cloneElement(child as React.ReactElement, props) : null
  );
};

const CardToggleFaceUp = ({ props }: { props: CardProps }) => {
  return props.card.faceUp ? <CardFaceUp {...props} /> : <CardFaceDown />;
};

export {
  CardFaceUp,
  CardFaceDown,
  CardEmpty,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
};
