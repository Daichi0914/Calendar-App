import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DrawerWidth } from '../../Recoil/DrawerWidth';
import { MenuDrawerState } from '../../Recoil/MenuDrawerState';
import { PopperToggle } from '../../Recoil/PopperToggleState';
import { auth } from '../../utils/firebase';
import HeaderDrawer from './HeaderAtoms/HeaderDrawer';
import UnitChangeButton from './HeaderAtoms/UnitChangeButton';

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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: drawerWidth => `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth => drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth => drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth => drawerWidth,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      display: 'block',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    marginLeft: 30
  },
}));

const Header = appKind => {
  const drawerWidth = useRecoilValue(DrawerWidth);
  const classes = useStyles(drawerWidth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useRecoilState(PopperToggle);
  const [drawerOpen, setDrawerOpen] = useRecoilState(MenuDrawerState);

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

  const handleDrawerToggle = () => {
    return drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true);
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
      {/* <MenuItem onClick={handleMenuClose}>アカウント</MenuItem> */}
      <MenuItem onClick={signOutButton}>サインアウト</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position='fixed'
        style={{ position: 'fixed' }}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          {appKind.appKind === 'Calender' ? (
            <>
              <Typography className={classes.title} variant='h6' noWrap>
                カレンダー
              </Typography>
              <div className={classes.grow} />
              <div className={classes.root}>
                <UnitChangeButton />
              </div>
              <div className={classes.grow} />
              <Link to='/Constellation_Identification_App' style={{ textDecoration: 'none' }}>
                <Button variant='contained'>
                  <span>星座判別アプリへ</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Typography className={classes.title} variant='h6' noWrap>
                星座アプリ
              </Typography>
              <div className={classes.grow} />
              <div className={classes.root}>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Button variant='contained'>
                    <span>カレンダーアプリへ戻る</span>
                  </Button>
                </Link>
              </div>
            </>
          )}
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
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <HeaderDrawer />
      </Drawer>
      {renderMenu}
    </div>
  );
};

export default withRouter(Header);
