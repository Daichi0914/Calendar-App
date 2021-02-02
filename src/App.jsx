import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './AUTH/AuthService';
import ConstellationIdentification from './pages/ConstellationIdentification';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Router basename={'/'}>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/SignUp' component={SignUp} />
            <Route
              exact
              path='/Constellation_Identification_App'
              component={ConstellationIdentification}
            />
          </Switch>
        </Router>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default App;
