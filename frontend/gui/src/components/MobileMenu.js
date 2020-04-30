import React from "react";
import { useSelector } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";

// const useStyles = makeStyles((theme) => ({

// }));

export default function MobileMenu() {
//   const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const projects = useSelector((state) => state.Projects);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="inherit"
        aria-controls="mobile-menu"
        aria-haspopup="true"
        onClick={handleClick}
        align="right"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="mobile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link underline="none" href={`/`}>
            About
          </Link>
        </MenuItem>
        <MenuItem>
          <Link underline="none" href={`/projects/`}>
            Projects
          </Link>
        </MenuItem>
        <Divider variant="middle"  />
        {projects.map((project) => (
          <MenuItem key={project.tag}>
            <Link underline="none" href={`/projects/${project.tag}/`}>
              {project.tag}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
