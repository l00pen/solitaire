import React from 'react';
import styled from 'styled-components';

import './styles.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => ( images[item.replace('./', '')] = r(item) ));
  return images;
}

const images = importAll(require.context('./images/cards', false, /\.(png|jpe?g|svg)$/));

const CardFaceUp = (props) => {
  const { id, label, suite, onClick, ...moreProps } = props
  if (!id) {
    console.log(props)
    return <div className={`Card Card-suite-${suite}`}>Soemthings wrong with card</div>;
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

  return(
    <div className={`Card Card-suite-${suite}`} onClick={onClick} {...moreProps}>
      <img src={images[`${idValue}${idSuite}.png`]} alt='card background' />
    </div>
  )}

const CardFaceDown = (props) => (
  <div className={`Card`} {...props}>
    <img src={images['green_back.png']} alt='card background' />
  </div>
);

const CardEmpty = () => (
  <div className={`Card`}>
    <img src={images['purple_back.png']} alt='card background' />
  </div>
);

const CardStacked = styled.li`
  position: absolute;
`;

const CardFan = styled.li`
  position: absolute;
  width: 50px;
  top: ${(props) => (props.cardIndex * 15)}px;
`;

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

  const tmp = React.cloneElement(children, props);
  return tmp;
};

const CardDraggable = ({ children, data, draggable }) => {
  const props = {
    onDragStart: (ev) => {
      ev.dataTransfer.setData("pip", JSON.stringify(data));
    },
    draggable,
  };

  const tmp = React.cloneElement(children, props);
  return tmp;
};

const CardToggleFaceUp = ({ label, suite, isFaceUp, onClick, ...props }) => {
  if (isFaceUp) {
    return <CardFaceUp suite={suite} label={label} onClick={onClick} {...props} />;
  }
  return <CardFaceDown />;
}

export {
  CardFaceUp,
  CardFaceDown,
  CardEmpty,
  CardFan,
  CardStacked,
  CardDroppable,
  CardDraggable,
  CardToggleFaceUp
};
