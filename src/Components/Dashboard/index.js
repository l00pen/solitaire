import React from 'react';
import styled from 'styled-components/macro';

import {
  ButtonPrimaryAction,
  ButtonSecondaryAction,
  ButtonList,
} from 'Components/StyledComponents/Buttons';

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

const Dashboard = ({undo, redeal}) => {
  return (
    <DashboardStyled>
      <ButtonList>
        <ButtonSecondaryAction onClick={undo} disabled={!undo}>Undo</ButtonSecondaryAction>
        <ButtonPrimaryAction onClick={redeal}>New Deal</ButtonPrimaryAction>
      </ButtonList>
    </DashboardStyled>
  );
}

export default Dashboard;
