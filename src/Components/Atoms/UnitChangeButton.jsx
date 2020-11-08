import React from 'react';
import { useRecoilState } from 'recoil';

import { Unit } from '../../Recoil/UnitDisplay';

import { makeStyles, Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles({
  current: {
    backgroundColor: '#bbb',
  },
});

const UnitChangeButton = () => {
  const classes = useStyles();
  const [currentUnit, setCurrentUnit] = useRecoilState(Unit);

  const handleDayClick = () => {
    setCurrentUnit('day');
  };
  const handleWeekClick = () => {
    setCurrentUnit('week');
  };
  const handleMonthClick = () => {
    setCurrentUnit('month');
  };
  const handleYearClick = () => {
    setCurrentUnit('year');
  };

  return (
    <ButtonGroup
      size='middle'
      color='primary'
      aria-label='large outlined primary button group'
      style={{ backgroundColor: '#eee' }}
    >
      <Button
        className={currentUnit === 'day' ? classes.current : null}
        onClick={handleDayClick}
      >
        　日　
      </Button>
      <Button
        className={currentUnit === 'week' ? classes.current : null}
        onClick={handleWeekClick}
      >
        　週　
      </Button>
      <Button
        className={currentUnit === 'month' ? classes.current : null}
        onClick={handleMonthClick}
      >
        　月　
      </Button>
      <Button
        className={currentUnit === 'year' ? classes.current : null}
        onClick={handleYearClick}
      >
        　年　
      </Button>
    </ButtonGroup>
  );
};

export default UnitChangeButton;
