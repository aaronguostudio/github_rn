import types from '../../action/types';
import {THEME_NAMES} from '../../../config/themes';

const defaultState = {
  theme: THEME_NAMES.blueLight,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case types.THEME_CHANGE:
      return {
        ...state,
        theme: action.payload,
      };
    case types.THEME_INIT:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}
