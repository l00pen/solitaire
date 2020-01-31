import spiderReducer from './spiderReducer';

it('init state', () => {
  const present = spiderReducer(undefined, {});
  expect(Object.keys(present.present)).toMatchSnapshot();
});
