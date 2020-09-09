import { spacing, breakpoints } from './units';

const white = '#fff';
const black = '#111';

const palette = {
  common: {
    black,
    pink: 'pink',
    papayawhip: 'papayawhip',
    white,
  },
  primary: {
    main: '#40b4de',
    light: '#efefef',
    contrastText: '#0a3458',
  },
  // error: {
  //   main: '#A51C30',
  //   light: '#A7333F',
  //   contrastText: white,
  // },
  // grey: {
  //   100: '#EAEAEA',
  //   200: '#C9C5C5',
  //   300: '#888',
  //   400: '#666',
  // },
};

const shadows = {
  // 0: 'none',
  // 1: '0px 5px 10px rgba(0, 0, 0, 0.12)',
  // 2: '0px 8px 30px rgba(0, 0, 0, 0.24)',
};

const typography = {
  fontFamily:
    `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
};

const shape = {
  borderRadius: spacing['xxsmall'],
};

export const theme = {
  palette,
  shadows,
  typography,
  shape,
  spacing,
  breakpoints,
};