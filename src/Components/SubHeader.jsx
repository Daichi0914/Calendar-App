import React from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Unit } from '../Recoil/UnitDisplay';
import { NowYear, NowMonth, CurrentYear, CurrentMonth } from '../Recoil/DateData';

import {
  makeStyles,
  Button,
  ButtonGroup,
  GridList,
  Paper,
  Typography,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'fixed',
    right: 0,
  },
  subHeader: {
    margin: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      margin: theme.spacing(1.5),
    },
  },
  grow: {
    flexGrow: 1,
  },
  monthHeader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 25,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: 'solid 1px #ddd',
  },
}));

const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

const SubHeader = () => {
  const classes = useStyles();
  const currentUnit = useRecoilValue(Unit);
  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);
  const nowYear = useRecoilValue(NowYear);
  const nowMonth = useRecoilValue(NowMonth);

  const handleDecrease = () => {
    switch (currentMonth) {
      case 0:
        return setCurrentMonth(currentMonth + 11), setCurrentYear(currentYear - 1);
      default:
        return setCurrentMonth(currentMonth - 1);
    }
  };

  const handleToday = () => {
    return (
      setCurrentYear(nowYear),
      setCurrentMonth(nowMonth)
    );
  };

  const handleIncrease = () => {
    switch (currentMonth) {
      case 11:
        return setCurrentMonth(currentMonth - 11), setCurrentYear(currentYear + 1);
      default:
        return setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.subHeader}>
        <h2>
          {currentYear}年 {currentMonth + 1}月
        </h2>
        <ButtonGroup size='middle' style={{ backgroundColor: '#eee' }}>
          <Button onClick={handleDecrease}>＜</Button>
          <Button onClick={handleToday}>今日</Button>
          <Button onClick={handleIncrease}>＞</Button>
        </ButtonGroup>
      </div>
      {currentUnit === 'month' ? (
        <div className={classes.monthHeader}>
          {weekdays.map(w => {
            const styles = {};
            if (w === '日') {
              styles.color = 'red';
            }
            if (w === '土') {
              styles.color = 'blue';
            }
            return (
              <GridList cols={7}>
                <Grid>
                  <Typography style={styles}>{w}</Typography>
                </Grid>
              </GridList>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default withRouter(SubHeader);