import React,{useEffect, useRef, useState} from 'react';
import styled from 'styled-components/macro';

import PileContext from '../../Contexts/PileProvider'

export const PileGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: ${({ size }) => size} 1 auto;
  
  & > * {
    margin: 0 0.5em 0 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const PileWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Pile = ({ pile, children }) => {
  const parentRef   = useRef(null);
  const [pileHeight, setPileHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const pileLength = (pile && pile.length) ? pile.length : 0; 
  const [nrOfCardsInPile, setNrOfCardsInPile] = useState(pileLength);

  useEffect(() => {
    if(parentRef.current) {        
      const cardHeight = 1.5 * parentRef.current.offsetWidth;
      setHeight(cardHeight);
      setWidth(parentRef.current.offsetWidth);
      setPileHeight(nrOfCardsInPile * cardHeight)
    }
  }, [parentRef])

  return(
    <PileContext.Provider value={{...pile, width, height, pileLength}}>
      <PileWrapper ref={parentRef}>
        {React.Children.map(children, child => {
          if (child) {
            return React.cloneElement(child, {width, height, pileLength});
          }
        })}
      </PileWrapper>
    </PileContext.Provider>
  );
}
