import React from 'react';
import { withRouter } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Unit } from '../../Recoil/UnitDisplay';
import { NowYear, NowMonth, CurrentYear, CurrentMonth } from '../../Recoil/DateData';
import { PopperToggle } from '../../Recoil/PopperToggleState';
import { DrawerWidth } from '../../Recoil/DrawerWidth';
import { MenuDrawerState } from '../../Recoil/MenuDrawerState';
import clsx from 'clsx';
import {
  makeStyles,
  Button,
  ButtonGroup,
  GridList,
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
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: drawerWidth => `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth => drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  yearHeader: {
    margin: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      margin: theme.spacing(1.5),
    },
    borderBottom: 'solid 1px #ddd',
  },
  monthHeader: {
    backgroundColor: '#fff',
    width: '100%',
    height: 29,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: 'solid 1px #ddd',
  },
}));

const weekdays = ['日', '月', '火', '水', '木', '金', '土'];

const SubHeader = () => {
  const drawerWidth = useRecoilValue(DrawerWidth);
  const classes = useStyles(drawerWidth);
  const currentUnit = useRecoilValue(Unit);
  const [currentYear, setCurrentYear] = useRecoilState(CurrentYear);
  const [currentMonth, setCurrentMonth] = useRecoilState(CurrentMonth);
  const nowYear = useRecoilValue(NowYear);
  const nowMonth = useRecoilValue(NowMonth);
  const [open, setOpen] = useRecoilState(PopperToggle);
  const drawerOpen = useRecoilValue(MenuDrawerState);

  const handleDecreaseClick = () => {
    switch (currentUnit) {
      case 'month':
        return handleMonthDecrease();
      case 'year':
        return handleYearDecrease();
      default:
        break;
    }
  };

  const handleIncreaseClick = () => {
    switch (currentUnit) {
      case 'month':
        return handleMonthIncrease();
      case 'year':
        return handleYearIncrease();
      default:
        break;
    }
  };

  // Today Handle ///////////////////////////////////////////////////////////
  const handleToday = () => {
    return open
      ? (setOpen(false), setCurrentYear(nowYear), setCurrentMonth(nowMonth))
      : (setCurrentYear(nowYear), setCurrentMonth(nowMonth));
  };
  ///////////////////////////////////////////////////////////////////////////

  // Month Handle //////////////////////////////////////////////////////////////////
  const handleMonthDecrease = () => {
    switch (currentMonth) {
      case 0:
        return open
          ? (setOpen(false),
            setCurrentMonth(currentMonth + 11),
            setCurrentYear(currentYear - 1))
          : (setCurrentMonth(currentMonth + 11), setCurrentYear(currentYear - 1));
      default:
        return setCurrentMonth(currentMonth - 1);
    }
  };

  const handleMonthIncrease = () => {
    switch (currentMonth) {
      case 11:
        return open
          ? (setOpen(false),
            setCurrentMonth(currentMonth - 11),
            setCurrentYear(currentYear + 1))
          : (setCurrentMonth(currentMonth - 11), setCurrentYear(currentYear + 1));
      default:
        return open
          ? (setOpen(false), setCurrentMonth(currentMonth + 1))
          : setCurrentMonth(currentMonth + 1);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////

  // Year Handle /////////////////////
  const handleYearDecrease = () => {
    setCurrentYear(currentYear - 1);
  };
  const handleYearIncrease = () => {
    setCurrentYear(currentYear + 1);
  };
  ///////////////////////////////////

  return (
    <div
      className={clsx(classes.appBar + ' ' + classes.root, {
        [classes.appBarShift + ' ' + classes.root]: drawerOpen,
      })}
    >
      <div className={currentUnit === 'year' ? classes.yearHeader : classes.subHeader}>
        {currentUnit === 'month' ? (
          <h2>
            {currentYear}年 {currentMonth + 1}月
          </h2>
        ) : null}
        {currentUnit === 'year' ? <h2>{currentYear}年</h2> : null}
        <span></span>
        <ButtonGroup size='medium' style={{ backgroundColor: '#eee' }}>
          <Button onClick={handleDecreaseClick}>＜</Button>
          <Button onClick={handleToday}>今日</Button>
          <Button onClick={handleIncreaseClick}>＞</Button>
        </ButtonGroup>
      </div>
      {currentUnit === 'month' ? (
        <div className={classes.monthHeader}>
          {weekdays.map((w, i) => {
            const styles = {};
            if (w === '日') {
              styles.color = 'red';
            }
            if (w === '土') {
              styles.color = 'blue';
            }
            return (
              <GridList key={i} cols={7} cellHeight={25}>
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
