import React from 'react';
import { useRecoilState } from 'recoil';

import { makeStyles, Button, ButtonGroup } from '@material-ui/core';

import { Unit } from '../../../Recoil/UnitDisplay';
import { PopperToggle } from '../../../Recoil/PopperToggleState';

const useStyles = makeStyles(theme => ({
  current: {
    backgroundColor: '#bbb',
    display: 'flex',
  },
  span: {
    width: 7,
    [theme.breakpoints.up('sm')]: {
      width: 15,
    },
  },
}));

const UnitChangeButton = () => {
  const classes = useStyles();
  const [currentUnit, setCurrentUnit] = useRecoilState(Unit);
  const [open, setOpen] = useRecoilState(PopperToggle);

  const handleDayClick = () => {
    return open ? (setOpen(false), setCurrentUnit('day')) : setCurrentUnit('day');
  };
  const handleWeekClick = () => {
    return open ? (setOpen(false), setCurrentUnit('week')) : setCurrentUnit('week');
  };
  const handleMonthClick = () => {
    return open ? (setOpen(false), setCurrentUnit('month')) : setCurrentUnit('month');
  };
  const handleYearClick = () => {
    return open ? (setOpen(false), setCurrentUnit('year')) : setCurrentUnit('year');
  };

  return (
    <ButtonGroup
      size='medium'
      color='primary'
      aria-label='large outlined primary button group'
      style={{ backgroundColor: '#eee', margin: '14px 0' }}
    >
      <Button
        className={currentUnit === 'day' ? classes.current : null}
        onClick={handleDayClick}
      >
        <span className={classes.span} />日<span className={classes.span} />
      </Button>
      <Button
        className={currentUnit === 'week' ? classes.current : null}
        onClick={handleWeekClick}
      >
        <span className={classes.span} />週<span className={classes.span} />
      </Button>
      <Button
        className={currentUnit === 'month' ? classes.current : null}
        onClick={handleMonthClick}
      >
        <span className={classes.span} />月<span className={classes.span} />
      </Button>
      <Button
        className={currentUnit === 'year' ? classes.current : null}
        onClick={handleYearClick}
      >
        <span className={classes.span} />年<span className={classes.span} />
      </Button>
    </ButtonGroup>
  );
};

export default UnitChangeButton;
