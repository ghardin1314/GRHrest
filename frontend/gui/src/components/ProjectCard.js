import React from "react";

const useStyles = makeStyles({
    root: {
      maxWidth: sm,
    },
    media: {
      height: 140,
    },
  });

const ProjectCard = (props) => {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
    )
}

export default ProjectCard