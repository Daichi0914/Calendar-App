import React from 'react';
import { useRecoilValue } from 'recoil';

import { NowYear, NowMonth, Today } from '../../../Recoil/DateData';
import { DailyWeatherData } from '../../../Recoil/OneWeekWeatherData';

import { makeStyles, Typography } from '@material-ui/core';

import w01d from '../../../Assets/01d.png';
import w02d from '../../../Assets/02d.png';
import w03d from '../../../Assets/03d.png';
import w04d from '../../../Assets/04d.png';
import w09d from '../../../Assets/09d.png';
import w10d from '../../../Assets/10d.png';
import w11d from '../../../Assets/11d.png';
import w13d from '../../../Assets/13d.png';
import w50d from '../../../Assets/50d.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '5px',
    justifyContent: 'space-between',
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
  const {
    todayW,
    yesterdayW,
    tomorrowW,
    threeDaysLaterW,
    fourDaysLaterW,
    fiveDaysLaterW,
    sixDaysLaterW,
  } = useRecoilValue(DailyWeatherData);

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

  const WeatherImg = () => {
    if (todayW) {
      if (dateValidation && today === day.getDate()) {
        if (todayW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (todayW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (todayW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (todayW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (todayW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (todayW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (todayW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (todayW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (todayW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 1 === day.getDate()) {
        if (yesterdayW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (yesterdayW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (yesterdayW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (yesterdayW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (yesterdayW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (yesterdayW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (yesterdayW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (yesterdayW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (yesterdayW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 2 === day.getDate()) {
        if (tomorrowW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (tomorrowW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (tomorrowW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (tomorrowW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (tomorrowW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (tomorrowW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (tomorrowW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (tomorrowW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (tomorrowW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 3 === day.getDate()) {
        if (threeDaysLaterW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (threeDaysLaterW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 4 === day.getDate()) {
        if (fourDaysLaterW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (fourDaysLaterW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 5 === day.getDate()) {
        if (fiveDaysLaterW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (fiveDaysLaterW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (todayW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else if (dateValidation && today + 6 === day.getDate()) {
        if (sixDaysLaterW.weather[0].icon === '01d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w01d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '02d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w02d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '03d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w03d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '04d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w04d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '09d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w09d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '10d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w10d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '11d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w11d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '13d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w13d}`} />;
        } else if (sixDaysLaterW.weather[0].icon === '50d') {
          return <img alt='天気' className={classes.weatherImgContainer} src={`${w50d}`} />;
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <div className={dateValidationFull ? classes.todayNum : classes.dayNum}>
        <Typography style={{ color: propsStyle ? propsStyle : color() }}>
          {propsStyle ? `${day.getMonth() + 1}/${day.getDate()}` : `${day.getDate()}日`}
        </Typography>
      </div>
      {WeatherImg()}
    </div>
  );
};

export default MonthCalendarGrid;
