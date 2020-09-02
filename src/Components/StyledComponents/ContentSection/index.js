import styled from 'styled-components/macro';

const ContentSection = styled.section`
  background-color: rgba(255,255,255,0.7);
  color: rgba(3,2,20,0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  padding: 1em;
`;

export const GameTop = styled.section`
  margin: 1em 0;
  width: 100%;
  display: flex;

  & > div {
    flex: 1 1 0;
  }
`

export default ContentSection;