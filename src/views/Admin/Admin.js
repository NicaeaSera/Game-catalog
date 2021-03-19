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
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withStyles } from '@material-ui/core/styles'
import { AirlineSeatReclineExtraOutlined } from '@material-ui/icons'
import Container from '@material-ui/core/Container';

class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    };
  } 

  render(){
    return (
      <Container maxWidth="lg">
        <Grid container justify="center" alignItems="center">
          <Link to="/admin/add_game" style={{color: 'white', textDecoration: 'none'}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary">
              Add game
            </Button>
          </Link>
          <Link to="/admin/add_company" style={{color: 'white', textDecoration: 'none'}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              >
              Edit game
            </Button>
          </Link>
          <Link to="/admin/add_game" style={{color: 'white', textDecoration: 'none'}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              >
              Add company
            </Button>
          </Link> 
          <Link to="/admin/add_game" style={{color: 'white', textDecoration: 'none'}}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              >
              Edit company
            </Button>
          </Link>
        </Grid>
      </Container>
    );
  }
}

export default Admin
  