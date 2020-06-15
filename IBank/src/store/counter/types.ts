export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface ICounterState {
    count: number
}
interface ICounterActionIncrement {
    type: typeof INCREMENT
}
interface ICounterActionDecrement {
    type: typeof DECREMENT
}

export type CounterActionTypes = ICounterActionIncrement | ICounterActionDecrement;