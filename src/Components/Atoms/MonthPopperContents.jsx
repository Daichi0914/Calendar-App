import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { makeStyles, TextField, DialogContent, Divider } from '@material-ui/core';
import { Plans } from '../../Recoil/PlansData';

const useStyles = makeStyles(theme => ({
  content: {
    width: 270,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
  },
  textField: {
    margin: theme.spacing(1),
    width: 250,
  },
}));

const MonthPopperContents = ({ day }) => {
  const classes = useStyles();
  const [plan, setPlan] = useRecoilState(Plans);

  useEffect(() => {
    setPlan({
      PlanName: '',
      PlanStart: `${day}T09:00`,
      PlanEnd: `${day}T10:00`,
      PlanMemo: '',
    });
  }, []);

  const handleChange = prop => e => {
    setPlan({ ...plan, [prop]: e.target.value });
  };

  return (
    <DialogContent className={classes.content}>
      <TextField
        className={classes.textField}
        label='イベント名'
        autoFocus
        margin='dense'
        type='text'
        placeholder='新規予定'
        InputLabelProps={{
          shrink: true,
        }}
        value={plan.PlanName}
        onChange={handleChange('PlanName')}
      />
      <TextField
        label='開始'
        type='datetime-local'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={plan.PlanStart || ''}
        onChange={handleChange('PlanStart')}
      />
      <TextField
        label='終了'
        type='datetime-local'
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={plan.PlanEnd || ''}
        onChange={handleChange('PlanEnd')}
      />
      <Divider />
      <TextField
        className={classes.textField}
        id='outlined-multiline-static'
        label='メモ'
        multiline
        rows={4}
        variant='outlined'
        value={plan.PlanMemo}
        onChange={handleChange('PlanMemo')}
      />
    </DialogContent>
  );
};

export default MonthPopperContents;
