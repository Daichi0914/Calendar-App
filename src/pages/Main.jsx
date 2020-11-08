import React, { useContext } from 'react';
import { AuthContext } from '../AUTH/AuthService';
import { Link, Redirect, withRouter } from 'react-router-dom';

const Main = () => {
  const user = useContext(AuthContext);

  if (!user) {
    return <Redirect to='/SignIn' />;
  }

  return (
    <div>Main</div>
  );
};

export default withRouter(Main);
