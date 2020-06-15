import React, { useState } from 'react';
import Root from './containers/Root'
import { Login } from './containers/forms/Login'

const App = () => {

  //config();
  const [authSuccess, setAuthSucces] = useState(false);

  return (<>
    {!authSuccess &&
      <Login setAuth={setAuthSucces}/>
    }
    {authSuccess &&
      <Root />
    }
  </>
  );
}

export default App;
