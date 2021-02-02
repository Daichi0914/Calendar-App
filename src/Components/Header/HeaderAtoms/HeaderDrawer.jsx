import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import React from 'react';
import { useRecoilState } from 'recoil';
import { MenuDrawerState } from '../../../Recoil/MenuDrawerState';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const HeaderDrawer = history => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useRecoilState(MenuDrawerState);

  const handleDrawerToggle = () => {
    return drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true);
  };

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <ListItemIcon>
              <WbSunnyIcon />
            </ListItemIcon>
            <ListItemText primary={'天気'} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              注意！：
              <br />
              広告ブロッカーをONにしていると、天気が表示されない場合があります。
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'あああ'} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>未定</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'いいい'} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>未定</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary={'ううう'} />
          </AccordionSummary>
          <AccordionDetails>
            <Typography>未定</Typography>
          </AccordionDetails>
        </Accordion>
      </List>
    </>
  );
};

export default HeaderDrawer;
