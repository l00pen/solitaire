import styled from 'styled-components';

const Pile = styled.ul`
  width: 3.5em;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`;

export const PileEmpty = styled(Pile)`
  height: 5.17em; /* should be a min height or someting from a "pile" */
  border: 1px solid aliceblue;
`;

export default Pile;