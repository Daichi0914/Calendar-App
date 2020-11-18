import React from 'react';
import { useRecoilState } from 'recoil';
import {
  makeStyles,
  IconButton,
  Divider,
  List,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import GitHubIcon from '@material-ui/icons/GitHub';

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

const HeaderDrawer = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useRecoilState(MenuDrawerState);

  const handleDrawerToggle = () => {
    return drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true);
  };

  const iconList = i => {
    switch (i) {
      case 0:
        return <WbSunnyIcon />;
      case 1:
        return <GitHubIcon />;
      case 2:
        return <GitHubIcon />;
      case 3:
        return <GitHubIcon />;
      default:
        break;
    }
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
        {['天気', 'あああ', 'いいい', 'ううう'].map((text, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <ListItemIcon>{iconList(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </>
  );
};

export default HeaderDrawer;
