import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { PopperToggle } from '../../Recoil/PopperToggleState';

const useStyles = makeStyles({
  paper: {
    maxWidth: 400,
    overflow: 'auto',
  },
  popper: {
    zIndex: 1,
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

const MonthPopper = ({ popperId, anchorEl }) => {
  const classes = useStyles();
  const [arrowRef, setArrowRef] = useState(null);

  const [open, setOpen] = useRecoilState(PopperToggle);

  const handleClickButton = () => {
    setOpen(prevOpen => !prevOpen);
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
      <span className={classes.arrow} ref={setArrowRef} />
      <Paper className={classes.paper}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Let Google help apps determine location.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickButton} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleClickButton} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default MonthPopper;
