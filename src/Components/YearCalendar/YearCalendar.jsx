import React from 'react';

import { makeStyles, GridList, GridListTile } from '@material-ui/core';

import YearCalendarMonth from './YearCalendarMonth';

const useStyles = makeStyles({});

const YearCalendar = () => {
  const classes = useStyles();
  return (
    <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
      <div>年表示</div>
      {/* <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile>
      <GridListTile>
        <YearCalendarMonth />
      </GridListTile> */}
    </GridList>
  );
};

export default YearCalendar;
