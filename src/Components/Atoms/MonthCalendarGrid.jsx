import React from 'react';
import { useRecoilValue } from 'recoil';

import { NowYear, NowMonth, Today } from '../../Recoil/DateData';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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

const MonthCalendarGrid = ({ day, propsStyle }) => {
  const classes = useStyles();
  const nowYear = useRecoilValue(NowYear);
  const nowMonth = useRecoilValue(NowMonth);
  const today = useRecoilValue(Today);

  const color = () => {
    switch (day.getDay()) {
      case 0:
        return 'red';
      case 6:
        return 'blue';
      default:
        break;
    }
  };
  return (
    <div
      className={
        nowYear === day.getFullYear() &&
        nowMonth === day.getMonth() &&
        today === day.getDate()
          ? classes.todayNum
          : classes.dayNum
      }
    >
      <Typography style={{ color: propsStyle ? propsStyle : color() }}>
        {propsStyle ? `${day.getMonth() + 1}/${day.getDate()}` : `${day.getDate()}日`}
      </Typography>
    </div>
  );
};

export default MonthCalendarGrid;
