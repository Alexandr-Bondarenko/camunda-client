import { CounterReducer } from './counter/reducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers(
    {
        counter: CounterReducer
    }
);

export type RootState = ReturnType<typeof rootReducer>;