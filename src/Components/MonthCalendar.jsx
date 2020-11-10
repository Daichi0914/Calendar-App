import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  NowYear,
  NowMonth,
  Today,
  DayOfWeek,
  CurrentYear,
  CurrentMonth,
} from '../Recoil/DateData';
import MonthCalendarGrid from '../Components/Atoms/MonthCalendarGrid';
import { AnchorEl, PopperToggle } from '../Recoil/PopperToggleState';

import { makeStyles, GridList, GridListTile, ClickAwayListener } from '@material-ui/core';

import MonthPopper from './Atoms/MonthPopper';

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
}));

const MonthCalendar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useRecoilState(AnchorEl);
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const [today, setToday] = useRecoilState(Today);
  const setDayOfWeek = useSetRecoilState(DayOfWeek);

  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);
  const [open, setOpen] = useRecoilState(PopperToggle);

  useEffect(() => {
    const todayData = new Date();
    setNowYear(todayData.getFullYear());
    setNowMonth(todayData.getMonth());
    setToday(todayData.getDate());
    setDayOfWeek(todayData.getDay());
    setCurrentYear(nowYear);
    setCurrentMonth(nowMonth);
  }, [today]);

  const popperId = open ? 'simple-popper' : undefined;
  const handleClickCalendar = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  // 先月の日数
  const beforeMonth = new Date(currentYear, currentMonth, 0);
  const beforeMonthLength = beforeMonth.getDate();
  // 今月の日数
  const thisMonth = new Date(currentYear, currentMonth + 1, 0);
  const thisMonthLength = thisMonth.getDate();
  // 来月の日数
  // const afterMonth = new Date(currentYear, currentMonth + 2, 0);
  // const afterMonthLength = afterMonth.getDate();

  const calendar = [];

  const currentFirstData = new Date(currentYear, currentMonth, 1);
  const currentFirstDay = currentFirstData.getDay(); // 0~6 日~土

  Array.apply(null, { length: beforeMonthLength })
    .map(Number.call, Number)
    .forEach(i => {
      const beforeMonthDay = new Date(currentYear, currentMonth - 1, 1 + i);
      calendar.push(
        <GridListTile
          className={!open ? classes.gridTile : classes.openGridTile}
          key={`${beforeMonthDay.getFullYear()}/${
            beforeMonthDay.getMonth() + 1
          }/${beforeMonthDay.getDate()}`}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid day={beforeMonthDay} propsStyle={'#aaa'} />
          <MonthPopper popperId={popperId} anchorEl={anchorEl} />
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
      calendar.push(
        <GridListTile
          className={!open ? classes.gridTile : classes.openGridTile}
          key={`${day.getFullYear()}/${day.getMonth() + 1}/${day.getDate()}`}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid day={day} />
          <MonthPopper popperId={popperId} anchorEl={anchorEl} />
        </GridListTile>
      );
    });

  Array.apply(null, { length: 42 - calendar.length })
    .map(Number.call, Number)
    .forEach(i => {
      const afterMonthDay = new Date(currentYear, currentMonth + 1, 1 + i);
      calendar.push(
        <GridListTile
          className={!open ? classes.gridTile : classes.openGridTile}
          key={`${afterMonthDay.getFullYear()}/${
            afterMonthDay.getMonth() + 1
          }/${afterMonthDay.getDate()}`}
          variant='contained'
          aria-describedby={popperId}
          onClick={open ? null : handleClickCalendar}
        >
          <MonthCalendarGrid day={afterMonthDay} propsStyle={'#aaa'} />
          <MonthPopper popperId={popperId} anchorEl={anchorEl} />
        </GridListTile>
      );
    });

  const handleClickAway = () => (open ? setOpen(false) : null);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <GridList
          cellHeight={'auto'}
          className={classes.gridList}
          cols={7}
        >
          {calendar}
        </GridList>
      </div>
    </ClickAwayListener>
  );
};

export default MonthCalendar;
