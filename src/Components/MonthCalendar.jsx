import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AUTH/AuthService';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  NowYear,
  NowMonth,
  Today,
  DayOfWeek,
  CurrentYear,
  CurrentMonth,
} from '../Recoil/DateData';
import { AnchorEl, PopperToggle } from '../Recoil/PopperToggleState';
import { OneWeekWeatherData } from '../Recoil/OneWeekWeatherData';
import { PlansData } from '../Recoil/PlansData';

import MonthCalendarGrid from '../Components/Atoms/MonthCalendarGrid';
import MonthPopper from './Atoms/MonthPopper';

import { makeStyles, GridList, GridListTile, ClickAwayListener } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import OpenWeatherAPI from '../API/OpenWeatherAPI';
import firebase from '../Config/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useRecoilState(AnchorEl);
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const [today, setToday] = useRecoilState(Today);
  const [plansData, setPlansData] = useRecoilState(PlansData);
  const setDayOfWeek = useSetRecoilState(DayOfWeek);
  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);
  const [open, setOpen] = useRecoilState(PopperToggle);
  const [currentDay, setCurrentDay] = useState('');
  const setOneWeekWeatherData = useSetRecoilState(OneWeekWeatherData);
  const user = useContext(AuthContext);

  useEffect(() => {
    const myListItem = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .collection('Plans')
          .get();
        const fetchPlans = querySnapshot.docs.map(
          // e => e.pf.sn.proto.mapValue.fields.event
          e => e.pf.sn.proto.mapValue.fields.event.mapValue.fields
        );
        setPlansData(fetchPlans);
        console.log(querySnapshot.docs[0].pf.sn);
      } catch (error) {
        console.log(error);
      }
    };
    myListItem();
  }, [open]);

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
  }, [today]);

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
        .map(e => e.Key.stringValue)
        .filter(value => {
          return value === beforeMonthDayId;
        });
      console.log(plansData);
      console.log(plansData.map(e => e.Key.stringValue));
      console.log(result)
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
  }

  Array.apply(null, { length: thisMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const day = new Date(currentYear, currentMonth, 1 + i);
      const dayId = `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${
        day.getMonth() + 1
      }-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`;
      const resultKey = plansData
        // .map(e => e.mapValue.fields.Key.stringValue)
        .map(e => e.Key.stringValue)
        .filter(value => {
          return value === dayId;
        });
      // const resultPlanName = plansData.map(e => e.mapValue.fields.PlanName.stringValue);
        // console.log(plansData);
        // console.log(resultKey);
        // console.log(resultPlanName);
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
            {resultKey[0] ? <Alert severity='success' icon={false}></Alert> : null}
            {resultKey[1] ? <Alert severity='success' icon={false}></Alert> : null}
            {resultKey.length > 2 ? (
              <div
                style={{ height: 10, margin: 0, fontSize: 10, textAlign: 'end' }}
              >{`他${resultKey.length - 2}件...`}</div>
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
        .map(e => e.Key.stringValue)
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
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} cols={7}>
          {calendar}
          <MonthPopper popperId={popperId} anchorEl={anchorEl} day={currentDay} />
        </GridList>
      </div>
    </ClickAwayListener>
  );
};

export default MonthCalendar;
