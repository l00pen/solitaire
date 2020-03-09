import React from 'react';
import styled from 'styled-components';
import sprite from './images/cards/spriteCard.png';

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

const CardFan = styled(Card)`
  position: absolute;
  top: ${(props) => props.cardIndex === 0 ? 0 : 15}px;
`;

const CardFaceUp = (props) => {
  const { id, label, suite, onClick, ...moreProps } = props
  if (!id) {
    return <Card suite={suite}>Soemthings wrong with card</Card>;
  }
  const newId = id.match(/[a-z]+|[^a-z]+/gi);
  const idSuite = newId[0].toUpperCase();
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

  if (suite === 'diamonds') {
    const valueOffset = `-${((moreProps.value + 1) * 152 / 2330) * 1200}%`;
    console.log('pip', moreProps.value)
    return (
      <Card suite={suite} onClick={onClick} {...moreProps}>
        <div style={{
          overflow: 'hidden',
          maxHeight: '115px',
        }}>
          <img
            id={moreProps.value}
            style={{
              maxWidth: '1657%',
              width: 'unset',
              margin: `-15% 0 0 ${valueOffset}`,
            }}
            alt='card'
            src={sprite}
          />
        </div>
      </Card>
    )
  }

  return (
    <Card suite={suite} onClick={onClick} {...moreProps}>
      <img src={images[`${idValue}${idSuite}.png`]} alt='card background' />
    </Card>
  )
} 

const CardFaceDown = (props) => (
  <Card {...props}>
    <div style={{
      overflow: 'hidden',
      maxHeight: '115px',
    }}>
      <img
        style={{
          maxWidth: '1657%',
          width: 'unset',
          margin: '-339% 0 0 -1543%',
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
