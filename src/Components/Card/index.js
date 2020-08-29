import React from 'react';
import styled from 'styled-components/macro';
import PileContext from '../../Contexts/PileProvider';

const Card = styled.div`
  flex: 1 1 0;
  width: 100%;
  height: 100%;
`;

const CardStacked = styled(Card)`
  position: absolute;
`;

const CardFan = styled.div`
  position: absolute;
  width: 100%;
  top: ${(props) => props.cardIndex === 0 ? 0 : 2}vw;
`;

const CardFilling = styled.div`
  position: absolute;
  color: ${({ color }) => color};
  line-height: 0.8;
`;

const CardFillingSmall = styled(CardFilling)`
  top: 0;
  font-size: ${(props) => {
    return `${props.containerWidth * 0.54}px`;
  }};
  letter-spacing: -0.1em;
`

const Value = styled(CardFillingSmall)`
  left: 0;
`;

const SuiteSmall = styled(CardFillingSmall)`
  right: 0.125em;
`;

const SuiteLarge = styled(CardFilling)`
  bottom: 0;
  width: 100%;
  font-size: ${(props) => {
    return `${props.containerWidth}px`;
  }};
`;


const getSuiteSymbol = (suite) => {
  switch(suite) {
    case 'diamonds':
      return '♦︎';
    case 'clubs':
      return '♣︎';
    case 'spades':
      return '♠︎';
    case 'hearts':
      return '♥︎';
    default:
      return null;
  }
}

export const Rectangle = styled.div`
  text-align:center;
  width: 100%;
`
export const ImageWrapper = styled.div`
  padding-top: 150%;
  position: relative;
  width: 100%;
`
export const Image = styled.div`
  bottom: 0;
  left: 0;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  right: 0;
  position: absolute;
  top: 0;
`
const CardInner = styled(Image)`
  border: 1px solid papayawhip;
  border-radius: 3px;
  background-color: white;
`;

const CardInnerFaceDown = styled(CardInner)`
  background-color: pink;
`

const CardInnerEmpty = styled(CardInner)`
  background-color: transparent;
`

const CardFaceUp = (props) => {
  const { id, color, label, suite, onClick, ...moreProps } = props

  if (!id) {
    return <Card suite={suite}>Soemthings wrong with card</Card>;
  }
  const newId = id.match(/[a-z]+|[^a-z]+/gi);

  let idValue = newId[1];
  if (idValue === '1') {
    idValue = 'A';
  }

  if (idValue === '13') {
    idValue = 'K';
  }

  if (idValue === '12') {
    idValue = 'Q';
  }

  if (idValue === '11') {
    idValue = 'J';
  }

  return (
    <PileContext.Consumer>
      { value => {
        return (
          <Rectangle suite={suite} onClick={onClick} {...moreProps}>
            <ImageWrapper>
              <CardInner>
                <Value color={color} containerWidth={value.width}>{idValue}</Value>
                <SuiteSmall color={color} containerWidth={value.width}>{getSuiteSymbol(suite)}</SuiteSmall>
                <SuiteLarge color={color} containerWidth={value.width}>{getSuiteSymbol(suite)}</SuiteLarge>
              </CardInner>
            </ImageWrapper>
          </Rectangle>
        )
      }}
    </PileContext.Consumer>
  )
}

const CardFaceDown = (props) => (
  <Rectangle {...props}>
    <ImageWrapper>
      <CardInnerFaceDown />
    </ImageWrapper>
  </Rectangle>
);


const CardEmpty = (props) => (
  <Rectangle {...props}>
    <ImageWrapper>
      <CardInnerEmpty />
    </ImageWrapper>
  </Rectangle>
);

const CardDroppable = ({ children, data, dropHandler, ...moreProps }) => {
  const props = {
    onDragOver: (ev) => {
      ev.preventDefault();
    },
    onDrop: (ev) => {
      ev.preventDefault();
      const dataFromTransfer = ev.dataTransfer.getData("pip");
      dropHandler(data, JSON.parse(dataFromTransfer))
    },
    ...moreProps,
  };

  return React.Children.map(children, child => {
    return React.cloneElement(child, props);
  });
};

const CardDraggable = ({ children, data, ...moreProps }) => {
  const props = {
    onDragStart: (ev) => {
      ev.dataTransfer.setData("pip", JSON.stringify(data));
      ev.dataTransfer.setDragImage(ev.currentTarget, 50, 15);
      ev.stopPropagation();
    },
    ...moreProps,
  };

  return React.Children.map(children, child => {
    return React.cloneElement(child, props);
  });
};

const CardToggleFaceUp = ({ label, suite, isFaceUp, onClick, ...props }) => {
  if (isFaceUp) {
    return <CardFaceUp suite={suite} label={label} onClick={onClick} {...props} />;
  }
  return <CardFaceDown />;
}

export {
  Card,
  CardFaceUp,
  CardFaceDown,
  CardEmpty,
  CardFan,
  CardStacked,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp
};
