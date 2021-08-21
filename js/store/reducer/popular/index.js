import types from '../../action/types';

const defaultState = {};
const DEFAULT_PAGE_INDEX = 1;

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          items: action.items,
          hideLoadingMore: false,
          pageIndex: DEFAULT_PAGE_INDEX,
          isLoading: false,
        },
      };

    case types.POPULAR_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          pageIndex: DEFAULT_PAGE_INDEX,
          hideLoadingMore: true,
          isLoading: true,
        },
      };

    case types.POPULAR_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          pageIndex: DEFAULT_PAGE_INDEX,
          isLoading: false,
        },
      };

    case types.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };

    case types.POPULAR_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      };

    default:
      return state;
  }
}
