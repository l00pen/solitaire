import React from 'react';
import styled from 'styled-components/macro';
import PileContext from '../../Contexts/PileProvider';

const CardFan = styled.div`
  // position: absolute;
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
  font-size: ${(props) => `${props.containerWidth * 0.54}px`};
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
  font-size: ${(props) => `${props.containerWidth}px`};
`;

export const CardOuter = styled.div`
  text-align:center;
  width: 100%;
`
export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ containerHeight }) => containerHeight}px;
`
export const Image = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  position: absolute;
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

const CardWrapper = ({children, ...props }) => (
  <CardOuter {...props}>
    <CardContainer containerHeight={props.containerHeight} containerWidth={props.containerWidth}>
      {children}
    </CardContainer>
  </CardOuter>
)

const CardFaceUp = (props) => {
  const { id, color, label, suite, suiteSymbol, onClick, ...moreProps } = props
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
          <CardWrapper suite={suite} onClick={onClick} {...moreProps} containerHeight={value.height} containerWidth={value.width}>
            <CardInner>
              <Value color={color} containerWidth={value.width}>{idValue}</Value>
              <SuiteSmall color={color} containerWidth={value.width}>{suiteSymbol}</SuiteSmall>
              <SuiteLarge color={color} containerWidth={value.width}>{suiteSymbol}</SuiteLarge>
            </CardInner>
          </CardWrapper>
        )
      }}
    </PileContext.Consumer>
  )
}

const CardFaceDown = (props) => (
      <PileContext.Consumer>
      { value => {
        return (
  <CardWrapper {...props} containerHeight={value.height} containerWidth={value.width}>
    <CardInnerFaceDown />
  </CardWrapper>
          )
      }}
    </PileContext.Consumer>
);


const CardEmpty = (props) => (
      <PileContext.Consumer>
      { value => {
        return (
  <CardWrapper {...props} containerHeight={value.height} containerWidth={value.width}>
    <CardInnerEmpty />
  </CardWrapper>
          )
      }}
    </PileContext.Consumer>
);

const CardDisplayEmpty = (props) => (
      <PileContext.Consumer>
      { value => {
        return (
  <CardWrapper {...props} containerHeight={value.height} containerWidth={value.width} />
          )
      }}
    </PileContext.Consumer>
);

const CardDroppable = ({ children, data, dropHandler, ...moreProps }) => {
  const props = {
    onDragOver: (ev) => {
      ev.preventDefault();
    },
    onDrop: (ev) => {

      ev.preventDefault();
      const dataFromTransfer = ev.dataTransfer.getData("pip");
      console.log('hej drop', dataFromTransfer)
      dropHandler(data, JSON.parse(dataFromTransfer))
    },
    ...moreProps,
  };

  return React.Children.map(children, child => {
    if (child) {
      return React.cloneElement(child, props);
    }
  });
};

const CardDraggable = ({ children, data, ...moreProps }) => {
  const props = {
    onDragStart: (ev) => {
      ev.dataTransfer.setData("pip", JSON.stringify(data));
      console.log('dragging', data)
      ev.dataTransfer.setDragImage(ev.target, 50, 50);
      ev.stopPropagation();
    },
    ...moreProps,
  };


  return React.Children.map(children, child => {
    if (child) {
      return React.cloneElement(child, props);
    }
  });
};

const CardToggleFaceUp = ({ label, suite, isFaceUp, onClick, ...props }) => {
  if (isFaceUp) {
    return (
      <CardFaceUp
        suite={suite}
        label={label}
        onClick={onClick}
        {...props}
      />
    );
  }
  return <CardFaceDown />;
}

export {
  CardFaceUp,
  CardFaceDown,
  CardEmpty,
  CardFan,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp,
  CardDisplayEmpty
};
