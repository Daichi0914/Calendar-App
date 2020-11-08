import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';

import { AuthProvider } from './AUTH/AuthService';


const App = () => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Router basename={'/'}>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/SignUp' component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;