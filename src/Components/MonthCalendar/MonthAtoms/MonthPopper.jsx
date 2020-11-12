import React, { useState, useContext } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { AuthContext } from '../../../AUTH/AuthService';
import { makeStyles, Button, Popper, Paper, DialogActions } from '@material-ui/core';

import { PopperToggle } from '../../../Recoil/PopperToggleState';
import MonthPopperContents from './MonthPopperContents';
import { Plans } from '../../../Recoil/PlansData';

import firebase from '../../../Config/firebase';

const useStyles = makeStyles({
  paper: {
    maxWidth: 400,
    overflow: 'auto',
  },
  popper: {
    zIndex: 1,
    border: 'solid 1px #000',
    borderRadius: 5,
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-1.1em',
      height: '3em',
      width: '1em',
      '&::before': {
        zIndex: 2,
        borderWidth: '1em 1em 1em 0',
        borderColor: 'transparent #000 transparent transparent',
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '0.7em',
      '&::before': {
        zIndex: 2,
        borderWidth: '1em 0 1em 1em',
        borderColor: 'transparent transparent transparent #000',
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

const MonthPopper = ({ popperId, anchorEl, day }) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = useState(null);

  const [open, setOpen] = useRecoilState(PopperToggle);
  const plan = useRecoilValue(Plans);
  const resetPopper = useResetRecoilState(Plans);

  const user = useContext(AuthContext);

  const conversionDate = new Date(day);
  const conversionPlanStartDate = new Date(plan.PlanStart);

  const handleClickCancel = () => {
    setOpen(prevOpen => !prevOpen);
    resetPopper();
  };

  const key = `${conversionPlanStartDate.getFullYear()}-${
    conversionPlanStartDate.getMonth() + 1 < 10 ? '0' : ''
  }${conversionPlanStartDate.getMonth() + 1}-${
    conversionPlanStartDate.getDate() < 10 ? '0' : ''
  }${conversionPlanStartDate.getDate()}`;

  const handleClickSave = () => {
    if (plan.PlanStart < plan.PlanEnd) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('Plans')
        .add({
          event: {
            Key: key,
            PlanName: plan.PlanName,
            PlanStart: plan.PlanStart,
            PlanEnd: plan.PlanEnd,
            PlanMemo: plan.PlanMemo,
          },
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(err => console.log(err));
      setOpen(prevOpen => !prevOpen);
      resetPopper();
    } else {
      window.alert('イベント開始日時が終了日時を超えています。');
    }
  };

  return (
    <Popper
      id={popperId}
      open={open}
      anchorEl={anchorEl}
      placement='right'
      disablePortal={false}
      className={classes.popper}
      modifiers={{
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
        arrow: {
          enabled: true,
          element: arrowRef,
        },
      }}
    >
      {conversionDate.getDate() === conversionPlanStartDate.getDate() &&
      conversionDate.getFullYear() === conversionPlanStartDate.getFullYear() &&
      conversionDate.getMonth() === conversionPlanStartDate.getMonth() ? (
        <span className={classes.arrow} ref={setArrowRef} />
      ) : null}
      <Paper className={classes.paper}>
        <MonthPopperContents day={day} />
        <DialogActions>
          <Button onClick={handleClickCancel} color='primary'>
            キャンセル
          </Button>
          <Button onClick={handleClickSave} color='primary'>
            保存
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default MonthPopper;
