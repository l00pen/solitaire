import React from 'react';
import styled from 'styled-components/macro';
import sprite from './images/cards/lov.svg';

import {
  cardMinWidth,
  cardMaxWidth,
} from 'utils/styleVariables';

const Card = styled.div`
  min-width: ${cardMinWidth}px;
  max-width: ${cardMaxWidth}px;
`;

const CardStacked = styled(Card)`
  position: absolute;
`;

const CardFan = styled.div`
  position: absolute;
  top: ${(props) => props.cardIndex === 0 ? 0 : 15}px;
`;

const CardFaceUp = (props) => {
  const { id, label, suite, onClick, ...moreProps } = props
  if (!id) {
    return <Card suite={suite}>Soemthings wrong with card</Card>;
  }
  const newId = id.match(/[a-z]+|[^a-z]+/gi);

  let idValue = newId[1];
  let value = moreProps.value;
  if (idValue === '1') {
    idValue = 'A';
    value = 14;
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

  let valueOffset = `-${((value - 2))*100}%`;
  let suiteOffset = 0;
  if (suite === 'spades') {
    suiteOffset = '1%';
  } else if (suite === 'diamonds') {
    suiteOffset = '-280%';
  } else if (suite === 'clubs') {
    suiteOffset = '-137%';
  } else if (suite === 'hearts') {
    suiteOffset = '-423%';
  }

  return (
    <Card suite={suite} onClick={onClick} {...moreProps}>
      <div style={{
        overflow: 'hidden',
        paddingBottom: '138%',
        height: 0,
        border: '1px solid papayawhip',
        borderRadius: '3px',
        backgroundColor: 'white',
      }}>
        <img
          id={`${moreProps.value}-${suite}`}
          style={{
            maxWidth: '1400%',
            width: '1400%',
            margin: `${suiteOffset} 0 0 ${valueOffset}`,
          }}
          alt='card'
          src={sprite}
        />
      </div>
    </Card>
  )
} 

const CardFaceDown = (props) => (
  <Card {...props}>
    <div style={{
      overflow: 'hidden',
      height: 0,
      paddingBottom: '138%',
      border: '1px solid papayawhip',
      borderRadius: '3px',
    }}>
      <img
        style={{
          maxWidth: '1500%',
          width: '1500%',
          margin: '-162% 0 0 -1400%',
        }}
        alt='card'
        src={sprite}
      />
    </div>
  </Card>
);

const CardEmpty = ({ onClick, ...props }) => (
  <Card onClick={onClick} {...props}>
    <div style={{
      overflow: 'hidden',
      height: 0,
      paddingBottom: '138%',
      border: '1px solid papayawhip',
      borderRadius: '3px',
    }}>
      <img
        style={{
          maxWidth: '1500%',
          width: '1500%',
          margin: '0% 0 0 -1400%',
        }}
        alt='card'
        src={sprite}
      />
    </div>
  </Card>
);

const CardDroppable = ({ children, data, dropHandler }) => {
  const props = {
    onDragOver: (ev) => {
      ev.preventDefault();
    },
    onDrop: (ev) => {
      ev.preventDefault();
      const dataFromTransfer = ev.dataTransfer.getData("pip");
      dropHandler(data, JSON.parse(dataFromTransfer))
    },
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
