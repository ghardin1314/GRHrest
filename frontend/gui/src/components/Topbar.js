import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import * as actions from "../store/actions/AutoActions";

import MobileMenu from "./MobileMenu";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  grow: {
    flex: 1,
  },
  title: {
    marginRight: theme.spacing(2),
  },
  menu: {
    marginRight: 0,
    align: "right",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  offset: theme.mixins.toolbar,
}));

function CustomTopbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const projects = useSelector((state) => state.Projects);
  const anchorRef = React.useRef(null);

  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/").then((res) => {
      updateSelection("Projects", res.data);
    });
    // eslint-disable-next-line
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar style={{ margin: 0 }} position="fixed">
          <Toolbar>
          <Link href="/" underline="none" color="inherit">
            <Typography variant="h6" align="left" className={classes.title}>
                GRH Analytics
            </Typography>
            </Link>
            <Divider orientation="vertical" flexItem light />
            <Hidden smDown>
              <Button color="inherit" href="/" className={classes.button}>
                About
              </Button>
              <ButtonGroup variant="text" color="inherit" ref={anchorRef}>
                <Button href="/projects/" className={classes.button}>
                  projects
                </Button>
                <Button
                  // variant = 'outlined'
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {projects.map((project) => (
                            <MenuItem key={project.tag}>
                              <Link
                                underline="none"
                                href={`/projects/${project.tag}/`}
                              >
                                {project.tag}
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Hidden>
            <div className={classes.grow} />
            <Hidden mdUp>
              <div className={classes.menu}>
                <MobileMenu />
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.offset} />
    </React.Fragment>
  );
}

export default CustomTopbar;
