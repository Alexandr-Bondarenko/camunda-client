import React, { ReactElement, ReactHTMLElement, useState } from 'react';
import { connect, ConnectedProps, DefaultRootState } from 'react-redux';
import { ICounterState, INCREMENT, DECREMENT, CounterActionTypes } from '../../store/counter/types'
import { createStore, Store } from 'redux';
import { CounterReducer } from '../../store/counter/reducers'
import { Input } from 'semantic-ui-react';
import ReactDOM from 'react-dom';


const mapState = (state: ICounterState) => ({
  count: state.count
});
const mapDispatch = {
  increment: () => ({ type: INCREMENT }),
  decrement: () => ({ type: DECREMENT }),
}


//const connector = connect(mapState, {});
//type PropsFromRedux = ConnectedProps<typeof connector>
interface IProps<ICounterState, CounterActionTypes> {
  state: ICounterState,
  actions: CounterActionTypes
}
export const Counter = () => {

  const [ss, setSS] = useState({ counter: 0 });
  //const s = ({ ss }: any) => {(ss.counter + 1 )}
  let rows = [];

  for (let i = 0; i < 5; i++) {
    rows.push(<Row i={i} />)

  }
console.log('ss',ss)
  return (
    <div>
      <span>{}</span>      
      <table>
        {rows}
      </table>
    </div>
  )
}

interface IRow {
  i: number
}
const Row = ({ i }: IRow) => {

  return (
    <tr>Row number {i}</tr>
  );
}

