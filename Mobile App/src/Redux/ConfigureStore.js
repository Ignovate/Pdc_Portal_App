import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import CartReducer from '../Redux/CartReducers';
const AppReducers = combineReducers({
    cart: CartReducer,
});
const rootReducer = (state, action) => {
    return AppReducers(state, action)
}
export default createStore(rootReducer, applyMiddleware(thunk));