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
import Box from '@material-ui/core/Box';

import styles from './GCard.styles'

const useStyles = makeStyles(styles);

const GameCard = props => {
  const classes = useStyles();
  const { post } = props;
  const { developer } = props;
  const { publisher } = props;
  const { rating } = props;
  const { owned } = props;
  
  if(post === undefined || developer === undefined || publisher === undefined)
    return(<Grid></Grid>)

  // Карточка с игровыми данными
  return (
    <React.Fragment>
      <Container container justify="center" className={classes.main}>
        <Grid container>
          <Typography component="h1" variant="h3" gutterBottom>
            {`${post.name}`}
          </Typography>
        </Grid>  
        <Grid container>
          <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
          <Grid className={classes.cardDetails}>
            <CardContent>
              <Typography>
                {`Жанр: ${post.genre}`}
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
                {`Наличие: В желаемом`}
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
        <Grid container>
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
