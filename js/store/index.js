import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

// custom middle
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatch a function');
  } else {
    console.log('dispatch an action', action);
  }

  const res = next(action);
  console.log('>>> res', res);
  console.log('>>> nextState', store.getState());
  return res;
};

const middlewares = [logger, thunk];

export default createStore(reducers, applyMiddleware(...middlewares));
