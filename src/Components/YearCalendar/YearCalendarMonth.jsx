import React from 'react';
import { useRecoilValue } from 'recoil';
import { CurrentYear } from '../../Recoil/DateData';

import YearCalendarMonthGrid from './YearAtoms/YearCalendarMonthGrid';

import { makeStyles, GridList, GridListTile, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '2% 3%',
  },
  month: {
    width: '100%',
    fontSize: '1.2em',
    marginBottom: 10,
  },
  dayGridListTile: {
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const YearCalendarMonth = ({ currentMonth }) => {
  const classes = useStyles();
  const currentYear = useRecoilValue(CurrentYear);
  // const currentMonth = useRecoilValue(CurrentMonth);

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
      calendar.push(
        <GridListTile id={beforeMonthDayId} key={beforeMonthDayId} variant='contained'>
          <YearCalendarMonthGrid
            id={beforeMonthDayId}
            day={beforeMonthDay}
            propsStyle={'#aaa'}
          />
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
      calendar.push(
        <GridListTile id={dayId} key={dayId} variant='contained'>
          <YearCalendarMonthGrid id={dayId} day={day} />
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
      calendar.push(
        <GridListTile id={afterMonthDayId} key={afterMonthDayId} variant='contained'>
          <YearCalendarMonthGrid
            id={afterMonthDayId}
            day={afterMonthDay}
            propsStyle={'#aaa'}
          />
        </GridListTile>
      );
    });

  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={classes.root}>
      <Typography className={classes.month}>{currentMonth + 1}月</Typography>
      <GridList cellHeight={'auto'} cols={7} style={{ width: '100%', marginBottom: 10 }}>
        {weekdays.map(w => {
          const styles = {};
          if (w === '日') {
            styles.color = 'red';
          }
          if (w === '土') {
            styles.color = 'blue';
          }
          return (
            <GridListTile>
              <div className={classes.dayGridListTile}>
                <Typography style={styles}>{w}</Typography>
              </div>
            </GridListTile>
          );
        })}
      </GridList>
      <GridList cellHeight={'auto'} cols={7}>
        {calendar}
      </GridList>
    </div>
  );
};

export default YearCalendarMonth;
