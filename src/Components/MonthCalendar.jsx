import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  makeStyles,
  Typography,
  Card,
  Grid,
  GridList,
  GridListTile,
  CardContent,
  Paper,
} from '@material-ui/core';
import {
  NowYear,
  NowMonth,
  Today,
  DayOfWeek,
  CurrentYear,
  CurrentMonth,
} from '../Recoil/DateData';
import MonthCalendarGrid from '../Components/Atoms/MonthCalendarGrid';

const normalHeaderHeight = '64px';
const spHeaderHeight = '56px';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
    height: `calc(100vh - ${normalHeaderHeight} - 86px)`,
  },
  paper: {
    border: 'solid 1px black',
    width: `${100 / 7}vw`,
  },
  dayNum: {
    width: 35,
    height: 35,
    margin: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayNum: {
    width: 35,
    height: 35,
    margin: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    backgroundColor: 'orange',
  },
}));

const MonthCalendar = () => {
  const classes = useStyles();
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const [today, setToday] = useRecoilState(Today);
  const setDayOfWeek = useSetRecoilState(DayOfWeek);

  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);

  useEffect(() => {
    const todayData = new Date();
    setNowYear(todayData.getFullYear());
    setNowMonth(todayData.getMonth());
    setToday(todayData.getDate());
    setDayOfWeek(todayData.getDay());
    setCurrentYear(nowYear);
    setCurrentMonth(nowMonth);
  }, [today]);

  // 先月の日数
  const beforeMonth = new Date(currentYear, currentMonth, 0);
  const beforeMonthLength = beforeMonth.getDate();
  // 今月の日数
  const thisMonth = new Date(currentYear, currentMonth + 1, 0);
  const thisMonthLength = thisMonth.getDate();
  // 来月の日数
  const afterMonth = new Date(currentYear, currentMonth + 2, 0);
  const afterMonthLength = afterMonth.getDate();

  const calendar = [];

  const currentFirstData = new Date(currentYear, currentMonth, 1);
  console.log(currentFirstData);
  const currentFirstDay = currentFirstData.getDay(); // 0~6 日~土
  console.log(currentFirstDay);

  Array.apply(null, { length: beforeMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const beforeMonthDay = new Date(currentYear, currentMonth - 1, 1 + i);
      calendar.push(
        <GridListTile
          style={{ borderBottom: 'solid 1px #ddd', borderRight: 'solid 1px #ddd' }}
        >
          <MonthCalendarGrid day={beforeMonthDay} propsStyle={'#aaa'} />
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

  console.log(calendar);

  Array.apply(null, { length: thisMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const day = new Date(currentYear, currentMonth, 1 + i);
      calendar.push(
        <GridListTile
          style={{ borderBottom: 'solid 1px #ddd', borderRight: 'solid 1px #ddd' }}
        >
          <MonthCalendarGrid day={day} />
        </GridListTile>
      );
    });

  Array.apply(null, { length: 42 - calendar.length })
    .map(Number.call, Number)
    .forEach(i => {
      const afterMonthDay = new Date(currentYear, currentMonth + 1, 1 + i);
      calendar.push(
        <GridListTile
          style={{ borderBottom: 'solid 1px #ddd', borderRight: 'solid 1px #ddd' }}
        >
          <MonthCalendarGrid day={afterMonthDay} propsStyle={'#aaa'} />
        </GridListTile>
      );
    });

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={`calc( (100vh - ${normalHeaderHeight} - 86px) / 6)`}
        className={classes.gridList}
        cols={7}
      >
        {calendar}
      </GridList>
    </div>
  );
};

export default MonthCalendar;
