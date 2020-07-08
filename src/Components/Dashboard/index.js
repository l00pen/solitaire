import React from 'react';
import styled from 'styled-components';

import { Button, ButtonPrimaryAction, ButtonSecondaryAction } from 'Components/Buttons';
import { Select } from 'Components/Select';

const DashboardStyled = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > *:first-child {
    flex: 2;
  } 

  & > *:last-child {
    flex: 1;
  }
`;

const ActionList = styled.section`
  display: flex;
  
  /* TODO change to button styled component name */
  & > ${Button} {
    margin: 0 0.125em 0 0;
  }

  & > ${Button}:last-child {
    margin-right: 0;
  }

  @media ${(props) => props.theme.breakpoints.l} {
    & > ${Button} {
      margin: 0 0.5em 0 0;
    }
  }
`;

const Dashboard = ({undo, redeal, selectedGame, setSelectedGame}) => {
  return (
    <DashboardStyled>
      <ActionList>
        <ButtonSecondaryAction onClick={undo}>Undo</ButtonSecondaryAction>
        <ButtonPrimaryAction onClick={redeal}>New Deal</ButtonPrimaryAction>
      </ActionList>
      <Select
        value={selectedGame}
        onChange={e => setSelectedGame(e.target.value)}
      >
        <option key={'klondike'} value={'klondike'}>
          Klondike
        </option>
        <option key={'spider'} value={'spider'}>
          Spider
        </option>
        <option key={'yukon'} value={'yukon'}>
          Yukon
        </option>
      </Select>
    </DashboardStyled>
  );
}

export default Dashboard;
