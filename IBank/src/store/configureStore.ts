import { combineReducers, createStore } from 'redux';
// import { routerReducer, routerMiddleware } from 'react-router-redux';
import { CounterReducer } from './counter/reducers';

export const configureStore = () => {
    const reducers = {
        counter: CounterReducer
    };

    const rootReducer = combineReducers({
        ...reducers
    });

    return createStore(
        rootReducer
    );
}