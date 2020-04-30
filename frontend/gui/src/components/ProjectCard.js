import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "sm",
  },
  media: {
    height: 250,
  },
  divide: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

function ProjectCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          href={`/projects/${props.data.tag}/`}
          underline="none"
          color="inherit"
        >
          <CardMedia className={classes.media} image={props.data.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.divide}>
              {props.data.description}
            </Typography>
            <Divider variant="inset"/>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.divide}>
              Technologies: {props.data.technology}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
