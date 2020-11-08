import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  progress: {
    margin: '0 auto',
    marginTop: '40vh',
  },
}));

export const progress = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.progress}
        style={{ width: 90, height: 90 }}
      />
    </div>
  )
}