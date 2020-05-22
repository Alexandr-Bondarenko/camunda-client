import React from 'react';
import Root from './containers/Root'
import {config} from 'dotenv'

const App = () => {

  config();

  return (
    <div >
      <Root/>
    </div>
  );
}

export default App;
