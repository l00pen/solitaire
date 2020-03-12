import React from 'react';
import styled from 'styled-components';
import sprite from './images/cards/lov.svg';

import {
  cardMinWidth,
  cardMaxWidth,
} from '../styleVariables';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
  return images;
}

const images = importAll(require.context('./images/cards', false, /\.(png|jpe?g|svg)$/));

const Card = styled.div`
  min-width: ${cardMinWidth}px;
  max-width: ${cardMaxWidth}px;
  color: ${(props) => props.suite === 'black' ? 'black' : 'red'};
  img{
    width: 100%;
  }
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

  let valueOffset = `-${((value - 2))*100 - 1}%`;
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
          margin: '-167% 0 0 -1400%',
        }}
        alt='card'
        src={sprite}
      />
    </div>
  </Card>
);

const CardEmpty = ({ onClick, ...props }) => (
  <Card onClick={onClick} {...props}>
    <img src={images['empty.png']} alt='card background' />
  </Card>
);

const CardDroppable = ({ children, data, dropHandler }) => {
  const props = {
    onDragOver: (ev) => {
      ev.preventDefault();
    },
    onDrop: (ev) => {
      console.log('yumahu', data)
      ev.preventDefault();
      const dataFromTransfer = ev.dataTransfer.getData("pip");

      dropHandler(data, JSON.parse(dataFromTransfer))
    },
  };

  console.log('children onDrop', React.Children.count(children))
  return React.Children.map(children, child => {
    return React.cloneElement(child, props);
  });
};

const CardDraggable = ({ children, data, draggable }) => {
  const props = {
    onDragStart: (ev) => {
      ev.dataTransfer.setData("pip", JSON.stringify(data));
      ev.dataTransfer.setDragImage(ev.currentTarget, 50, 15);
      ev.stopPropagation();
    },
    draggable,
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
