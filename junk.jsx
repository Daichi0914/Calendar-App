import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    margin: '0 auto',
    marginTop: '40vh',
  },
}));

export const progress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} style={{ width: 90, height: 90 }} />
    </div>
  );
};

switch (todayW.weather[0].icon) {
  case '01d':
    return w01d;
  case '02d':
    return w02d;
  case '03d':
    return w03d;
  case '04d':
    return w04d;
  case '09d':
    return w09d;
  case '10d':
    return w10d;
  case '11d':
    return w11d;
  case '13d':
    return w13d;
  case '50d':
    return w50d;
  default:
    return;
}

switch (day.getDate()) {
  case today === day.getDate():
    return `${todayW.weather[0].icon}`;
  case today + 1 === day.getDate():
    return `${yesterdayW.weather[0].icon}`;
  case today + 2 === day.getDate():
    return `${tomorrowW.weather[0].icon}`;
  case today + 3 === day.getDate():
    return `${threeDaysLaterW.weather[0].icon}`;
  case today + 4 === day.getDate():
    return `${fourDaysLaterW.weather[0].icon}`;
  case today + 5 === day.getDate():
    return `${fiveDaysLaterW.weather[0].icon}`;
  case today + 6 === day.getDate():
    return `${sixDaysLaterW.weather[0].icon}`;
}