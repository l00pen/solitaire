import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import CardTableau from '../CardTableau';

import './styles.css';

const getEmptyClass = (list) => {
  return list.length === 0 ? 'empty' : '';
};

const PileWaste = ({ pile }) => {
  return (
    <ul className={`Waste-pile ${getEmptyClass(pile)}`}>
      {pile.map((card, i) => {
        if (i === pile.length - 1) {
          return (
            <li className='App-card Waste-card' key={card.id}>
              <Draggable draggableId={card.id} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardTableau {...card} />
                  </div>
                )}
              </Draggable>
            </li>
          );
        }
        return (
          <li className='App-card Waste-card' key={card.id}>
            <CardTableau {...card} />
          </li>
        )
      })}
    </ul>
  );
}

export default PileWaste;