import {DATA_STORE_TYPES} from '../../../config/constants';
import DataStore from '../../../extend/dao/DataStore';
import types from '../types';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_INDEX = 1;
const NO_MORE_MESSAGE = 'no more';

export function onLoadTrendingData(
  storeName,
  url,
  pageSize = DEFAULT_PAGE_SIZE,
) {
  return dispatch => {
    dispatch({type: types.TRENDING_REFRESH, storeName});
    const dataStore = new DataStore();
    dataStore
      .fetchData(url, DATA_STORE_TYPES.trending)
      .then(data => {
        handleData(dispatch, storeName, data, pageSize);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: types.TRENDING_REFRESH_FAIL,
          storeName,
          error,
        });
      });
  };
}

export function onLoadMoreTrending(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback,
) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback(NO_MORE_MESSAGE);
        }

        dispatch({
          type: types.TRENDING_LOAD_MORE_FAIL,
          error: NO_MORE_MESSAGE,
          storeName,
          pageIndex: --pageIndex,
          projectModels: dataArray,
        });
      } else {
        const max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;

        dispatch({
          type: types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModels: dataArray.slice(0, max),
        });
      }
    }, 300);
  };
}

function handleData(dispatch, storeName, data, pageSize = DEFAULT_PAGE_SIZE) {
  let fixItems = [];
  if (data && data.data) {
    fixItems = data.data;
  }
  dispatch({
    type: types.TRENDING_REFRESH_SUCCESS,
    items: fixItems,
    projectModels:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    pageIndex: DEFAULT_PAGE_INDEX,
  });
}
