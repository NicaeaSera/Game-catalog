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
import { AirlineSeatReclineExtraOutlined, ThreeSixtyRounded } from '@material-ui/icons'
import Container from '@material-ui/core/Container';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { getCompanies } from '../Api/GamesApi'
import { sendData, getEditData } from '../Api/GamesApi'
import EditCard from '../DB_Editor/EditCard'



class EditDB extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        editOption: "",
        editData: [],
    };
  }

  editOptions = [
    { title: 'Game', prop: 'game', fet: 'games'},
    { title: 'Company', prop: 'company', fet: 'companies'},
    ]

  /* функция возвращает объект, готовый к отправке на сервер*/
  combineData(){
    let data = {
      name: document.getElementById("name").value,
      image: document.getElementById("image").value,
      description: document.getElementById("description").value,
      year: document.getElementById("year").value,
      rating: document.getElementById("rating").value,
      isPublisher: this.state.isPublisher,
    };
    return data;
  }
  render(){

    const { classes } = this.props;
    

    return(
        <Grid container component="main" justify="center" alignItems="center">
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Add company
            </Typography> 
         
          <Grid container                  
            spacing={2} 
            justify="center"
            alignItems="center">
            <Grid item xs={12}>
                <Autocomplete
                    onChange={(event, value) => {
                        this.setState({editOption: value.prop}); 
                        getEditData(value.fet).then(data => {
                          this.setState({editData: data.Data})
                        })}}
                    id="choseEditor"
                    options={this.editOptions}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField required className={classes.textField} {...params} label="Edit options" variant="outlined" />}
                />
{/*Переделать*/}
            </Grid>
                <EditCard post={this.state.editOption} editData={this.state.editData} />
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>{console.log(this.combineData());  sendData("company", "POST", this.combineData())}}>
                Submit
              </Button>
            </Grid>
        </Grid>
        </Container>
    </Grid>
    )
  }
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
  })

export default withStyles(styles)(EditDB)