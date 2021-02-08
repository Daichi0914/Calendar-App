import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthContext } from '../AUTH/AuthService';
import DayCalendar from '../Components/DayCalendar/DayCalendar';
import Header from '../Components/Header/Header';
import SubHeader from '../Components/Header/SubHeader';
import MonthCalendar from '../Components/MonthCalendar/MonthCalendar';
import WeekCalendar from '../Components/WeekCalendar/WeekCalendar';
import YearCalendar from '../Components/YearCalendar/YearCalendar';
import { IsInformation } from '../Recoil/IsInformation';
import { Unit } from '../Recoil/UnitDisplay';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  alert: {
    position: 'absolute',
    bottom: 50,
    left: 15,
    borderRadius: 10,
    boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, .5)',
    transition: '1.5s',
    zIndex: 100,
  },
  alertNone: {
    position: 'absolute',
    bottom: 50,
    left: -550,
    borderRadius: 10,
    boxShadow: '2px 2px 5px 0 rgba(0, 0, 0, .5)',
    transition: '1s',
    zIndex: 100,
  },
  alertClose: {
    color: '#5398ff',
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(83, 152, 255, 0.400)',
    },
    transition: '.25s',
  },
});

const Main = () => {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const currentUnit = useRecoilValue(Unit);
  const isInformation = useRecoilValue(IsInformation);
  const [isInfoAlert, setIsInfoAlert] = useState(false);

  useEffect(() => {
    if (isInformation) {
      if (currentUnit === 'month') {
        setIsInfoAlert(true);
        setTimeout(() => {
          setIsInfoAlert(false);
        }, 6000);
      }
    }
    return () => {
      setIsInfoAlert(false)
    }
  }, []);

  const currentUnitDisplay = () => {
    switch (currentUnit) {
      case 'day':
        return <DayCalendar />;
      case 'week':
        return <WeekCalendar />;
      case 'year':
        return <YearCalendar />;
      default:
        return <MonthCalendar />;
    }
  };

  if (!user) {
    return <Redirect to='/SignIn' />;
  }

  return (
    <div className={classes.root}>
      <Header appKind={'Calender'} />
      <div style={{ height: 64 }} />
      <SubHeader style={{ position: 'fixed' }} />
      <div style={{ height: 60 }} />
      {currentUnit === 'month' ? <div style={{ height: 30 }} /> : null}
      {currentUnitDisplay()}
      <Alert severity='info' className={isInfoAlert ? classes.alert : classes.alertNone}>
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AlertTitle>Info</AlertTitle>
          <CloseIcon
            fontSize='small'
            className={classes.alertClose}
            onClick={() => setIsInfoAlert(false)}
          />
        </span>
        広告ブロッカーをONにしていると、天気が表示されない場合があります。
      </Alert>
    </div>
  );
};

export default withRouter(Main);
