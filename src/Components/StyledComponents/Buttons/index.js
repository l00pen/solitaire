import styled, { css } from 'styled-components/macro';
import SettingsIcon from './settings-solid';

const ButtonStylesWhenError = css`
  background-color: red;
  transition: all 0.5s ease-in;
`;

const ButtonStylesWhenSuccessful = css`
  background-color: green;
  transition: all 0.5s ease-in;
`;

const ButtonNormalized = styled.button`
  border: none;
  cursor: pointer;
  font-size: inherit;
  color: inherit;
  background: none;

  &:focus {
    outline: none;
  }
`

const Button = styled(ButtonNormalized)`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.primary.contrastText};
  padding: ${props => props.theme.spacing.xsmall};
  border-radius: ${props => props.theme.shape.borderRadius};
  width: inherit;
  transition: width 1s ease-in 0.3s;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
`;

const ButtonStyled = styled(Button)`
  background-color: ${(props) => (props.hover ? props.theme.primaryEnhancer : props.theme.palette.primary.main)};

  ${props => props.error ? ButtonStylesWhenError : ''}
  ${props => props.success ? ButtonStylesWhenSuccessful : ''}
`;

const ButtonStyledFullWidth = styled(ButtonStyled)`
  width: 100%;
`;

const ButtonPrimaryAction = styled(Button)`
  &:hover {
    background-color: ${props => props.theme.primaryEnhancer};
  }
`;

const ButtonSecondaryAction = styled(Button)`
  background-color: transparent;
  border: 0.06rem solid ${props => props.theme.palette.primary.light};
  color: ${props => props.theme.palette.primary.light};

  &:hover {
    border-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.main};
  }
`;

const ButtonTertiaryAction = styled(Button)`
  background: none;
  padding: 0;
  text-align: left;
  color: ${props => props.theme.palette.primary.main};
`;

const ButtonList = styled.div`
  display: flex;
  
  & > ${Button} {
    margin: 0 ${({ theme }) => theme.spacing.xxsmall} 0 0;
  }

  & > ${Button}:last-child {
    margin-right: 0;
  }

  @media ${(props) => props.theme.breakpoints.l} {
    & > ${Button} {
      margin: 0 ${({ theme }) => theme.spacing.xsmall} 0 0;
    }
  }
`;

export {
  Button,
  ButtonStyled,
  ButtonStyledFullWidth,
  ButtonPrimaryAction,
  ButtonSecondaryAction,
  ButtonTertiaryAction,
  ButtonList,
  ButtonNormalized,

  SettingsIcon,
}