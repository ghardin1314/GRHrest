import React, { useEffect } from "react";
import axios from "axios";

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


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 0.025,
  },
}));

function CustomTopbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState(['']);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/").then((res) => {
      setProjects(res.data);
    });
  }, [setProjects]);

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
    <AppBar style={{ margin: 0 }} position="sticky">
      <Toolbar>
        <Typography variant="h6" align="left" className={classes.title}>
          GRH Analytics
        </Typography>
        <Divider orientation="vertical" flexItem light />
        <Button color="inherit" href="/" className={classes.title}>
          About
        </Button>
        <ButtonGroup variant="text" color="inherit" ref={anchorRef}>
          <Button href="/projects/" className={classes.title}>
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
                        <Link underline="none" href={`/projects/${project.tag}/`}>
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
      </Toolbar>
    </AppBar>
  );
}

export default CustomTopbar;
