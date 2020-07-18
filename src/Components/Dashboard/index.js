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

const Option = styled.option`
  text-transform: capitalize;
`

const Dashboard = ({undo, redeal, games, selectedGame, setSelectedGame}) => {
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
        {Object.values(games).map((game) => (
          <Option key={game} value={game}>
            {game}
          </Option>
        ))}
      </Select>
    </DashboardStyled>
  );
}

export default Dashboard;
