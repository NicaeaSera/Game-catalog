import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
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

import styles from './CompanyCard.style'
import SmallCard from '../Companies/SmallCard'


const useStyles = makeStyles(styles);

const CompanyCard = props => {
  const classes = useStyles();
  // входные данные, взяты из Company.js
  const { post } = props; 
  const { games } = props; 
  console.log("props here"); 
  console.log(props);
  console.log("post here"); 
  console.log(post);
  console.log("games"); 
  console.log(games); 
  return (
    <React.Fragment>
      <Container container justify="center" className={classes.main}>
        <Grid container>
          <Typography component="h1" variant="h3" gutterBottom>
            {post.name}
          </Typography>
          <Grid container>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
            <Grid container className={classes.cardDetails}>
              <CardContent>
                <Typography>
                  {`Дата основания: ${post.year}`}
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
          
          <Typography variant="subtitle1" paragraph className={classes.cardDescription}>
            {post.description}
          </Typography>
          <Typography>
            Еще от издателя:
          </Typography>
          <Grid container direction="row" justify="flex-start" alignItems="stretch">
            {/* добавлена небольшая витрина из других игр компании*/}
            {games.map((game) =>(
            <Grid item key={`game-${game.id}`} xs={6} sm={3} md={2}>
                <SmallCard post={game} />
              </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
    
  )
}

CompanyCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CompanyCard
