import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

// custom middle
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatch a function');
  } else {
    console.log('dispatch an action');
  }

  const res = next(action);
  return res;
};

const middlewares = [logger, thunk];

export default createStore(reducers, applyMiddleware(...middlewares));
