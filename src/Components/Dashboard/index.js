import React from 'react';
import styled from 'styled-components/macro';

import {
  ButtonPrimaryAction,
  ButtonSecondaryAction,
  ButtonList,
} from 'Components/StyledComponents/Buttons';

export const DashboardStyled = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;

  & > * {
    flex: 1;
    margin: 0 ${({ theme }) => theme.spacing.xxsmall};
  }

  & > *:first-child {
    margin-left: 0;
  } 

  & > *:last-child {
    margin-right: 0;
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
