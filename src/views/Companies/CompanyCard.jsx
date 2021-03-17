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

import styles from './CsCard.style'


const useStyles = makeStyles(styles);

const CompanyCard = props => {
  const classes = useStyles();
  const { post } = props;
  // можно добавить больше данных
  return (
    <Card className={classes.card}>
      <Hidden xsDown>
        <CardMedia className={classes.cardMedia} image={post.image} title={post.name} />
      </Hidden>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {post.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {([0,0,0,0,0]).map((rate, idx) => idx < post.rating 
              ? <StarIcon key={`content-rating-${post.id}-${idx}`} /> 
              : <StarBorderIcon key={`content-rating-${post.id}-${idx}`} />
            )}
          </Typography>
          <Tooltip title={post.description}>
            <Typography variant="subtitle1" paragraph className={classes.cardDescription}>
                {post.description}
            </Typography>
          </Tooltip>
          <Grid container spacing={1} justify="flex-end">
            <Link to={`/companies/company/${post.id}`}>
              <Button size="small" color="primary">More..</Button>
            </Link>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}

CompanyCard.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CompanyCard
