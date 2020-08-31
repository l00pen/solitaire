import styled, { css } from 'styled-components/macro';

const ButtonStylesWhenError = css`
  background-color: red;
  transition: all 0.5s ease-in;
`;

const ButtonStylesWhenSuccessful = css`
  background-color: green;
  transition: all 0.5s ease-in;
`;

const Button = styled.button`
  border: none;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryTextColor};
  padding: ${props => props.theme.padding}rem;
  border-radius: ${props => props.theme.borderRadius || 1}rem;
  width: inherit;
  transition: width 1s ease-in 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  font-size: inherit;
  line-height: 1;
  text-transform: uppercase;
  text-align: center;
  
  &:focus {
    outline: none;
  }
`;

const ButtonStyled = styled(Button)`
  background-color: ${(props) => (props.hover ? props.theme.primaryEnhancer : props.theme.primaryColor)};

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
  border: 0.06rem solid ${props => props.theme.secondaryColor};
  color: ${props => props.theme.secondaryColor};

  &:hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }
`;

const ButtonTertiaryAction = styled(Button)`
  background: none;
  padding: 0;
  text-align: left;
  color: ${props => props.theme.primaryColor};
`;

const ButtonList = styled.div`
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

export {
  Button,
  ButtonStyled,
  ButtonStyledFullWidth,
  ButtonPrimaryAction,
  ButtonSecondaryAction,
  ButtonTertiaryAction,
  ButtonList,
}