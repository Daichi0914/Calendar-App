import React, { useContext } from 'react';
import { AuthContext } from '../AUTH/AuthService';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    margin: '0 auto',
    marginTop: '40vh',
  },
}));

const Main = () => {
  const user = useContext(AuthContext);
  const classes = useStyles();

  // if (!user) {
  //   return <Redirect to='/SignIn' />;
  // }

  return (
    <>
      {!user ? (
        <div className={classes.root}>
          <CircularProgress
            className={classes.progress}
            style={{ width: 90, height: 90 }}
          />
        </div>
      ) : (
        <div>Main</div>
      )}
    </>
  );
};

export default withRouter(Main);
