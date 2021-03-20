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

import { getCompanies, getGames } from '../Api/GamesApi'
import { sendData } from '../Api/GamesApi'



const EditCard = props => {
  const { post } = props;
  const { editData } = props;

  const publisherOptions = [
    { title: 'Yes', bool: 'true'},
    { title: 'No', bool: 'false'},
    ]
  let editOptions = []; // для выбора в выпадающем списке
  let editObject = {};  // для создания полей

  editData.map(data => {
    data.title = `${data.name}, id:${data.id}`;
    editOptions.push(data);    
  })
  
  console.log(post);
  console.log(editData);
  console.log(editOptions);

  if(post == "")
    return(
      <Container maxWidth="lg">
      <Typography align="center" color="textPrimary" gutterBottom>
        Choose option
      </Typography>         
    </Container>
    )
  return(      
    <Container maxWidth="lg">
      <Typography align="center" color="textPrimary" gutterBottom>
        {`Edit ${post}`}
      </Typography>
      <Autocomplete
        onChange={(event, value) => {console.log(value); editObject = value}}
        id="choseObject"
        options={editOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField required {...params} label="Edit options" variant="outlined" />}
      />
    </Container>
  )
}

const styles = theme => ({
    textField: {
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
});

EditCard.propTypes = {
  post: PropTypes.string.isRequired,
}

export default EditCard
