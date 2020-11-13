import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import UnitChangeButton from './HeaderAtoms/UnitChangeButton';
import { PopperToggle } from '../../Recoil/PopperToggleState';

import { auth } from '../../utils/firebase';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useRecoilState(PopperToggle);

  const signOutButton = () => {
    auth
      .signOut()
      .then(() => {
        console.log('サインアウトしました');
      })
      .catch(error => {
        console.log(`サインアウト時にエラーが発生しました (${error})`);
      });
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    return open
      ? (setOpen(false), setAnchorEl(event.currentTarget))
      : setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    return open ? (setOpen(false), setAnchorEl(null)) : setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>アカウント</MenuItem>
      <MenuItem onClick={() => signOutButton()}>サインアウト</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static' style={{ position: 'fixed' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            カレンダー
          </Typography>
          <div className={classes.grow} />
          <div className={classes.root}>
            <UnitChangeButton />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default withRouter(Header);