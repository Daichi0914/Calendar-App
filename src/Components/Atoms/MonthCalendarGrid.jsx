import React from 'react';
import { useRecoilValue } from 'recoil';

import { NowYear, NowMonth, Today } from '../../Recoil/DateData';
import { OneWeekWeatherData, DailyWeatherData } from '../../Recoil/OneWeekWeatherData';

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
  weatherImg: {
    width: 35,
    height: 35,
    margin: 5,
    backgroundColor: 'red',
  },
}));

const MonthCalendarGrid = ({ day, propsStyle }) => {
  const classes = useStyles();
  const nowYear = useRecoilValue(NowYear);
  const nowMonth = useRecoilValue(NowMonth);
  const today = useRecoilValue(Today);
  const oneWeekWeather = useRecoilValue(OneWeekWeatherData);
  const {
    todayW,
    yesterdayW,
    tomorrowW,
    threeDaysLaterW,
    fourDaysLaterW,
    fiveDaysLaterW,
    sixDaysLaterW,
  } = useRecoilValue(DailyWeatherData);

  // console.log(todayW);

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

  const dateValidation =
    nowYear === day.getFullYear() &&
    nowMonth === day.getMonth() &&
    today === day.getDate();

  const test = nowYear === day.getFullYear() && nowMonth === day.getMonth();

  const WeatherImg = () => {
    if (
      (test && today === day.getDate()) ||
      (test && today + 1 === day.getDate()) ||
      (test && today + 2 === day.getDate()) ||
      (test && today + 3 === day.getDate()) ||
      (test && today + 4 === day.getDate()) ||
      (test && today + 5 === day.getDate()) ||
      (test && today + 6 === day.getDate())
    ) {
      return <div className={classes.weatherImg} />;
    } else {
      return;
    }
  };

  // const OneWeekWeather = () => {
  //   switch (key) {
  //     case value:

  //       break;

  //     default:
  //       break;
  //   }
  // }

  return (
    <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
      <div className={dateValidation ? classes.todayNum : classes.dayNum}>
        <Typography style={{ color: propsStyle ? propsStyle : color() }}>
          {propsStyle ? `${day.getMonth() + 1}/${day.getDate()}` : `${day.getDate()}日`}
        </Typography>
      </div>
      {WeatherImg()}
    </div>
  );
};

export default MonthCalendarGrid;
