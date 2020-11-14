import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AUTH/AuthService';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import clsx from 'clsx';
import {
  NowYear,
  NowMonth,
  Today,
  DayOfWeek,
  CurrentYear,
  CurrentMonth,
} from '../../Recoil/DateData';
import { AnchorEl, PopperToggle } from '../../Recoil/PopperToggleState';
import { OneWeekWeatherData } from '../../Recoil/OneWeekWeatherData';
import { PlansData } from '../../Recoil/PlansData';
import { DrawerWidth } from '../../Recoil/DrawerWidth';
import { MenuDrawerState } from '../../Recoil/MenuDrawerState';

import MonthCalendarGrid from './MonthAtoms/MonthCalendarGrid';
import MonthPopper from './MonthAtoms/MonthPopper';

import { makeStyles, GridList, GridListTile, ClickAwayListener } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import OpenWeatherAPI from '../../API/OpenWeatherAPI';
import { db } from '../../utils/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
  gridList: {
    height: `calc(100vh - 150px)`,
  },
  gridTile: {
    borderBottom: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    transition: '.3s',
    '&:hover': { backgroundColor: '#eee' },
    cursor: 'pointer',
  },
  openGridTile: {
    borderBottom: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
  },
  labels: {
    position: 'absolute',
    height: 30,
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const MonthCalendar = () => {
  const drawerWidth = useRecoilValue(DrawerWidth);
  const classes = useStyles(drawerWidth);
  const [anchorEl, setAnchorEl] = useRecoilState(AnchorEl);
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const setToday = useSetRecoilState(Today);
  const [plansData, setPlansData] = useRecoilState(PlansData);
  const setDayOfWeek = useSetRecoilState(DayOfWeek);
  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);
  const [open, setOpen] = useRecoilState(PopperToggle);
  const [currentDay, setCurrentDay] = useState('');
  const setOneWeekWeatherData = useSetRecoilState(OneWeekWeatherData);
  const drawerOpen = useRecoilValue(MenuDrawerState);
  const user = useContext(AuthContext);

  useEffect(() => {
    const myPlans = async () => {
      try {
        const querySnapshot = await db
          .collection('users')
          .doc(user.uid)
          .collection('Plans')
          .get();
        const fetchPlans = querySnapshot.docs.map(doc => doc.data());
        setPlansData(fetchPlans);
      } catch (error) {
        console.log(error);
      }
    };
    myPlans();
  }, [setPlansData, user.uid]);

  useEffect(() => {
    const todayData = new Date();
    setNowYear(todayData.getFullYear());
    setNowMonth(todayData.getMonth());
    setToday(todayData.getDate());
    setDayOfWeek(todayData.getDay());
    setCurrentYear(nowYear);
    setCurrentMonth(nowMonth);
    const weatherApi = async () => {
      try {
        const weatherItems = await OpenWeatherAPI.OpenWeather();
        const oneWeekWeather = weatherItems.data.daily;
        setOneWeekWeatherData(oneWeekWeather);
      } catch (error) {
        console.log(error);
      }
    };
    weatherApi();

    return () => {
      setNowYear('');
      setNowMonth('');
      setToday('');
      setDayOfWeek('');
      setCurrentYear('');
      setCurrentMonth('');
      setOneWeekWeatherData([]);
    };
  }, [
    nowMonth,
    nowYear,
    setNowYear,
    setNowMonth,
    setToday,
    setDayOfWeek,
    setCurrentYear,
    setCurrentMonth,
    setOneWeekWeatherData,
  ]);

  const popperId = open ? 'simple-popper' : undefined;
  const handleClickCalendar = e => {
    setAnchorEl(e.currentTarget);
    setCurrentDay(e.currentTarget.id);
    setOpen(true);
  };

  // 先月の日数
  const beforeMonth = new Date(currentYear, currentMonth, 0);
  const beforeMonthLength = beforeMonth.getDate();
  // 今月の日数
  const thisMonth = new Date(currentYear, currentMonth + 1, 0);
  const thisMonthLength = thisMonth.getDate();

  const calendar = [];

  const currentFirstData = new Date(currentYear, currentMonth, 1);
  const currentFirstDay = currentFirstData.getDay(); // 0~6 日~土

  Array.apply(null, { length: beforeMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const beforeMonthDay = new Date(currentYear, currentMonth - 1, 1 + i);
      const beforeMonthDayId = `${beforeMonthDay.getFullYear()}-${
        beforeMonthDay.getMonth() + 1 < 10 ? '0' : ''
      }${beforeMonthDay.getMonth() + 1}-${
        beforeMonthDay.getDate() < 10 ? '0' : ''
      }${beforeMonthDay.getDate()}`;
      const result = plansData
        .map(e => e.event.Key)
        .filter(value => {
          return value === beforeMonthDayId;
        });
      calendar.push(
        <GridListTile
          id={beforeMonthDayId}
          className={!open ? classes.gridTile : classes.openGridTile}
          key={beforeMonthDayId}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid
            id={beforeMonthDayId}
            day={beforeMonthDay}
            propsStyle={'#aaa'}
          />
          <div className={classes.labels}>
            {result[0] ? (
              <Alert severity='success' icon={false}>
                {plansData.PlanName}
              </Alert>
            ) : null}
            {result[1] ? <Alert severity='success' icon={false}></Alert> : null}
            {result.length > 2 ? (
              <div
                style={{ height: 10, margin: 0, fontSize: 10, textAlign: 'end' }}
              >{`他${result.length - 2}件...`}</div>
            ) : null}
          </div>
        </GridListTile>
      );
    });

  switch (currentFirstDay) {
    case 0: // 日曜
      calendar.splice(0, beforeMonthLength - 0);
      break;
    case 1: // 月曜
      calendar.splice(0, beforeMonthLength - 1);
      break;
    case 2: // 火曜
      calendar.splice(0, beforeMonthLength - 2);
      break;
    case 3: // 水曜
      calendar.splice(0, beforeMonthLength - 3);
      break;
    case 4: // 木曜
      calendar.splice(0, beforeMonthLength - 4);
      break;
    case 5: // 金曜
      calendar.splice(0, beforeMonthLength - 5);
      break;
    case 6: // 土曜
      calendar.splice(0, beforeMonthLength - 6);
      break;
    default:
      break;
  }

  Array.apply(null, { length: thisMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const day = new Date(currentYear, currentMonth, 1 + i);
      const dayId = `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${
        day.getMonth() + 1
      }-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`;
      const result = plansData
        .map(e => e.event.Key)
        .filter(value => {
          return value === dayId;
        });
      calendar.push(
        <GridListTile
          className={!open ? classes.gridTile : classes.openGridTile}
          id={dayId}
          key={dayId}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid id={dayId} day={day} />
          <div className={classes.labels}>
            {result[0] ? <Alert severity='success' icon={false}></Alert> : null}
            {result[1] ? <Alert severity='success' icon={false}></Alert> : null}
            {result.length > 2 ? (
              <div
                style={{ height: 10, margin: 0, fontSize: 10, textAlign: 'end' }}
              >{`他${result.length - 2}件...`}</div>
            ) : null}
          </div>
        </GridListTile>
      );
    });

  Array.apply(null, { length: 42 - calendar.length })
    .map(Number.call, Number)
    .forEach(i => {
      const afterMonthDay = new Date(currentYear, currentMonth + 1, 1 + i);
      const afterMonthDayId = `${afterMonthDay.getFullYear()}-${
        afterMonthDay.getMonth() + 1 < 10 ? '0' : ''
      }${afterMonthDay.getMonth() + 1}-${
        afterMonthDay.getDate() < 10 ? '0' : ''
      }${afterMonthDay.getDate()}`;
      const result = plansData
        .map(e => e.event.Key)
        .filter(value => {
          return value === afterMonthDayId;
        });
      calendar.push(
        <GridListTile
          className={!open ? classes.gridTile : classes.openGridTile}
          id={afterMonthDayId}
          key={afterMonthDayId}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid
            id={afterMonthDayId}
            day={afterMonthDay}
            propsStyle={'#aaa'}
          />
          <div className={classes.labels}>
            {result[0] ? <Alert severity='success' icon={false}></Alert> : null}
            {result[1] ? <Alert severity='success' icon={false}></Alert> : null}
            {result.length > 2 ? (
              <div
                style={{ height: 10, margin: 0, fontSize: 10, textAlign: 'end' }}
              >{`他${result.length - 2}件...`}</div>
            ) : null}
          </div>
        </GridListTile>
      );
    });

  const handleClickAway = () => (open ? setOpen(false) : null);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        className={clsx(classes.appBar + ' ' + classes.root, {
          [classes.appBarShift + ' ' + classes.root]: drawerOpen,
        })}
      >
        <GridList cellHeight={'auto'} className={classes.gridList} cols={7} row={6}>
          {calendar}
          <MonthPopper popperId={popperId} anchorEl={anchorEl} day={currentDay} />
        </GridList>
      </div>
    </ClickAwayListener>
  );
};

export default MonthCalendar;
