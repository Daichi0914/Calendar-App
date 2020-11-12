import React from 'react';
import { useRecoilValue } from 'recoil';

import { NowYear, NowMonth, Today } from '../../../Recoil/DateData';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '5px',
    justifyContent: 'space-between',
    height: 10
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
  weatherImgContainer: {
    width: 35,
    height: 35,
    margin: 5,
  },
});

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

  const dateValidation = nowYear === day.getFullYear() && nowMonth === day.getMonth();
  const dateValidationFull = dateValidation && today === day.getDate();

  return (
    <div className={classes.root}>
      <div className={dateValidationFull ? classes.todayNum : classes.dayNum}>
        <Typography
          style={{ color: propsStyle ? propsStyle : color() }}
        >{`${day.getDate()}`}</Typography>
      </div>
    </div>
  );
};

export default MonthCalendarGrid;
