import React from 'react';
import { useRecoilValue } from 'recoil';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { DrawerWidth } from '../../Recoil/DrawerWidth';
import { MenuDrawerState } from '../../Recoil/MenuDrawerState';

const useStyles = makeStyles(theme => ({
  gridList: {
    height: `calc(100vh - 210px)`,
    padding: '40px 30px',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth => drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const WeekCalendar = () => {
  const drawerWidth = useRecoilValue(DrawerWidth);
  const classes = useStyles(drawerWidth);
  const drawerOpen = useRecoilValue(MenuDrawerState);

  return (
    <div
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      週表示
    </div>
  );
};

export default WeekCalendar;
