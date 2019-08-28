import {createStore,applyMiddleware} from 'redux';
import root from './reducers';
import ReduxThunk from 'redux-thunk'

export default function configureStore(){
  return  createStore(root,applyMiddleware(ReduxThunk) )
};