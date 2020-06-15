import { CounterActionTypes, INCREMENT, DECREMENT } from './types'

export const CounterIncrement = (): CounterActionTypes => {
    return {
        type: INCREMENT
    };
}
export const CounterDecrement = () => {
    return {
        type: DECREMENT
    };
}