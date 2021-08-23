import {DarkTheme, LightTheme} from '@react-navigation/native';

export const THEME_NAMES = {
  light: 'light',
  dark: 'dark',
  blueLight: 'blueLight',
  blueDark: 'blueDark',
};

export const THEMES = {
  dark: {
    ...DarkTheme,
  },
  light: {
    ...LightTheme,
  },
  blueLight: {
    dark: false,
    colors: {
      background: 'rgb(242, 242, 242)',
      card: '#2196f3',
      text: 'rgb(28, 28, 30)',
      border: 'transparent',
      notification: 'rgb(255, 69, 58)',
    },
    primary: '#2196f3',
  },
  blueDark: {
    dark: false,
    colors: {
      background: 'rgb(242, 242, 242)',
      card: '#2196f3',
      text: 'rgb(28, 28, 30)',
      border: 'transparent',
      notification: 'rgb(255, 69, 58)',
    },
    primary: '#2196f3',
  },
};
