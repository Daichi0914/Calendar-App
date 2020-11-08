import React from 'react';
import { withRouter } from 'react-router-dom';

import { makeStyles, Button, ButtonGroup, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& > *': {
      margin: theme.spacing(1.5),
    },
    backgroundColor: '#fff',
    position: 'fixed',
    right: 0,
  },
}));

const SubHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup
        size='middle'
        color='primary'
        aria-label='large outlined primary button group'
        style={{ backgroundColor: '#eee' }}
      >
        <Button>＜</Button>
        <Button>今日</Button>
        <Button>＞</Button>
      </ButtonGroup>
    </div>
  );
};

export default withRouter(SubHeader);
