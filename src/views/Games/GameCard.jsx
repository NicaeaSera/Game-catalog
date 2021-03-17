import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import {Link} from "react-router-dom";
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Container from '@material-ui/core/Container';

import styles from './GCard.styles'

const useStyles = makeStyles(styles);

const GameCard = props => {
  const classes = useStyles();
  const { post } = props;
  const { developer } = props;
  const { publisher } = props;
  
  console.log("props");
  console.log(props);

  console.log("post");
  console.log(post);

  console.log("developer");
  console.log(developer);
  console.log("publisher");
  console.log(publisher);
  if(post === undefined || developer === undefined || publisher === undefined)
    return(<Grid></Grid>)
  return (
    <React.Fragment>
      <Container maxWidth="false">
        <Grid>
          <Typography component="h2" variant="h5">
            {post.name}
          </Typography>
        </Grid>  
        <Grid container spacing={2}>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
            {/*<Hidden xsDown>*
              <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
            </Hidden>*/}
          <Grid className={classes.cardDetails}>
            <CardContent>
              <Typography>
                {`Жанр: ${post.ganre}`}
              </Typography>
              <Typography>
                {`Платформы: ${post.platforms}`}
              </Typography>
              <Typography>
                {`Дата выхода: ${post.year}`}
              </Typography>
              <Typography>
                {`Разработчик: ${developer.name}`}
              </Typography>
              <Typography>
                {`Издатель: ${publisher.name}`}
              </Typography>
              <Typography>
                {`Рейтинг: `}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {([0,0,0,0,0]).map((rate, idx) => idx < post.rating 
                  ? <StarIcon key={`content-rating-${post.id}-${idx}`} /> 
                  : <StarBorderIcon key={`content-rating-${post.id}-${idx}`} />
                )}
              </Typography>

            </CardContent>
          </Grid>          
        
        </Grid>    
        <Grid>
          <Typography variant="subtitle1" paragraph className={classes.cardDescription}>
              {post.description}
          </Typography>
        </Grid>
      </Container>      
    </React.Fragment>    
  )
}

GameCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default GameCard
