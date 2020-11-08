import React, { useState, useContext } from 'react';
import { AuthContext } from '../AUTH/AuthService';
import { Link, Redirect, withRouter } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

import firebase from '../Config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    maxWidth: 400,
    padding: 20,
    margin: '0 auto',
    marginTop: '25vh',
  },
  content: {
    margin: '0 auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  appTitle: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    textAlign: 'center',
    margin: 10,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: theme.spacing(2),
  },
  textField: {
    width: '31.7ch',
  },
}));

const SignIn = ({ history }) => {
  const [email, setEmail] = useState('');
  const [passValues, setPassValues] = useState({
    password: '',
    showPassword: false,
  });
  // const [currentEmail, setCurrentEmail] = useState('');
  // const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const handleChange = prop => event => {
    setPassValues({ ...passValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassValues({ ...passValues, showPassword: !passValues.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, passValues.password)
      .then(() => {
        history.push('/');
        console.log('サインイン完了');
      })
      .catch(() => {
        alert('メールアドレスかパスワードが間違っています。');
      });
  };

  const user = useContext(AuthContext);

  // const handleReset = () => {
  //   firebase
  //     .auth()
  //     .sendPasswordResetEmail(currentEmail)
  //     .then(function () {
  //       window.alert('パスワードリセット用メールを送信しました。');
  //       history.push('/SignIn');
  //     })
  //     .catch(function (error) {
  //       window.alert(error);
  //     });
  // };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Card className={classes.root}>
      <form onSubmit={handleSubmit}>
        <CardContent className={classes.content}>
          <Typography className={classes.appTitle} color='textSecondary' gutterBottom>
            Calendar App
          </Typography>
          <Typography variant='h5' component='h2' className={classes.title}>
            サインイン
          </Typography>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <TextField
              id='outlined-uncontrolled'
              type='email'
              label='メールアドレス'
              variant='outlined'
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>パスワード</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={passValues.showPassword ? 'text' : 'password'}
              value={passValues.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {passValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={83}
            />
          </FormControl>
          {/* <Typography variant='body2' component='p'>
          メールアドレスを忘れた場合
        </Typography> */}
        </CardContent>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Link to='/SignUp'>
            <Typography variant='body2' component='p'>
              アカウントを作成
            </Typography>
          </Link>
          <Button type='submit' variant='contained' size='large' color='primary'>
            サインイン
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default withRouter(SignIn);
