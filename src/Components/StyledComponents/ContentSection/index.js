import styled, {css} from 'styled-components/macro';

export const sectionTopDistance = css`
  margin-top: ${(props) => props.theme.spacing.xxsmall};
`;

export const Section = styled.section`
  ${sectionTopDistance}
`;

const ContentSection = styled(Section)`
  background-color: ${({ theme }) => theme.palette.primary.light};
  color: ${({theme}) => theme.palette.common.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: ${(props) => props.theme.spacing.medium};
`;

export default ContentSection;