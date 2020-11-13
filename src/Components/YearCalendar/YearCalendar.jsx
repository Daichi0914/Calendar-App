import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  NowYear,
  NowMonth,
  Today,
  CurrentYear,
  CurrentMonth,
} from '../../Recoil/DateData';
import { makeStyles, GridList, GridListTile } from '@material-ui/core';
import YearCalendarMonth from './YearCalendarMonth';
import { useWindowDimensions } from '../../Hooks/useWindowDimensions';

const useStyles = makeStyles({
  gridList: {
    height: `calc(100vh - 200px)`,
    padding: '40px 30px',
  },
  gridTile: {
    maxWidth: 'calc((100vw - 80px) / 4)',
    margin: '0 auto',
    // height: 'auto',
  },
  gridTileSm: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 3)',
  },
  gridTileXs: {
    margin: '0 auto',
    maxWidth: 'calc((100vw - 80px) / 2)',
  },
});

const YearCalendar = () => {
  const classes = useStyles();
  const [nowYear, setNowYear] = useRecoilState(NowYear);
  const [nowMonth, setNowMonth] = useRecoilState(NowMonth);
  const [today, setToday] = useRecoilState(Today);
  const setCurrentYear = useSetRecoilState(CurrentYear);
  const setCurrentMonth = useSetRecoilState(CurrentMonth);

  useEffect(() => {
    const todayData = new Date();
    setNowYear(todayData.getFullYear());
    setNowMonth(todayData.getMonth());
    setToday(todayData.getDate());
    setCurrentYear(nowYear);
    setCurrentMonth(nowMonth);
  }, [today]);

  const month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const { width } = useWindowDimensions();
  console.log(width)

  return (
    <GridList
      cellHeight={'auto'}
      className={classes.gridList}
      cols={width > 900 ? 4 : width > 600 ? 3 : 2}
      rows={width > 900 ? 3 : width > 600 ? 4 : 5}
    >
      {month.map(num => {
        return (
          <GridListTile
            className={
              width > 900
                ? classes.gridTile
                : width > 600
                ? classes.gridTileSm
                : classes.gridTileXs
            }
          >
            <YearCalendarMonth currentMonth={num} />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

export default YearCalendar;
