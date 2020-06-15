import { DECREMENT, INCREMENT, CounterActionTypes, ICounterState } from './types'

const initialState: ICounterState = {
    count: 0
}

export const CounterReducer = (state = initialState, action: CounterActionTypes): ICounterState => {

    switch (action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }

        case DECREMENT:
            return { ...state, count: state.count - 1 }
        default:
            return state
    }
}