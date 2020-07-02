import React from 'react';
import styled from 'styled-components';

import { ButtonPrimaryAction, ButtonSecondaryAction } from '../Buttons';

const DashboardStyled = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ActionList = styled.section`
  display: flex;
  
  /* TODO change to button styled component name */
  & > button {
    margin: 0 0.5em 0 0;
  }

  & > button:last-child {
    margin-right: 0;
  }
`;

const Dashboard = ({undo, redeal, selectedGame, setSelectedGame}) => {
  return (
    <DashboardStyled>
      <ActionList>
        <ButtonSecondaryAction onClick={undo}>Undo</ButtonSecondaryAction>
        <ButtonPrimaryAction onClick={redeal}>New Deal</ButtonPrimaryAction>
      </ActionList>
      <select
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
      </select>
    </DashboardStyled>
  );
}

export default Dashboard;
