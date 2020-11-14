import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import clsx from 'clsx';
import {
  NowYear,
  NowMonth,
  Today,
  CurrentYear,
  CurrentMonth,
} from '../../Recoil/DateData';
import { makeStyles, GridList, GridListTile } from '@material-ui/core';
import YearCalendarMonth from './YearCalendarMonth';
import { useWindowDimensions } from '../../Hooks/useWindowDimensions';
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
  gridTile: {
    maxWidth: 'calc((100vw - 80px) / 4)',
    margin: '0 auto',
  },
  gridTileSm: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 3)',
  },
  gridTileXs: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 2)',
  },
}));

const YearCalendar = () => {
  const drawerWidth = useRecoilValue(DrawerWidth);
  const classes = useStyles(drawerWidth);
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const setToday = useSetRecoilState(Today);
  const setCurrentYear = useSetRecoilState(CurrentYear);
  const setCurrentMonth = useSetRecoilState(CurrentMonth);
  const drawerOpen = useRecoilValue(MenuDrawerState);

  useEffect(() => {
    const todayData = new Date();
    setNowYear(todayData.getFullYear());
    setNowMonth(todayData.getMonth());
    setToday(todayData.getDate());
    setCurrentYear(nowYear);
    setCurrentMonth(nowMonth);
  }, [
    setNowYear,
    setNowMonth,
    setToday,
    setCurrentYear,
    setCurrentMonth,
    nowYear,
    nowMonth,
  ]);

  const month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const { width } = useWindowDimensions();
  console.log(width);

  return (
    <div
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <GridList
        cellHeight={'auto'}
        className={classes.gridList}
        cols={width > 900 ? 4 : width > 600 ? 3 : 2}
        rows={width > 900 ? 3 : width > 600 ? 4 : 5}
      >
        {month.map(num => {
          return (
            <GridListTile
              className={
                width > 900
                  ? classes.gridTile
                  : width > 600
                  ? classes.gridTileSm
                  : classes.gridTileXs
              }
            >
              <YearCalendarMonth currentMonth={num} />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default YearCalendar;
