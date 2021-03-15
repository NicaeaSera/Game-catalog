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

import styles from './GCard.styles'

const useStyles = makeStyles(styles);

const GameCard = props => {
  const classes = useStyles();
  const { post } = props;

  return (
    <React.Fragment>
      <Grid>
        <Typography component="h2" variant="h5">
          {post.name}
        </Typography>
      </Grid>  
      <Grid>
        <Card className={classes.card}>    
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography variant="subtitle1" color="textSecondary">
                {([0,0,0,0,0]).map((rate, idx) => idx < post.rating 
                  ? <StarIcon key={`content-rating-${post.id}-${idx}`} /> 
                  : <StarBorderIcon key={`content-rating-${post.id}-${idx}`} />
                )}
              </Typography>             
              
            </CardContent>
          </div>
        </Card>
      </Grid>    
      <Grid>
        <Tooltip title={post.description}>
          <Typography variant="subtitle1" paragraph className={classes.cardDescription}>
              {post.description}
          </Typography>
        </Tooltip>
      </Grid>
      
      
      
    </React.Fragment>    
  )
}

GameCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default GameCard
