import reducers from './index';
import initialState from './states/initialState';

test('reducers', () => {
  let state;
  state = reducers(initialState, {});
  expect(state).toEqual(initialState);
});