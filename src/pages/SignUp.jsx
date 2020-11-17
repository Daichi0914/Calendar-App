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

import { auth } from '../utils/firebase';

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

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [passValues, setPassValues] = useState({
    password: '',
    showPassword: false,
  });
  const [againPassValues, setAgainPassValues] = useState({
    password: '',
    showPassword: false,
  });
  const classes = useStyles();

  const user = useContext(AuthContext);

  const handleChange = prop => event => {
    setPassValues({ ...passValues, [prop]: event.target.value });
  };
  const handleAgainChange = prop => event => {
    setAgainPassValues({ ...againPassValues, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setPassValues({ ...passValues, showPassword: !passValues.showPassword });
  };
  const handleClickShowAgainPassword = () => {
    setAgainPassValues({
      ...againPassValues,
      showPassword: !againPassValues.showPassword,
    });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (passValues.password === againPassValues.password) {
      auth
        .createUserWithEmailAndPassword(email, passValues.password)
        .then(() => {
          window.alert('登録が完了しました。');
          props.history.push('/SignIn');
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/email-already-in-use') {
            window.alert('このメールアドレスは既に登録されています。');
          } else {
            window.alert('必要な情報を入力して下さい。');
          }
        });
    } else {
      window.alert('パスワードが一致しません。')
    }
  };

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
            アカウント登録
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
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              パスワード再確認
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={againPassValues.showPassword ? 'text' : 'password'}
              value={againPassValues.password}
              onChange={handleAgainChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowAgainPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {againPassValues.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={132}
            />
          </FormControl>
          {/* <Typography variant='body2' component='p'>
          メールアドレスを忘れた場合
        </Typography> */}
        </CardContent>
        <CardActions style={{ justifyContent: 'space-around' }}>
          <Link to='/SignIn'>
            <Typography variant='body2' component='p'>
              アカウントをお持ちの方
            </Typography>
          </Link>
          <Button type='submit' variant='contained' size='large' color='primary'>
            サインアアップ
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default withRouter(SignUp);
