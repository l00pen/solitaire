import React,{useEffect, useRef, useState} from 'react';
import styled from 'styled-components/macro';

import PileContext from '../../Contexts/PileProvider'

export const PileGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  & > * {
    margin: 0 0.5em 0 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const Pile = ({ pile, children }) => {
  const parentRef   = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if(parentRef.current) {        
      setHeight(parentRef.current.offsetHeight);
      setWidth(parentRef.current.offsetWidth);
    }
  }, [parentRef])

  return(
    <PileContext.Provider value={{...pile, width, height}}>
      <div style={{ position: 'relative', width:'100%', height: '100%'}} ref={parentRef}>
        {children}
      </div>
    </PileContext.Provider>
  );
}
