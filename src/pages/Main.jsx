import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthContext } from '../AUTH/AuthService';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../Components/Header';
import SubHeader from '../Components/SubHeader';
import DayCalendar from '../Components/DayCalendar';
import WeekCalendar from '../Components/WeekCalendar';
import MonthCalendar from '../Components/MonthCalendar';
import YearCalendar from '../Components/YearCalendar';

import { Unit } from '../Recoil/UnitDisplay';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}))

const Main = () => {
  const classes = useStyles();
  const user = useContext(AuthContext);
  const currentUnit = useRecoilValue(Unit)

  const currentUnitDisplay = () => {
    switch (currentUnit) {
      case 'day':
        return <DayCalendar />;
      case 'week':
        return <WeekCalendar />;
      case 'year':
        return <YearCalendar />;
      default:
        return <MonthCalendar />
    }
  }

  if (!user) {
    return <Redirect to='/SignIn' />;
  }

  return (
    <div>
      <Header />
      <div className={classes.toolbar} />
      <SubHeader style={{ position: 'fixed' }} />
      <div className={classes.toolbar} />
      {currentUnitDisplay()}
    </div>
  );
};

export default withRouter(Main);
