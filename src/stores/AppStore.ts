import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';

const reducer = new RootReducer();
const appStore = createStore(reducer.reduceAction);
export default appStore;