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


const useStyles = makeStyles({
    card: {
      maxWidth: 200,
    },
    cardMedia: {
      height: 200,
    },
  });

const SmallCard = props => {
  const classes = useStyles();
  const { post } = props;
  console.log("smallCard props")
  console.log(props)

  return (    
    <Card className={classes.card}>
        <CardActionArea component="a" href="#" key={`content-card-${post.id}`}>
            <Hidden xsDown>
                <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
            </Hidden>
            <CardContent>
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography align="center" component="h2" variant="h5">
                            {post.name}
                        </Typography>                
                    </CardContent>
                </div>                
            </CardContent>
            
        </CardActionArea> 

    </Card>
        
  )
    
}

SmallCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default SmallCard
